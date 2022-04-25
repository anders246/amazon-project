import React from 'react'
import './styles/Subtotal.css'
import CurrencyFormat from "react-currency-format"
import { useStateValue} from "./StateProvider"
import { getCartTotal } from "./reducer"
import { useNavigate } from 'react-router-dom'

function Subtotal() {
    const [{ cart }] = useStateValue();
    const navigate = useNavigate();

  return (
    <div className='subtotal'>
        {/* confused here */}
        <CurrencyFormat
            renderText={(value) => (
            <>
                <p>
                    Subtotal ({cart.length} items): <strong>{value}</strong>
                </p>
                <small className="subtotal__gift">
                    <input type="checkbox" /> This order contains a gift
                </small>
            </>
            )}
            decimalScale={2}
            value={getCartTotal(cart)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
        />

        <button onClick={e => navigate("/payment")}>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal