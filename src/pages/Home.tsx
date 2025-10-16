import React from 'react';
import Navbar from '../components/Navbar';
import CalculatorSection from '../components/CalculatorSection';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <CalculatorSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;