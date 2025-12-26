import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, ArrowRight, Thermometer, Loader as Road, Mountain, Shield } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  useEffect(() => {
    document.title = 'Contact Us - Dehradun Bike Rentals';
  }, []);
  
  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitError('There was an error sending your message. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const locations = [
    {
      name: "Mussoorie",
      description: "Queen of Hills - Perfect for scenic rides",
      image: "https://images.pexels.com/photos/15286/pexels-photo.jpg",
      weather: "https://www.accuweather.com/en/in/mussoorie/189320/weather-forecast/189320",
      roads: "https://www.google.com/maps/dir/Dehradun,+Uttarakhand/Mussoorie,+Uttarakhand",
      culture: "https://uttarakhandtourism.gov.in/destination/mussoorie",
      gear: [
        "Warm clothing (temperature drops with altitude)",
        "Rain gear (frequent mist and rain)",
        "Good brakes for steep descents",
        "Helmet with visor"
      ]
    },
    {
      name: "Chakrata",
      description: "Adventure paradise with mountain trails",
      image: "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg",
      weather: "https://www.accuweather.com/en/in/chakrata/3075281/weather-forecast/3075281",
      roads: "https://www.google.com/maps/dir/Dehradun,+Uttarakhand/Chakrata,+Uttarakhand",
      culture: "https://uttarakhandtourism.gov.in/destination/chakrata",
      gear: [
        "Off-road tires recommended",
        "Protective gear for rough terrain",
        "Emergency toolkit",
        "GPS device"
      ]
    },
    {
      name: "Sahastradhara",
      description: "Sulphur springs and scenic routes",
      image: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg",
      weather: "https://www.accuweather.com/en/in/dehradun/187928/weather-forecast/187928",
      roads: "https://www.google.com/maps/dir/Dehradun,+Uttarakhand/Sahastradhara,+Uttarakhand",
      culture: "https://uttarakhandtourism.gov.in/destination/sahastradhara",
      gear: [
        "Light waterproof jacket",
        "Swimming gear",
        "Anti-slip footwear",
        "First-aid kit"
      ]
    },
    {
      name: "Dhanaulti",
      description: "Pine forests and apple orchards",
      image: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg",
      weather: "https://www.accuweather.com/en/in/dhanaulti/3075291/weather-forecast/3075291",
      roads: "https://www.google.com/maps/dir/Dehradun,+Uttarakhand/Dhanaulti,+Uttarakhand",
      culture: "https://uttarakhandtourism.gov.in/destination/dhanaulti",
      gear: [
        "Thermal wear in winter",
        "Fog lights recommended",
        "Chain lubricant",
        "Emergency blanket"
      ]
    }
  ];
  
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-20 overflow-hidden">
        {/* Animated Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'movePattern 20s linear infinite',
          }}
        />

        <div className="container-custom relative z-10">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MessageCircle size={48} className="text-primary-500 mx-auto mb-6" />
            <h1 className="heading-xl text-white mb-6">Get in Touch</h1>
            <p className="text-lg text-gray-300">
              Have questions about our bikes or services? We're here to help you get on the road.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="container-custom -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <MapPin size={24} />,
              title: "Visit Us",
              content: "123 Rajpur Road, Near Clock Tower, Dehradun, Uttarakhand - 248001",
              color: "from-blue-500 to-blue-600"
            },
            {
              icon: <Phone size={24} />,
              title: "Call Us",
              content: "+91 92590 33669\n+91 83183 23318\n+91 9520226668",
              color: "from-green-500 to-green-600"
            },
            {
              icon: <Mail size={24} />,
              title: "Email Us",
              content: "support@dehradunbikerentals.com",
              color: "from-purple-500 to-purple-600"
            },
            {
              icon: <Clock size={24} />,
              title: "Working Hours",
              content: "Mon - Sat: 8:00 AM - 8:00 PM\nSunday: 9:00 AM - 6:00 PM",
              color: "from-orange-500 to-orange-600"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${item.color} p-4 text-white flex items-center gap-3`}>
                {item.icon}
                <h3 className="font-semibold">{item.title}</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600 whitespace-pre-line">{item.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Send className="text-primary-600" />
              Send Us a Message
            </h2>

            {submitSuccess && (
              <div className="bg-success-50 text-success-800 p-4 rounded-lg mb-6">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            {submitError && (
              <div className="bg-error-50 text-error-800 p-4 rounded-lg mb-6">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="label">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className={`input ${errors.name ? 'border-error-500' : ''}`}
                  placeholder="John Doe"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <p className="text-error-600 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="label">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className={`input ${errors.email ? 'border-error-500' : ''}`}
                  placeholder="your@email.com"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-error-600 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="label">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className={`input ${errors.phone ? 'border-error-500' : ''}`}
                  placeholder="+91 9876543210"
                  {...register('phone', { 
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                      message: 'Invalid phone number'
                    }
                  })}
                />
                {errors.phone && (
                  <p className="text-error-600 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="label">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className={`input ${errors.subject ? 'border-error-500' : ''}`}
                  placeholder="How can we help you?"
                  {...register('subject', { required: 'Subject is required' })}
                />
                {errors.subject && (
                  <p className="text-error-600 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="label">Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className={`input ${errors.message ? 'border-error-500' : ''}`}
                  placeholder="Tell us more about your inquiry..."
                  {...register('message', { required: 'Message is required' })}
                ></textarea>
                {errors.message && (
                  <p className="text-error-600 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-full flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">Popular Riding Destinations</h2>
            <div className="grid grid-cols-1 gap-6">
              {locations.map((location, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="relative h-48">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-bold text-white">{location.name}</h3>
                        <p className="text-gray-200">{location.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <a 
                        href={location.weather} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        <Thermometer size={18} />
                        <span>Weather Info</span>
                      </a>
                      <a 
                        href={location.roads} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        <Road size={18} />
                        <span>Route Map</span>
                      </a>
                      <a 
                        href={location.culture} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        <Mountain size={18} />
                        <span>Local Guide</span>
                      </a>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Shield size={18} className="text-primary-600" />
                        Recommended Gear
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {location.gear.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary-600 rounded-full"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes movePattern {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;