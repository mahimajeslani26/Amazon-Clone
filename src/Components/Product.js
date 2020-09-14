import React from 'react';
import '../style/Product.css';
import StarRateIcon from '@material-ui/icons/StarRate';
import { useStateValue } from '../StateProvider';

function Product({ id, title, price, image, rating }) {
  const [{ cart }, dispatch] = useStateValue();

  const addToCart = () => {
    //there are two possibilities .
    // product already exists in the cart so increase its quantity.
    // product is new to the cart so ad it to cart with 1 qauntity.

    const index = cart.findIndex((item) => item.id === id);
    if (index < 0) {
      console.log('adding');
      dispatch({
        type: 'ADD_TO_CART',
        item: {
          id: id,
          qty: 1,
          title: title,
          image: image,
          price: price,
          rating: rating,
        },
      });
    } else {
      console.log('editing');
      dispatch({
        type: 'EDIT_QUANTITY',
        item: {
          id: id,
          qty: cart[index].qty + 1,
        },
      });
    }
  };

  return (
    <div className='product'>
      <div className='product__info'>
        <p className='product__title'>{title}</p>
        <p className='product__price'>
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className='product__rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>
                <StarRateIcon />
              </p>
            ))}
        </div>
      </div>

      <img src={image} alt='product_image' />
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default Product;
