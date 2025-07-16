import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>E-commerce, or electronic commerce, refers to the buying and selling of goods and services over the internet. 
               It has revolutionized the way businesses operate by enabling customers to shop from anywhere, at any time, using digital devices. 
               From small startups to global giants like Amazon and Flipkart, e-commerce platforms offer a wide range of products, secure payment options, and convenient delivery services. 
               It eliminates the need for physical stores, reduces operational costs, and provides businesses with powerful tools to analyze customer behavior and personalize shopping experiences. 
               As technology continues to evolve, e-commerce is becoming more accessible, efficient, and integral to modern-day life.
            </p>
            <p>With the rise of smartphones and digital payment systems, the e-commerce industry has grown rapidly, making it easier for even rural and remote customers to access products online. 
               Features like product reviews, quick returns, live order tracking, and AI-powered recommendations have further enhanced user satisfaction.</p>
        </div>
    </div>
  )
}

export default DescriptionBox