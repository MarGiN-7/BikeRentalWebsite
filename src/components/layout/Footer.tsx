import { Link } from 'react-router-dom';
import { Recycle as Motorcycle, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const handleSocialLogin = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'facebook':
        url = 'https://www.facebook.com/login';
        break;
      case 'instagram':
        url = 'https://www.instagram.com/accounts/login';
        break;
      case 'twitter':
        url = 'https://twitter.com/i/flow/login';
        break;
    }
    // Open in a new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Motorcycle size={28} className="text-primary-500" />
              <span className="text-xl font-bold">Dehradun Bike Rentals</span>
            </div>
            <p className="text-gray-300 mb-4">
              Explore Dehradun and beyond with our premium bike rental service. From city commutes to mountain adventures, we've got you covered.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => handleSocialLogin('facebook')}
                className="text-gray-300 hover:text-primary-500 transition-colors"
                aria-label="Login with Facebook"
              >
                <Facebook size={20} />
              </button>
              <button 
                onClick={() => handleSocialLogin('instagram')}
                className="text-gray-300 hover:text-primary-500 transition-colors"
                aria-label="Login with Instagram"
              >
                <Instagram size={20} />
              </button>
              <button 
                onClick={() => handleSocialLogin('twitter')}
                className="text-gray-300 hover:text-primary-500 transition-colors"
                aria-label="Login with Twitter"
              >
                <Twitter size={20} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/bikes" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Our Bikes
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Book Now
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Login / Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Bike Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Bike Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/bikes?category=urban" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Urban Commuters
                </Link>
              </li>
              <li>
                <Link to="/bikes?category=touring" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Touring Bikes
                </Link>
              </li>
              <li>
                <Link to="/bikes?category=mountain" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Mountain & Off-Road
                </Link>
              </li>
              <li>
                <Link to="/bikes?category=premium" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Premium & Performance
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Rajpur Road, Near Clock Tower, Dehradun, Uttarakhand - 248001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-primary-500 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>+91 92590 33669</p>
                  <p>+91 83183 23318</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary-500 flex-shrink-0" />
                <a href="mailto:support@dehradunbikerentals.com" className="text-gray-300 hover:text-primary-500 transition-colors">
                  support@dehradunbikerentals.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Dehradun Bike Rentals. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-primary-500 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary-500 transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/faq" className="text-gray-400 hover:text-primary-500 transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;