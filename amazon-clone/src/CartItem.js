import React from 'react';
import './styles/CartItem.css';
import { useStateValue } from './StateProvider';
import './styles/CartItem.css';

function CartItem({ id, image, title, price, rating, hideButton }) {
  const [, dispatch] = useStateValue();

  function removeFromCart() {
    // dispatch an item into data layer
    dispatch({
      type: 'REMOVE_FROM_CART',
      item: {
        id: id,
      },
    });
  }

  return (
    <div className="cartItem">
      <img className="cartItem__image" src={image} alt=""></img>
      <div className="cartItem__info">
        <p className="cartItem__title">{title}</p>
        <p className="cartItem__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="cartItem__rating">
          {Array(rating)
            .fill()
            .map(() => (
              <p>🌟</p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromCart}>Remove from basket</button>
        )}
      </div>
    </div>
  );
}

export default CartItem;
