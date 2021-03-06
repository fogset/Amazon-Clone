import React, { useState, useEffect } from 'react'
import "./Payment.css";
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from "react-router-dom"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from "./firebase";


function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);
    var amount = Math.round(getBasketTotal(basket) * 100);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${amount}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])

    // console.log('THE SECRET IS>>>', clientSecret);
    // console.log('👱', user)
    // console.log('basket', basket)


    const handleSubmit = async (event) => {
        // do all the fancy stripe stuff...
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation

            const productIdList = [];
            {
                basket.map(product => (
                    productIdList.push(product.id)
                ))
            }
            db.collection("users")
                .doc(user.email)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    shoppingCart: productIdList,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        })
    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }


    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (<Link to="/checkout">{basket ? basket.length : null} items</Link>)
                </h1>

                {/* Payment section - delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user ? user.email : null}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__item">
                        {basket.map(singleItem => (
                            <CheckoutProduct
                                id={singleItem.id}
                                title={singleItem.title}
                                price={singleItem.price}
                                image={singleItem.image}
                                rating={singleItem.rating}
                            />
                        ))}
                    </div>
                </div>

                {/* Payment section - Payment method test credit card 4242 4242 4242 4242*/}
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe magic will go */}

                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />

                                {user ?
                                    <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>
                                    : <div className="signUp_reminder">Please sign up to pay</div>
                                }

                            </div>

                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Payment
