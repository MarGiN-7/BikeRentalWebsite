import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BikeCard from '../ui/BikeCard';
import { getFeaturedBikes } from '../../data/bikes';
import { Bike } from '../../types';

const FeaturedBikes = () => {
  const [featuredBikes, setFeaturedBikes] = useState<Bike[]>([]);
  
  useEffect(() => {
    setFeaturedBikes(getFeaturedBikes());
  }, []);

  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2 
            className="heading-lg mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Featured Bikes
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore our most popular bikes, hand-picked for quality and performance.
            From city commuters to mountain adventurers, we have the perfect ride for you.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBikes?.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/bikes" className="btn btn-primary">
            View All Bikes
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBikes;