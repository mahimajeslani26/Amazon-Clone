import React from 'react';
import '../style/Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../StateProvider';
import { getCartTotal, getCartSize } from '../reducer';

function Subtotal() {
  const [{ cart }, dispatch] = useStateValue();

  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({getCartSize(cart)}{' '}
              {cart.length <= 1 ? 'item' : 'items'}): <strong>{value}</strong>
            </p>
            <small className='subtotal__gift'>
              <input type='checkbox' />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getCartTotal(cart)}
        displayType={'text'}
        thousandSeperator={true}
        prefix={'$'}
      />
      <button>Proceed to buy</button>
    </div>
  );
}

export default Subtotal;
