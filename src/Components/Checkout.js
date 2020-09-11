import React from 'react';
import '../style/Checkout.css';
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from '../StateProvider';
import FlipMove from 'react-flip-move';

function Checkout() {
  const [{ cart }, dispatch] = useStateValue();
  console.log(cart);
  return (
    <div className='checkout'>
      <div className='checkout__left'>
        <img
          className='checkout__ad'
          src='https://m.media-amazon.com/images/G/31/img20/Pharmacy/Sparkle_ILM_HQP_D1/SearchSparkle_353x80._QL95_SY80_.jpg'
          alt='checkout_ad'
        />
        <div>
          <h2 className='checkout__title'>Your shopping Cart</h2>

          <FlipMove staggerDelayBy={100}>
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
      <div className='checkout__right'>
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
