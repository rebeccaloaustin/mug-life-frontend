import React from 'react'
import '../Home.scss';
import Carousel from '../components/Carousel';

export default function Home() {
  return (
    <div className = "page homepage">
   <Carousel></Carousel>
   <div className="container">
        <h4 className="reviewsHeader">Mug Life Brewed Experiences</h4>
        <div className="row justify-content-center"> 
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-block">
                <h4 className="card-title">Exceptional Coffee Experience!</h4>
                <p className="card-text">
                  "I've tried various coffees from different regions, but your selection stands out! The attention to detail in roasting and the rich flavor profiles make each cup a delightful experience. The craftsmanship truly reflects in the quality of the beans. My mornings are now filled with the aroma of your exceptional coffee. Highly recommended!"
                </p>
                <div style={{color:"#969f84"}}><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i></div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-block">
                <h4 className="card-title">My Daily Brew</h4>
                <p className="card-text">
                  "Your coffee has become an essential part of my daily routine. The consistent quality and freshness keep me coming back for more. I love the range of flavors available, and the 'Craftsmanship in Every Cup' is not just a slogan – it's a reality. Your dedication to providing top-notch coffee is evident in every sip. Thank you for making my mornings better!"
                </p>
                <div style={{color:"#969f84"}}><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-half"></i></div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-block">
                <h4 className="card-title">Impressed with First Purchase!</h4>
                <p className="card-text">
                  "As a first-time customer, I am thoroughly impressed with the coffee I ordered from your website. The packaging was excellent, and the aroma upon opening the bag was irresistible. The flavor notes were distinct, and the overall experience exceeded my expectations. Your commitment to quality and craftsmanship has gained you a new loyal customer. Looking forward to exploring more blends!"
                </p>
                <div className="center-stars" style={{color:"#969f84", margin: "0 auto"}}><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-half"></i></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
