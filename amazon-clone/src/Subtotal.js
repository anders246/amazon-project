import React from 'react'
import './styles/Subtotal.css'
import CurrencyFormat from "react-currency-format"
import { useStateValue} from "./StateProvider"

function Subtotal() {
    const [{ basket }] = useStateValue();
    let subtotalPrice;

    function getSubtotalPrice() {
        subtotalPrice = 0;
        for (const index in basket) {
            subtotalPrice += Number(basket[index].price);
        }
        return subtotalPrice;
    }

  return (
    <div className='subtotal'>
        {/* confused here */}
        <CurrencyFormat
            renderText={(value) => (
            <>
                <p>
                    Subtotal ({basket.length} items): <strong>{value}</strong>
                </p>
                <small className="subtotal__gift">
                    <input type="checkbox" /> This order contains a gift
                </small>
            </>
            )}
            decimalScale={2}
            value={getSubtotalPrice()}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
        />

        <button>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal