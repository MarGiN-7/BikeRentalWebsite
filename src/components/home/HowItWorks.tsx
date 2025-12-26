import { motion } from 'framer-motion';
import { MousePointerClick, CalendarCheck, Recycle as Motorcycle, MapPin } from 'lucide-react';

const steps = [
  {
    icon: <MousePointerClick size={32} className="text-primary-500" />,
    title: 'Choose Your Bike',
    description: 'Browse our extensive collection and select the perfect bike for your needs.',
  },
  {
    icon: <CalendarCheck size={32} className="text-primary-500" />,
    title: 'Book Your Dates',
    description: 'Select your rental period and plan. Upload required documents.',
  },
  {
    icon: <MapPin size={32} className="text-primary-500" />,
    title: 'Pickup Location',
    description: 'Choose between our central location pickup or home delivery (within city limits).',
  },
  {
    icon: <Motorcycle size={32} className="text-primary-500" />,
    title: 'Enjoy Your Ride',
    description: 'Hit the road and explore Dehradun and beyond with your rental bike.',
  },
];

const HowItWorks = () => {
  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2 
            className="heading-lg mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Renting a bike with us is quick and easy. Follow these simple steps to get on the road.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="heading-sm mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;