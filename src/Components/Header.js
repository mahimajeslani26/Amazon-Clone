import React from 'react';
import '../style/Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';
import { getCartSize } from '../reducer';
import { db } from '../firebase';

function Header() {
  const [{ user, cart }, dispatch] = useStateValue();
  const handleAuthentication = async (e) => {
    if (user) {
      //before signing out if cart is not empty add cart to db

      auth.signOut();
    }
  };

  return (
    <div className='header'>
      <Link to='/'>
        <img
          className='header__logo'
          src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
          alt='amazon logo'
        />
      </Link>

      <div className='header__search'>
        <input className='header__searchInput' type='text' />
        <SearchIcon className='header__searchIcon' />
      </div>
      <div className='header__nav'>
        <Link to={!user && '/login'}>
          <div onClick={handleAuthentication} className='header__option'>
            <span className='header__optionLineOne'>
              Hello, {user ? user?.email : 'Sign In'}
            </span>
            <span className='header__optionLineTwo'>
              {user ? 'Sign-out' : 'Account'}
            </span>
          </div>
        </Link>

        <Link to='/orders'>
          <div className='header__option'>
            <span className='header__optionLineOne'>Returns</span>
            <span className='header__optionLineTwo'>Orders</span>
          </div>
        </Link>
        <div className='header__option'>
          <span className='header__optionLineOne'>Try</span>
          <span className='header__optionLineTwo'>Prime</span>
        </div>
        <Link to='/checkout'>
          <div className='header__optionBasket'>
            <ShoppingCartIcon />
            <span className='header__optionLineTwo header__basketCount'>
              {getCartSize(cart)}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
