import React, { useState, useEffect } from 'react';
import "./Home.css";
import Product from './Product';
import { db } from './firebase';

function Home() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    function getProducts() {
        setLoading(true);

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
                <img
                    className="home__image"
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                />
                <div className="home__row">
                    {products.map(product => (
                        <Product
                            title={product.ProductName}
                            price={product.ProductPrice}
                            image={product.ProductImg}
                            rating={3}
                        />
                    ))}

                </div>



            </div>
        </div >
    )

}

export default Home






