import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Shield, Award } from 'lucide-react';

const AboutPage = () => {
  useEffect(() => {
    document.title = 'About Us - Dehradun Bike Rentals';
  }, []);

  return (
    <div className="pt-20">
      <div className="bg-primary-600 py-16">
        <div className="container-custom">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading-xl text-white mb-6">About Us</h1>
            <p className="text-lg text-primary-100">
              Get to know the team behind Dehradun Bike Rentals and our mission to make exploring Dehradun accessible to everyone.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="heading-lg mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2023 by three passionate biking enthusiasts - Kushagra, Bhumik Singh Dhami & Priyanshu Tiwari, Dehradun Bike Rentals was born from a simple idea: to make exploring the beautiful city of Dehradun and its surrounding hills accessible to everyone.
              </p>
              <p className="text-gray-600 mb-4">
                As students in Dehradun, we noticed the lack of reliable and affordable transportation options for those who wanted to explore beyond the city limits. Many of our friends and classmates wanted to visit nearby attractions like Mussoorie, Chakrata, or even just navigate the city more efficiently, but didn't own vehicles.
              </p>
              <p className="text-gray-600">
                What started with just 5 bikes has now grown into a fleet of over 50 well-maintained vehicles, serving thousands of customers including students, tourists, and locals alike. Our passion for riding and love for the hills continues to fuel our service.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://images.pexels.com/photos/3601453/pexels-photo-3601453.jpeg" 
                alt="Mountain road near Dehradun" 
                className="rounded-lg shadow-md w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2 
              className="heading-lg mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Values
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              These core principles guide everything we do at Dehradun Bike Rentals.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <div className="flex justify-center mb-4">
                <Users size={32} className="text-primary-500" />
              </div>
              <h3 className="heading-sm mb-2">Customer First</h3>
              <p className="text-gray-600">
                We prioritize our customers' needs and satisfaction above all else, ensuring a seamless rental experience.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex justify-center mb-4">
                <Shield size={32} className="text-primary-500" />
              </div>
              <h3 className="heading-sm mb-2">Safety & Quality</h3>
              <p className="text-gray-600">
                We maintain our bikes to the highest standards and prioritize safety in every aspect of our service.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-center mb-4">
                <Award size={32} className="text-primary-500" />
              </div>
              <h3 className="heading-sm mb-2">Reliability</h3>
              <p className="text-gray-600">
                We stand by our commitments and ensure our services are dependable, especially during emergencies.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex justify-center mb-4">
                <Heart size={32} className="text-primary-500" />
              </div>
              <h3 className="heading-sm mb-2">Community Impact</h3>
              <p className="text-gray-600">
                We're committed to supporting the local community and promoting sustainable tourism practices.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Meet the Team */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2 
              className="heading-lg mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Meet the Founders
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              The passionate team behind Dehradun Bike Rentals, dedicated to providing you with the best riding experience.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="/images/WhatsApp Image 2025-06-07 at 16.28.40_ed68b8b4.jpg" 
                  alt="Kushagra Singhal" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="heading-sm mb-1">Kushagra Singhal</h3>
              <p className="text-primary-600 mb-3">Co-Founder & CEO</p>
              <p className="text-gray-600 mb-4">
                A passionate rider with years of experience in the tourism industry. Kushagra handles business operations and strategic partnerships.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="/images/WhatsApp Image 2025-05-26 at 09.28.09_395355ad.jpg" 
                  alt="Bhumik Singh Dhami" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="heading-sm mb-1">Bhumik Singh Dhami</h3>
              <p className="text-primary-600 mb-3">Co-Founder & COO</p>
              <p className="text-gray-600 mb-4">
                A mechanical engineer by training, Bhumik oversees fleet maintenance and ensures all bikes meet our stringent quality standards.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="/images/WhatsApp Image 2025-06-07 at 16.08.10_f335d1c7.jpg" 
                  alt="Priyanshu Tiwari" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="heading-sm mb-1">Priyanshu Tiwari</h3>
              <p className="text-primary-600 mb-3">Co-Founder & CTO</p>
              <p className="text-gray-600 mb-4">
                A tech enthusiast, Priyanshu developed our booking platform and manages all digital aspects of the business, ensuring a seamless online experience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary-600">
        <div className="container-custom">
          <div className="text-center">
            <motion.h2 
              className="heading-lg text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Experience Dehradun on Two Wheels?
            </motion.h2>
            <motion.p 
              className="text-primary-100 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Join the thousands of satisfied customers who have explored Dehradun and beyond with our bikes.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a href="/bikes" className="btn bg-white text-primary-600 hover:bg-primary-50">
                Explore Our Bikes
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;