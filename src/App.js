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
            <Payment />
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
