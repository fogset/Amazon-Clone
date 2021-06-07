import React, { useState, useEffect } from 'react';
import { db } from "./firebase";
import './Orders.css'
import { useStateValue } from "./StateProvider";
import Order from './Order.js'

function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

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
        // if (user) {
        //     db
        //         .collection('users')
        //         .doc(user.email)
        //         .collection('orders')
        //         .onSnapshot(snapshot => (
        //             setOrders(snapshot.docs.map(doc => ({ id: doc.uid, })))
        //         ))
        // } else {
        //     setOrders([])
        // }

        console.log('THE ORDER IS>>>', orders);

    }, [user])

    return (
        <div className='orders'>
            <h1>Your Orders </h1>
            <div className='orders__order'>
                {orders.map(order => (
                    <Order order={order} />
                ))}

                <h2>
                    {orders.map(order => (
                        order.amount,
                        order.created,
                        order.shoppingCart
                    ))}
                </h2>

            </div>
        </div>
    )
}

export default Orders