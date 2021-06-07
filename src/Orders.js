import React, { useState, useEffect } from 'react';
import { db } from "./firebase";
import './Orders.css'
import { useStateValue } from "./StateProvider";
import Order from './Order.js'

function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (user) {
            db.collection('users')
                .doc(user.email)
                .collection('orders')
                .get()
                .then(snapshot => {
                    const items = [];
                    snapshot.forEach(doc => {
                        items.push(doc.data());
                    })
                    setOrders(items);

                })
                .catch(error => console.log(error))
        }
        // console.log('THE ORDER IS>>>', orders);

        if (user) {
            db.collection("products").get()
                .then(snapshot => {
                    const items = [];
                    snapshot.forEach(doc => {
                        items.push(doc.data());
                    })
                    setProducts(items);
                })
                .catch(error => console.log(error))
        }
        // console.log('THE product IS>>>', products);


    }, [user])

    return (
        <div className='orders'>
            <h1>Your Orders</h1>
            <div className='orders__order'>
                {orders.map(order => (
                    <Order order={order} products={products} />
                ))}

            </div>
        </div>
    )
}

export default Orders