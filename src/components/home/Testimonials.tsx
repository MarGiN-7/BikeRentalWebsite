import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rahul Kumar',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
    rating: 5,
    text: 'As a student at Graphic Era University, the monthly rental plan for the Activa has been perfect for my daily commute. The team is super helpful and the bikes are always well maintained!',
    date: '2025-03-15T14:30:00Z',
  },
  {
    name: 'Priya Sharma',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    rating: 5,
    text: 'The Suzuki Access 125 is perfect for my daily commute to college. Great mileage and super comfortable for city rides. The staff is really helpful and the rental process is hassle-free!',
    date: '2025-02-28T09:15:00Z',
  },
  {
    name: 'Amit Singh',
    image: 'https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg',
    rating: 4,
    text: 'The Himalayan was perfect for exploring Chakrata. Had a minor issue but their roadside assistance was prompt. Great service and competitive rates for students!',
    date: '2025-01-15T16:45:00Z',
  },
];

const Testimonials = () => {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2 
            className="heading-lg mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Our Customers Say
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Don't just take our word for it. Here's what our happy customers have to say about their rental experience.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} 
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(testimonial.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    {' at '}
                    {new Date(testimonial.date).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;