import { motion } from 'framer-motion';
import { Recycle as Motorcycle } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50">
      {/* Technology-themed background with circuit pattern */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      >
        {/* Animated grid lines */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: `linear-gradient(to right, rgba(99,102,241,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          animation: 'moveGrid 20s linear infinite',
        }} />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4">
        {/* Logo animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2 }}
          className="mb-8"
        >
          <div className="relative">
            <Motorcycle size={80} className="text-white" />
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Motorcycle size={80} className="text-primary-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4 text-center"
        >
          Dehradun Bike Rentals
        </motion.h2>

        {/* Loading bar */}
        <div className="relative w-64 h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500"
          />
        </div>

        {/* Loading text */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, delay: 0.7 }}
          className="text-lg text-primary-200 text-center"
        >
          Loading your adventure...
        </motion.p>

        {/* Animated dots */}
        <motion.div
          className="flex gap-1 mt-2"
          animate={{
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary-400"
              style={{
                animation: `bounce 1.5s ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Add keyframes for animations */}
      <style>
        {`
          @keyframes moveGrid {
            0% { transform: translate(0, 0); }
            100% { transform: translate(40px, 40px); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;