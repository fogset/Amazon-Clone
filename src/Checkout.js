import React from 'react';
import "./Checkout.css";
import Subtotal from './Subtotal';
import { useStateValue } from './StateProvider';
import Product from './Product';
import { getBasketTotal } from './reducer';

function Checkout() {
    const [{ basket }, dispatch] = useStateValue();
    return (
        <div className="checkout">

            <div className="checkout__left">
                <img
                    className='checkout__ad'
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" />
                <div>
                    <h2 className="checkout__tilte">Your shopping Basket</h2>
                    {basket.map(singleItem => (
                        <li>
                            <Product
                                title={singleItem.title}
                                price={singleItem.price}
                                image={singleItem.image}
                                rating={singleItem.rating}
                            />
                        </li>
                    ))}

                    {/* <Product
                        title={basket[0].title}
                        price={basket[0].price}
                        image={basket[0].image}
                        rating={basket[0].rating}
                    />
                    <Product
                        title={basket[1].title}
                        price={basket[1].price}
                        image={basket[1].image}
                        rating={basket[1].rating}
                    /> */}
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
