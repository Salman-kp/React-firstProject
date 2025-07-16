import React from 'react';
import './Hero.css';
import phoneBanner from '/images/hero_image.png';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="hero-main">
      <div className="hero-left">
        <h2>Introducing the New <span className="highlight">Nothing 2a</span></h2>
        <p className="hero-desc">
          Sleek design. Powerful performance. Pure innovation. The <strong>Nothing 2a</strong> is here to redefine your smartphone experience.
        </p>
        <Link to='/phone'><button className="hero-btn">Shop Now</button></Link>
      </div>
      <div className="hero-right">
        <img src={phoneBanner} alt="Nothing 2a Phone" className="hero-img" />
      </div>
    </div>
  );
}

export default Hero;
