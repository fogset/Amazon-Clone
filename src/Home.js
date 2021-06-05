import React, { useState, useEffect } from 'react';
import "./Home.css";
import Product from './Product';
import { db } from './firebase';

function Home() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    function getProducts() {
        setLoading(true);
        db.collection("products").onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setProducts(items);
            setLoading(false);
        });
    }

    useEffect(() => {
        getProducts();
        console.log("load from firestore ----------------");
        console.log(products);
    }, []);

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="home">
            <div className="home__containers">
                <img
                    className="home__image"
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                />

                <div className="home__row">
                    <Product
                        title={products ? products[0].ProductName : null}
                        price={products ? products[0].ProductPrice : null}
                        image={products ? products[0].ProductImg : null}
                        rating={3}
                    />
                    <Product
                        title="very nice keyboard"
                        price={300.99}
                        image="https://picsum.photos/200/300"
                        rating={4}
                    />
                </div>

                <div className="home__row">
                    <Product
                        title="ASUS ROG Strix G15 15.6 Gaming Laptop"
                        price={999.99}
                        image="https://multimedia.bbycastatic.ca/multimedia/products/500x500/153/15345/15345387_1.jpg"
                        rating={4}
                    />
                    <Product
                        title="ASUS TUF 15.6 Gaming Laptop"
                        price={849.99}
                        image="https://multimedia.bbycastatic.ca/multimedia/products/1500x1500/146/14679/14679322.jpg"
                        rating={4}
                    />
                    <Product
                        title="Dell G3 15.6 Gaming Laptop"
                        price={81399.99}
                        image="https://multimedia.bbycastatic.ca/multimedia/products/500x500/146/14682/14682947.jpg"
                        rating={4}
                    />
                </div>
                <div className="home__row">
                    <Product
                        title="Dell G3 15.6 Gaming Laptop"
                        price={8399.99}
                        image="https://multimedia.bbycastatic.ca/multimedia/products/500x500/146/14682/14682947.jpg"
                        rating={5}
                    />
                </div>

            </div>
        </div>
    )

}

export default Home






