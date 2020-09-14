import React, { useState, useEffect } from 'react';
import '../style/Payment.css';
import { useStateValue } from '../StateProvider';
import CheckoutProduct from './CheckoutProduct';
import FlipMove from 'react-flip-move';
import { getCartSize, getCartTotal } from '../reducer';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { AccordionSummary } from '@material-ui/core';
import { db } from '../firebase';

import axios from '../axios';

function Payment() {
  const [{ cart, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    //whenever the cart changes we are updating the stripe client secret witht he updated cart total.
    //making a post request to the API. This allows to charge the customer for the correct updated amount of the cart.
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        url: `/payments/create?total=${getCartTotal(cart) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [cart]);

  console.log('The secret is >>>', clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            address: {
              city: 'Bangalore',
              country: 'IN',
              line1: '1234',
              line2: null,
              postal_code: '12345',
              state: 'Karnataka',
            },
            email: 'mahima@example.com',
            name: 'mahima',
            phone: '+910000000000',
          },
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = Payment confirmation from stripe

        db.collection('users')
          .doc(user?.uid)
          .collection('orders')
          .doc(paymentIntent.id)
          .set({
            cart: cart,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: 'EMPTY_CART',
        });

        history.replace('/orders');
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
          {' '}
          Checkout (<Link to='/checkout'>{getCartSize(cart)} items)</Link>
        </h1>
        {
          //payment section 1 : Delivery Address}
        }
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>

            <p>test addr line 1</p>
            <p>test addr line 2</p>
          </div>
        </div>

        {
          //payment section 2 : Review Cart items}
        }
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment__items'>
            <FlipMove>
              {cart.map((item, i) => (
                <CheckoutProduct
                  key={i}
                  qty={item.qty}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  rating={item.rating}
                />
              ))}
            </FlipMove>
          </div>
        </div>

        {
          //payment section 3 : Payment method}
        }
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment__details'>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className='payment__priceContainer'>
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getCartTotal(cart)}
                  displayType={'text'}
                  thousandSeperator={true}
                  prefix={'₹'}
                />
                <button disabled={processing || succeeded || disabled}>
                  <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
