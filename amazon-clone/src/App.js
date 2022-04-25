import './styles/App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { auth } from './db/firebase';
import { useStateValue } from "./StateProvider";

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when App component loads

    // whenever auth changes
    auth.onAuthStateChanged(authUser => {
      console.log("user is ", authUser);

      if (authUser) {
        //user just logged in/ the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, []) // if we added [user, basket]) here, this method would fire every time user or basket changed
  // kind of like if-statement

  return (
    // BEM
    <Router>
      <div className="App">
      
        <Routes>
          <Route path="/" element={[<Header />, <Home />]}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/checkout" element={[<Header />, <Checkout />]}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
