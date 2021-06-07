import React from 'react'
import './Order.css'
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";


function Order({ order, products }) {

    const currentProductIdList = [];
    {
        products.map(product => (
            order.shoppingCart.includes(product.uid) ?
                currentProductIdList.push(product)
                : null
        ))
        // console.log("productList >>>>>>>>");
        // console.log(currentProductIdList);
    }
    return (
        <div className='order'>
            <h2>Order</h2>
            <p>{moment.unix(order.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order__id">
                <small>{order.id}</small>
            </p>

            {currentProductIdList.map(currentProduct => (
                <CheckoutProduct
                    id={currentProduct.uid}
                    title={currentProduct.ProductName}
                    image={currentProduct.ProductImg}
                    price={currentProduct.ProductPrice}
                    rating={3}
                    hideButton
                />
            ))}
            <CurrencyFormat
                renderText={(value) => (
                    <h3 className="order__total">Order Total: {value}</h3>
                )}
                decimalScale={2}
                value={order.amount / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
        </div>
    )
}

export default Order