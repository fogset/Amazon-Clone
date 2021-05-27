import React from 'react';
import "./Home.css";
import Product from './Product';

function Home() {
    return (
        <div className="home">
            <div className="home__containers">
                <img
                    className="home__image"
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                />

                <div className="home__row">
                    <Product
                        title="The lean startup"
                        price={29.99}
                        image="https://picsum.photos/200/300"
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
                        price={81399.99}
                        image="https://multimedia.bbycastatic.ca/multimedia/products/500x500/146/14682/14682947.jpg"
                        rating={5}
                    />
                </div>

            </div>
        </div>
    )
}

export default Home






