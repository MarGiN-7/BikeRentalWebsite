import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-16 bg-primary-600">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="mb-8 md:mb-0 md:mr-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="heading-lg text-white mb-4">Ready to Explore Dehradun?</h2>
            <p className="text-primary-100 max-w-xl">
              Book your bike today and experience the freedom of the open road. 
              Whether it's for a day trip or a month-long adventure, we've got the 
              perfect ride waiting for you.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/booking" className="btn bg-white text-primary-600 hover:bg-primary-50">
              Book Your Ride Now <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;