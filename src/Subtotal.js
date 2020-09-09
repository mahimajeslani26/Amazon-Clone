import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';

function Subtotal() {
  const [{ cart }, dispatch] = useStateValue();

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
        value={cart.reduce((acc, curr, ind, arr) => {
          return acc + curr.price;
        }, 0.0)}
        displayType={'text'}
        thousandSeperator={true}
        prefix={'$'}
      />
      <button>Proceed to buy</button>
    </div>
  );
}

export default Subtotal;
