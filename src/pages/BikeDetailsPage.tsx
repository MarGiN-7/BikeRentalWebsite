import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBikeById } from '../data/bikes';
import { Bike } from '../types';
import { Check, ArrowLeft, Calendar, Star } from 'lucide-react';
import ReviewSection from '../components/reviews/ReviewSection';

const BikeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [bike, setBike] = useState<Bike | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) {
      const bikeData = getBikeById(id);
      
      if (bikeData) {
        setBike(bikeData);
        document.title = `${bikeData.name} - Dehradun Bike Rentals`;
      }
    }
    
    setLoading(false);
  }, [id]);
  
  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
      </div>
    );
  }
  
  if (!bike) {
    return (
      <div className="pt-20 min-h-screen">
        <div className="container-custom py-16">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="heading-lg mb-4 text-gray-700">Bike Not Found</h1>
            <p className="text-gray-600 mb-6">
              Sorry, we couldn't find the bike you're looking for.
            </p>
            <Link to="/bikes" className="btn btn-primary">
              Browse All Bikes
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-20">
      <div className="bg-primary-600 py-10">
        <div className="container-custom">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-white mb-4 hover:text-primary-200 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Bikes
          </button>
          <motion.h1 
            className="heading-xl text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {bike.name}
          </motion.h1>
          <motion.div 
            className="flex items-center text-primary-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="mr-2">{bike.type}</span>
            <span className="mx-2">•</span>
            <span>{bike.category}</span>
          </motion.div>
        </div>
      </div>
      
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bike Images and Features */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={bike.imageUrl} 
                alt={bike.name} 
                className="w-full h-96 object-cover"
              />
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="heading-md mb-4">Description</h2>
              <p className="text-gray-600 mb-6">{bike.description}</p>
              
              <h3 className="heading-sm mb-3">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {bike.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check size={18} className="text-success-600 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="heading-md mb-4">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                {Object.entries(bike.specifications).map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="w-1/2 font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className="w-1/2">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Booking and Price Info */}
          <div>
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6 sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="heading-md mb-6">Rental Rates</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <span className="block font-semibold">Daily Rate</span>
                    <span className="text-sm text-gray-600">Perfect for short trips</span>
                  </div>
                  <span className="text-xl font-bold text-accent-600">₹{bike.dailyRate}</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <span className="block font-semibold">Monthly Rate</span>
                    <span className="text-sm text-gray-600">Best value for regular use</span>
                  </div>
                  <span className="text-xl font-bold text-accent-600">₹{bike.monthlyRate}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="block font-semibold">Unlimited KM Plan</span>
                    <span className="text-sm text-gray-600">No distance restrictions</span>
                  </div>
                  <span className="text-xl font-bold text-accent-600">₹{bike.unlimitedRate}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center mb-2">
                  <Calendar size={18} className="text-primary-600 mr-2" />
                  <span className="font-semibold">Availability</span>
                </div>
                <span className={`px-2 py-1 rounded text-sm ${
                  bike.availability 
                    ? 'bg-success-100 text-success-800' 
                    : 'bg-error-100 text-error-800'
                }`}>
                  {bike.availability ? 'Available for Rent' : 'Currently Unavailable'}
                </span>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center mb-2">
                  <Star size={18} className="text-primary-600 mr-2" />
                  <span className="font-semibold">Customer Rating</span>
                </div>
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">4.0 out of 5</span>
                </div>
              </div>
              
              <Link 
                to={`/booking?bikeId=${bike.id}`} 
                className="btn btn-primary w-full mb-3"
              >
                Book Now
              </Link>
              
              <p className="text-center text-sm text-gray-600">
                Free cancellation up to 24 hours before pickup
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {bike && <ReviewSection bikeId={bike.id} />}
    </div>
  );
};

export default BikeDetailsPage;