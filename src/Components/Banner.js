import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./Banner.css";
function Banner() {
    return (
        <div className='relative'>
            <Carousel
                autoPlay
                inifiniteLoop
                showStatus={true}
                showIndicators={true}
                showThumbs={false}
            >
                <div>
                    <img className="home__image" loading='lazy' src="https://links.papareact.com/6ff" alt="" />
                </div>

                <div>
                    <img className="home__image" loading='lazy' src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt="" />
                </div>

                <div>
                    <img className="home__image" loading='lazy' src="https://images-eu.ssl-images-amazon.com/images/G/02/AmazonMusic/2021/Marketing/SWSpringDeal_DMUX-4280/Gateway/DV2/UK-EN_030821_SpringSitewide_ACQ_GW_Hero_D_1500x600_CV69._CB656397523_.jpg" alt="" />
                </div>

            </Carousel>
        </div>
    )
}

export default Banner
