import React, { useEffect, useState } from 'react';
import './styles/Payment.css';
import { useStateValue } from './StateProvider';
import CartItem from './CartItem';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getCartTotal } from './reducer';
import axios from './axios';

function Payment() {
  const navigate = useNavigate();

  const [{ cart, user }] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [clientSecret, setClientSecret] = useState('true');

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  // runs when payment components loads, as well as when any variables inside of the ending brackets
  // change
  useEffect(() => {
    // generates stripe secret used to charge customer
    // whenever cart changes, we need a new secret to update amount
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        // stripe expects the currecy in a currency subunit (like including cents)
        url: `/payments/create?total=${getCartTotal(cart) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [cart]);

  console.log('the secret is ', clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // can only hit buy button once
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        navigate('/orders');
      });
  };

  const handleChange = (event) => {
    /* confused here */
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{cart?.length} items</Link>)
        </h1>
        {/* delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 Dev Blvd</p>
            <p>Columbus, OH</p>
          </div>
        </div>

        {/* review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
            {/* why cant we just use item instead of specifying every property? */}
            {cart.map((item) => (
              <CartItem
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe stuff */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange}></CardElement>

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getCartTotal(cart)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : 'Buy now'}</span>
                </button>
              </div>
              {/* Error section - confused here*/}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
