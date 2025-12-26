import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { User, Settings, Calendar, MapPin, LogOut, Edit, Key } from 'lucide-react';

const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  useEffect(() => {
    document.title = 'My Profile - Dehradun Bike Rentals';
    
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login?redirect=profile');
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 text-center border-b">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={40} className="text-primary-600" />
                </div>
                <h2 className="heading-md">{user.name || 'User'}</h2>
                <p className="text-gray-600 mb-2">{user.email}</p>
                {user.phone && (
                  <p className="text-gray-600">{user.phone}</p>
                )}
              </div>
              
              <nav className="p-4">
                <ul className="space-y-1">
                  <li>
                    <button 
                      onClick={() => setActiveTab('profile')}
                      className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                        activeTab === 'profile' 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <User size={18} />
                      <span>My Profile</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('bookings')}
                      className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                        activeTab === 'bookings' 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <Calendar size={18} />
                      <span>My Bookings</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('addresses')}
                      className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                        activeTab === 'addresses' 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <MapPin size={18} />
                      <span>Saved Addresses</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('security')}
                      className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                        activeTab === 'security' 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <Key size={18} />
                      <span>Security</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('settings')}
                      className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                        activeTab === 'settings' 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <Settings size={18} />
                      <span>Settings</span>
                    </button>
                  </li>
                  <li className="pt-2 border-t mt-2">
                    <button 
                      onClick={logout}
                      className="flex items-center gap-3 w-full p-3 rounded-lg text-error-600 hover:bg-error-50 transition-colors"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </motion.div>
          
          {/* Main Content */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="heading-md">Personal Information</h2>
                  <button className="btn btn-outline py-2 px-4 flex items-center gap-2">
                    <Edit size={16} />
                    Edit Profile
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm text-gray-500 mb-1">Full Name</h3>
                    <p className="font-medium">{user.name || 'Not provided'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500 mb-1">Email Address</h3>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500 mb-1">Phone Number</h3>
                    <p className="font-medium">{user.phone || 'Not provided'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500 mb-1">Member Since</h3>
                    <p className="font-medium">June 2023</p>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <h2 className="heading-sm mb-4">Documents</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">Driving License</h3>
                        <span className="text-xs bg-success-100 text-success-800 px-2 py-1 rounded">Verified</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">DLXXXX1234567</p>
                      <button className="text-sm text-primary-600 hover:text-primary-700">
                        View Document
                      </button>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">ID Proof</h3>
                        <span className="text-xs bg-success-100 text-success-800 px-2 py-1 rounded">Verified</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Aadhar Card</p>
                      <button className="text-sm text-primary-600 hover:text-primary-700">
                        View Document
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="heading-md mb-6">My Bookings</h2>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <span className="text-xs bg-success-100 text-success-800 px-2 py-1 rounded">Active</span>
                        <h3 className="font-semibold mt-2">Royal Enfield Classic 350</h3>
                        <p className="text-sm text-gray-600">Booking ID: #RB12345</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <p className="text-sm">
                          <span className="font-medium">Pickup:</span> 15 June 2023
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Return:</span> 18 June 2023
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button className="btn btn-outline py-1 px-3 text-sm">
                        View Details
                      </button>
                      <button className="btn bg-error-100 text-error-700 hover:bg-error-200 focus:ring-error-500 py-1 px-3 text-sm">
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Completed</span>
                        <h3 className="font-semibold mt-2">Honda Activa 6G</h3>
                        <p className="text-sm text-gray-600">Booking ID: #RB12340</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <p className="text-sm">
                          <span className="font-medium">Pickup:</span> 1 June 2023
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Return:</span> 10 June 2023
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button className="btn btn-outline py-1 px-3 text-sm">
                        View Details
                      </button>
                      <button className="btn bg-primary-100 text-primary-700 hover:bg-primary-200 focus:ring-primary-500 py-1 px-3 text-sm">
                        Book Again
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <a href="/bikes" className="btn btn-primary">
                    Browse Bikes
                  </a>
                </div>
              </div>
            )}
            
            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="heading-md">Saved Addresses</h2>
                  <button className="btn btn-outline py-2 px-4 flex items-center gap-2">
                    <Edit size={16} />
                    Add New Address
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">Home</h3>
                      <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">Default</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      123 Model Colony, Near IMA Hall, Dehradun, Uttarakhand - 248001
                    </p>
                    <div className="flex gap-2">
                      <button className="text-sm text-primary-600 hover:text-primary-700">
                        Edit
                      </button>
                      <span className="text-gray-300">|</span>
                      <button className="text-sm text-error-600 hover:text-error-700">
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">Office</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      456 Rajpur Road, Near Clock Tower, Dehradun, Uttarakhand - 248001
                    </p>
                    <div className="flex gap-2">
                      <button className="text-sm text-primary-600 hover:text-primary-700">
                        Edit
                      </button>
                      <span className="text-gray-300">|</span>
                      <button className="text-sm text-error-600 hover:text-error-700">
                        Delete
                      </button>
                      <span className="text-gray-300">|</span>
                      <button className="text-sm text-gray-600 hover:text-gray-700">
                        Set as Default
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="heading-md mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="heading-sm mb-4">Change Password</h3>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="label">Current Password</label>
                        <input 
                          type="password" 
                          id="currentPassword" 
                          placeholder="••••••••" 
                          className="input"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="label">New Password</label>
                        <input 
                          type="password" 
                          id="newPassword" 
                          placeholder="••••••••" 
                          className="input"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="label">Confirm New Password</label>
                        <input 
                          type="password" 
                          id="confirmPassword" 
                          placeholder="••••••••" 
                          className="input"
                        />
                      </div>
                      
                      <button type="submit" className="btn btn-primary">
                        Update Password
                      </button>
                    </form>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="heading-sm mb-4">Two-Factor Authentication</h3>
                    <p className="text-gray-600 mb-4">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <button className="btn btn-outline">
                      Enable 2FA
                    </button>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="heading-sm mb-4 text-error-600">Danger Zone</h3>
                    <p className="text-gray-600 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button className="btn bg-error-100 text-error-700 hover:bg-error-200 focus:ring-error-500">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="heading-md mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="heading-sm mb-4">Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">Email Notifications</span>
                        <input type="checkbox" defaultChecked className="h-5 w-5 text-primary-600 focus:ring-primary-500" />
                      </label>
                      
                      <label className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">SMS Notifications</span>
                        <input type="checkbox" defaultChecked className="h-5 w-5 text-primary-600 focus:ring-primary-500" />
                      </label>
                      
                      <label className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">Promotional Emails</span>
                        <input type="checkbox" className="h-5 w-5 text-primary-600 focus:ring-primary-500" />
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="heading-sm mb-4">Preferences</h3>
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="language" className="label">Language</label>
                        <select id="language" className="input">
                          <option value="en">English</option>
                          <option value="hi">Hindi</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="currency" className="label">Currency</label>
                        <select id="currency" className="input">
                          <option value="inr">Indian Rupee (₹)</option>
                          <option value="usd">US Dollar ($)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="heading-sm mb-4">Data Privacy</h3>
                    <p className="text-gray-600 mb-4">
                      Manage how we use your data and download a copy of your personal information.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="btn btn-outline">
                        Download My Data
                      </button>
                      <button className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500">
                        Privacy Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;