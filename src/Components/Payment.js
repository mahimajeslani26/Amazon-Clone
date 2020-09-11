import React from 'react';
import '../style/Payment.css';
import { useStateValue } from '../StateProvider';
import CheckoutProduct from './CheckoutProduct';
import FlipMove from 'react-flip-move';
import { getCartSize } from '../reducer';
import { Link } from 'react-router-dom';

function Payment() {
  const [{ cart, user }, dispatch] = useStateValue();

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
          <div className='payment__details'>{/*Stripe*/}</div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
