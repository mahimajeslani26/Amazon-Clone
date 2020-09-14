import React, { forwardRef } from 'react';
import '../style/CheckoutProduct.css';
import StarRateIcon from '@material-ui/icons/StarRate';
import { useStateValue } from '../StateProvider';
import FlipMove from 'react-flip-move';

const CheckoutProduct = forwardRef(
  ({ id, qty, image, title, price, rating, showSummary }, ref) => {
    const [{ cart }, dispatch] = useStateValue();

    const removeFromCart = () => {
      //remoVe item from cart
      dispatch({
        type: 'REMOVE_FROM_CART',
        id: id,
      });
    };

    const changeQuantity = (e) => {
      const selected_qty = parseInt(e.target.value, 10);
      if (selected_qty === 0) {
        dispatch({
          type: 'REMOVE_FROM_CART',
          id: id,
        });
      } else {
        dispatch({
          type: 'EDIT_QUANTITY',
          item: {
            id: id,
            qty: selected_qty,
          },
        });
      }
    };

    return (
      <div ref={ref} className='checkoutProduct'>
        <img
          className='checkoutProduct__image'
          src={image}
          alt='checkout_prod_image'
        />
        <div className='checkoutProduct__info'>
          <p className='checkoutProduct__title'>{title}</p>
          <p className='checkoutProduct__price'>
            <small>₹</small>
            <strong>{price}</strong>
          </p>
          <div className='checkoutProduct__rating'>
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p>
                  <StarRateIcon />
                </p>
              ))}
          </div>
          <div className='checkoutProduct__quantity'>
            <label for='cars'>Qty:</label>
            <select
              name='product_qty'
              value={qty}
              onChange={(e) => changeQuantity(e)}
            >
              {Array(10)
                .fill()
                .map((_, i) => (
                  <option disabled={showSummary} value={i}>
                    {i}
                  </option>
                ))}
            </select>
          </div>
          {!showSummary && (
            <button onClick={removeFromCart}>Remove from Cart</button>
          )}
        </div>
      </div>
    );
  }
);

export default CheckoutProduct;
