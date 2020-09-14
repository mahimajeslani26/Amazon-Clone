import React, { useEffect } from 'react';
import './style/App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './Components/Checkout';
import Login from './Components/Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Components/Payment';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Components/Orders';

import { loadStripe } from '@stripe/stripe-js';

const promise = loadStripe(
  'pk_test_51HQEDKAvaXpsex7YLcC9oyVa6ggsI4mCPj7ma8VDslMCremS0FkaFu4sLKvuykOHsGFEpxmlYkWrFnGswJGgD7DA00vIyn5XcI'
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log('THE USER is >>> ', authUser);
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        //the user is logged out.
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  }, []);
  return (
    //BEM convention
    <Router>
      <div className='app'>
        <Header />
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/checkout'>
            <Checkout />
          </Route>
          <Route path='/payment'>
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path='/orders'>
            <Orders />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
