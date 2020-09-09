import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';

function Subtotal() {
  const [{ cart }, dispatch] = useStateValue();

  let total = 0.0;
  cart.map((item) => {
    console.log(item.price);
    total += item.price;
  });

  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({cart.length} {cart.length == 1 ? 'item' : 'items'}):{' '}
              <strong>{value}</strong>
            </p>
            <small className='subtotal__gift'>
              <input type='checkbox' />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={total}
        displayType={'text'}
        thousandSeperator={true}
        prefix={'$'}
      />
      <button>Proceed to buy</button>
    </div>
  );
}

export default Subtotal;
