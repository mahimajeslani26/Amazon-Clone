import React from 'react';
import './Checkout.css';
import Subtotal from './Subtotal';

function Checkout() {
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
        </div>
      </div>
      <div className='checkout__right'>
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
