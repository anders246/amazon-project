import React from 'react'
import './styles/CartItem.css'
import { useStateValue} from "./StateProvider"
import './styles/CartItem.css'

function CartItem(item) {
    const [{ cart }, dispatch] = useStateValue();

    function removeFromCart() {
        // dispatch an item into data layer
        dispatch({
            type: "REMOVE_FROM_CART",
            item: {
                id: item.id,
            }
        })
    }

  return (
    <div className='cartItem'>
        <img className="cartItem__image" src={item.image} alt=""></img>

        <div className='cartItem__info'>
            <p className='cartItem__title'>{item.title}</p>
            <p className='cartItem__price'>
                <small>$</small>
                <strong>{item.price}</strong>
            </p>
            <div className="cartItem__rating">
                {Array(item.rating).fill().map(() => (<p>🌟</p>))}
            </div>
            <button onClick={removeFromCart}>Remove from basket</button>
        </div>
    </div>
  )
}

export default CartItem