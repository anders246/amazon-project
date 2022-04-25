import React from 'react'
import './styles/Checkout.css'
import Subtotal from './Subtotal.js'
import { useStateValue} from "./StateProvider"
import CartItem from './CartItem'

function Checkout() {
    const [{ cart }] = useStateValue();

    function showCartItems() {
        const items = [];
        for (const index in cart) {
            items.push(CartItem(cart[index]));
        }
        return items;
    }

  return (
    <div className='checkout'>
        <div className='checkout__left'>
            <img className='checkout__ad' src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" />
            <div>
                <h2 className='checkout__title'>Your shopping basket</h2>
                {showCartItems()}
            </div>     
        </div>

        <div className='checkout__right'>
            <Subtotal></Subtotal>
        </div>
    </div>
  )
}

export default Checkout