import React from 'react';
import Offersales from '../Components/Home/Offersales/Offersales';
import Recentlyvisited from '../Components/Home/Recent visited/Recentlyvisited';
import Newarrivals from '../Components/Home/NewArrival/Newarrival';
import Hero from '../Components/Home/Hero/Hero';

function Home () {
  return (
    <div style={{ background: "linear-gradient(180deg, #47f1f1, #2c5364)" }}>
       <div style={{height: '30px'}}></div>
      <Hero />
      <Newarrivals />
      <Offersales />
      <Recentlyvisited />
    </div>
  );
};

export default Home;
