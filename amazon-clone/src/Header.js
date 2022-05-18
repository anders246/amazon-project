import React from 'react';
import './styles/Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './db/firebase';

function Header() {
  const [{ cart, user }] = useStateValue();

  function cartItemCount() {
    // console.log('user is: ' + user[0] + 'and id is: ' + user[0]?.id);
    return cart?.length;
  }

  function handleAuthentication() {
    if (user) {
      auth.signOut();
    }
  }

  return (
    <div>
      <div className="header">
        <Link to="/">
          <img
            className="header__logo"
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt=""
          />
        </Link>

        <div className="header__search">
          <input className="header__searchInput" type="text"></input>
          <SearchIcon className="header__searchIcon" />
        </div>

        <div className="header__nav">
          <Link to={!user && '/login'}>
            {' '}
            <div onClick={handleAuthentication} className="header__option">
              <span className="header__optionLineOne">
                Hello {user ? user.email : 'Guest'}
              </span>
              <span className="header__optionLineTwo">
                {user ? 'Sign Out' : 'Sign In'}
              </span>
            </div>
          </Link>

          <Link to="/orders">
            <div className="header__option">
              <span className="header__optionLineOne">Returns</span>
              <span className="header__optionLineTwo">& Orders</span>
            </div>
          </Link>

          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Prime</span>
          </div>

          <Link to="/checkout">
            <div className="header__optionBasket">
              <ShoppingBasketIcon />
              <span
                className="header__optionLineTwo 
                      header__basketCount"
              >
                {cartItemCount()}
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="disclaimer">
        <p>
          *This site is a personal project, not an Amazon product. Made by
          Anders Santus.
        </p>
      </div>
    </div>
  );
}

export default Header;
