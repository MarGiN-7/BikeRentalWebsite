import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Recycle as Motorcycle, Menu, X, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Motorcycle 
            size={32} 
            className={`transition-colors duration-300 ${
              isScrolled ? 'text-primary-600' : 'text-white'
            }`} 
          />
          <span 
            className={`text-xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
          >
            Dehradun Bike Rentals
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`font-medium transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-200'
            } ${location.pathname === '/' ? 'font-bold' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/bikes" 
            className={`font-medium transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-200'
            } ${location.pathname === '/bikes' ? 'font-bold' : ''}`}
          >
            Bikes
          </Link>
          <Link 
            to="/booking" 
            className={`font-medium transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-200'
            } ${location.pathname === '/booking' ? 'font-bold' : ''}`}
          >
            Book Now
          </Link>
          <Link 
            to="/about" 
            className={`font-medium transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-200'
            } ${location.pathname === '/about' ? 'font-bold' : ''}`}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`font-medium transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-200'
            } ${location.pathname === '/contact' ? 'font-bold' : ''}`}
          >
            Contact
          </Link>
          
          {isAuthenticated ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center gap-2 font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-200'
                }`}
              >
                <UserCircle size={20} />
                <span>{user?.name || 'Profile'}</span>
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span className="flex items-center gap-2">
                      <LogOut size={16} />
                      Logout
                    </span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login" 
              className="btn btn-primary"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X 
              size={24} 
              className={isScrolled ? 'text-gray-900' : 'text-white'} 
            />
          ) : (
            <Menu 
              size={24} 
              className={isScrolled ? 'text-gray-900' : 'text-white'} 
            />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="container-custom py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className="font-medium text-gray-700 hover:text-primary-600"
            >
              Home
            </Link>
            <Link 
              to="/bikes" 
              className="font-medium text-gray-700 hover:text-primary-600"
            >
              Bikes
            </Link>
            <Link 
              to="/booking" 
              className="font-medium text-gray-700 hover:text-primary-600"
            >
              Book Now
            </Link>
            <Link 
              to="/about" 
              className="font-medium text-gray-700 hover:text-primary-600"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="font-medium text-gray-700 hover:text-primary-600"
            >
              Contact
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="font-medium text-gray-700 hover:text-primary-600"
                >
                  My Profile
                </Link>
                <button 
                  onClick={logout}
                  className="flex items-center gap-2 font-medium text-gray-700 hover:text-primary-600"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="btn btn-primary w-full"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;