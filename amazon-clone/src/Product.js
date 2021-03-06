import React from 'react';
import './styles/Product.css';
import { useStateValue } from './StateProvider';

function Product({ id, title, image, price, rating }) {
  const [, dispatch] = useStateValue();

  function addToCart() {
    // dispatch an item into data layer
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
  }

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map(() => (
              <p>🌟</p>
            ))}{' '}
          {/* fill array with x# of ? items, map each item to star */}
        </div>
      </div>

      <img src={image} alt=""></img>

      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default Product;
