import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center bg-gray-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/2519374/pexels-photo-2519374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Mountain road perfect for bike rides" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
      </div>
      
      <div className="container-custom relative z-10 pt-20">
        <div className="max-w-3xl">
          <motion.h1 
            className="heading-xl text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary-500">Ride Dehradun in Style</span> – Rent Your Perfect Bike Today!
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover Dehradun like never before – from city streets to mountain peaks. 
            Whether it's a daily commute or a weekend escape to Mussoorie, 
            we have the right ride for every road.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/bikes" className="btn btn-primary">
              Explore Our Bikes
            </Link>
            <Link to="/booking" className="btn btn-outline border-white text-white hover:bg-white/10">
              Book Now <ArrowRight size={16} className="ml-2" />
            </Link>
          </motion.div>
          
          <motion.div 
            className="mt-12 flex flex-wrap gap-6 justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <p className="font-bold text-white">Large Fleet</p>
              <p className="text-sm text-gray-300">Well-Maintained Bikes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <p className="font-bold text-white">Affordable Rates</p>
              <p className="text-sm text-gray-300">Flexible Rental Plans</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <p className="font-bold text-white">24/7 Support</p>
              <p className="text-sm text-gray-300">Roadside Assistance</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;