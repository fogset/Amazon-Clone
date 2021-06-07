
import React, { useState } from 'react'
import { db } from '../firebase';

import "./AddProducts.css";


const AddProducts = () => {
    const { uuid } = require('uuidv4');

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null)

    //add product from submit event
    const addProduct = (e) => {
        e.preventDefault();
        console.log("product information ----------------");
        console.log(productName, productPrice, productImg);
        db.collection("products").add({
            ProductName: productName,
            ProductPrice: Number(productPrice),
            ProductImg: productImg,
            uid: uuid()
        }).then(() => {
            setProductName('');
            setProductPrice(0)
            setProductImg('');
        })
    }


    return (
        <div className='container'>
            <br />
            <h1>ADD PRODUCTS</h1>

            <form autoComplete="off" className='add_product' onSubmit={addProduct} >

                <label htmlFor="product-name"> Product Name</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setProductName(e.target.value)} value={productName}
                />


                <label htmlFor="product-price"> Product Price</label>
                <input type="number" className='form-control' required
                    onChange={(e) => setProductPrice(e.target.value)} value={productPrice}
                />

                <label htmlFor="product-img"> Product Image Url</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setProductImg(e.target.value)} value={productImg}
                />

                <button >Add </button>
            </form>

        </div>
    )
}

export default AddProducts

