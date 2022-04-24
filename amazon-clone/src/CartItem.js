import React from 'react'
import './styles/CartItem.css'
import { useStateValue} from "./StateProvider"

function CartItem(item) {
    const [{ basket }, dispatch] = useStateValue();

    function removeFromBasket() {
        // dispatch an item into data layer
        dispatch({
            type: "REMOVE_FROM_BASKET",
            item: {
                id: item.id,
                title: item.title,
                image: item.image,
                price: item.price,
                rating: item.rating,
            }
        })
    }

  return (
    <div className='cartitem'>
        <div className='cartitem_container'>
            <div>
                <img src={item.image} alt=""></img>
                <p>{item.title}</p>
                <p>{item.price}</p>
                <div className="product__rating">
                {Array(item.rating).fill().map((_, i) => (
                    <p>🌟</p>
                ))}
            </div>
                <button onClick={removeFromBasket}>Remove from basket</button>
                <p>{basket.length}</p>
            </div>
        </div>
    </div>
  )
}

export default CartItem