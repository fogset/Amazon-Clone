import React from 'react';
import "./Checkout.css";
import Subtotal from './Subtotal';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';

function Checkout() {
    const [{ basket, user }, dispatch] = useStateValue();
    return (
        <div className="checkout">

            <div className="checkout__left">
                <img
                    className='checkout__ad'
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" />
                <div>
                    <h3>Hello, {user && user.email} </h3>
                    <h2 className="checkout__tilte">Your shopping Basket</h2>

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


            <div className="checkout__right">
                <Subtotal />
                {/* <h2>The subtotal will go here</h2> */}
            </div>

        </div>
    )
}

export default Checkout