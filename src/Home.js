import React, { useState, useEffect } from 'react';
import "./Home.css";
import Banner from './Components/Banner';
import Product from './Product';
import { db } from './firebase';

function Home({ searchTerm }) {
    const [products, setProducts] = useState([]);
    function getProducts() {

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

    useEffect(() => {
        getProducts();
        // console.log("load from firestore ----------------");
        // console.log(products);
    }, []);

    return (
        <div className="home">
            <div className="home__containers">

                <Banner />

                <div className="home__row">
                    {products.filter(product => product.ProductName.toLowerCase()
                        .includes(searchTerm.toLowerCase()))
                        .map(filteredProduct => (
                            <Product
                                title={filteredProduct.ProductName}
                                price={filteredProduct.ProductPrice}
                                image={filteredProduct.ProductImg}
                                id={filteredProduct.uid}
                                rating={3}
                            />
                        ))}
                </div>

            </div>
        </div >
    )

}

export default Home





