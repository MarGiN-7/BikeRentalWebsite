import { Link } from 'react-router-dom';
import { Bike } from '../../types';
import { motion } from 'framer-motion';
import { Star, Clock, Fuel, Settings, Check } from 'lucide-react';

interface BikeCardProps {
  bike: Bike;
}

const BikeCard: React.FC<BikeCardProps> = ({ bike }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="h-48 md:h-56 overflow-hidden relative">
        <img 
          src={bike.imageUrl} 
          alt={bike.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/2519374/pexels-photo-2519374.jpeg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-0 left-0 bg-primary-600 text-white px-3 py-1 rounded-br-lg">
          {bike.type}
        </div>
        {bike.availability ? (
          <div className="absolute top-0 right-0 bg-success-600 text-white px-3 py-1 rounded-bl-lg">
            Available
          </div>
        ) : (
          <div className="absolute top-0 right-0 bg-error-600 text-white px-3 py-1 rounded-bl-lg">
            Booked
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {bike.name}
        </h3>
        <p className="text-gray-600 mb-4">{bike.category}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Settings size={16} className="text-primary-600" />
            <span>{bike.specifications.engine}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Fuel size={16} className="text-primary-600" />
            <span>{bike.specifications.mileage}</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Daily</span>
            <span className="font-bold text-lg text-primary-600">₹{bike.dailyRate}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Monthly</span>
            <span className="font-bold text-lg text-primary-600">₹{bike.monthlyRate}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Unlimited</span>
            <span className="font-bold text-lg text-primary-600">₹{bike.unlimitedRate}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link 
            to={`/bikes/${bike.id}`} 
            className="btn bg-gray-100 text-gray-900 hover:bg-gray-200 py-2 text-center"
          >
            View Details
          </Link>
          <Link 
            to={`/booking?bikeId=${bike.id}`} 
            className="btn btn-primary py-2 text-center"
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BikeCard;