import React from 'react';
import Analytics from './Analytics';
import Cards from './Cards';
import Footer from './Footer';
import Hero from './Hero';
import Navbar from './Navbar';
import Newsletter from './Newsletter';

function Index() {


  return (
    <div className="index">
      <Navbar />
      <Hero />
      <Analytics />
      <Newsletter />
      <Cards />
      <Footer />
    </div>
  );
}

export default Index;