import React, { useState } from 'react';
import '../style/Login.css';
import { Link, useHistory } from 'react-router-dom';
import { auth, db } from '../firebase';
import { useStateValue } from '../StateProvider';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [{ cart }, dispatch] = useStateValue();

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push('/');
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);

        if (auth) {
          db.collection('users').doc(auth.user?.uid).set({
            cart: [],
          });
          history.push('/');
        }
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className='login'>
      <Link to='/'>
        <img
          className='login__logo'
          src='https://cdn.freebiesupply.com/images/large/2x/amazon-logo-transparent.png'
          alt='amazon_logo'
        />
      </Link>
      <div className='login__container'>
        <h1>Sign-In</h1>
        <form>
          <h5>Email</h5>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type='submit'
            onClick={signIn}
            className='login__signInButton'
          >
            Sign In
          </button>
        </form>
        <p>
          By Signing in you agree to the terms and conditions of the Amazon
          Clone Application. Please see the privacy notice and cookies notice
          for further info.
        </p>
        <button onClick={register} className='login__registerButton'>
          Create your Amazon account
        </button>
      </div>
    </div>
  );
}

export default Login;
