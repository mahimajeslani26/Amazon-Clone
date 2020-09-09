import React from 'react';
import './Product.css';
import StarRateIcon from '@material-ui/icons/StarRate';
import { useStateValue } from './StateProvider';

function Product({ id, title, price, image, rating }) {
  const [{ cart }, dispatch] = useStateValue();

  console.log('your cart  contains :', cart);
  const addToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className='product'>
      <div className='product__info'>
        <p className='product__title'>{title}</p>
        <p className='product__price'>
          <small>$</small>
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
