import React from 'react'
import "./Payment.css";
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    return (
        <div className='payment'>
            <div className='payment__container'>
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


                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* {stripe magic} */}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Payment
