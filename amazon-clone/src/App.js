import './styles/App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { auth } from './db/firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe(
  'pk_test_51KtKKaIjb8XnIDssZ8VnNZNaGKgu1ivcBse83pvq1VBAhc2urwKipPpq5pDdDW3AQ6mtfSEPAyicHy1T1PstGsQN005RCSw1lq',
);

function App() {
  const [dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when App component loads

    // whenever auth changes
    auth.onAuthStateChanged((authUser) => {
      console.log('user is ', authUser);

      if (authUser) {
        //user just logged in/ the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        // user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // if we added [user, basket]) here, this method would fire every time user or basket changed
  // kind of like if-statement

  return (
    // BEM
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={[<Header />, <Checkout />]} />
          <Route
            path="/payment"
            element={[
              <Header />,
              <Elements stripe={promise}>
                <Payment />
              </Elements>,
            ]}
          />
          <Route path="/" element={[<Header />, <Home />]} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
