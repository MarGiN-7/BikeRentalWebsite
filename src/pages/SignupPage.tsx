import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { Recycle as Motorcycle, UserPlus } from 'lucide-react';

interface SignupFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signup } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormData>();
  const password = watch('password');
  
  useEffect(() => {
    document.title = 'Sign Up - Dehradun Bike Rentals';
  }, []);
  
  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    try {
      setLoading(true);
      setError(null);
      
      await signup(data.email, data.password, data.name);
      
      // Redirect to the home page after successful signup
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <div className="max-w-md mx-auto">
          <motion.div 
            className="bg-white rounded-lg shadow-md p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <Motorcycle size={40} className="text-primary-600" />
              </div>
              <h1 className="heading-lg mb-2">Create Your Account</h1>
              <p className="text-gray-600">
                Join us to start renting bikes in Dehradun
              </p>
            </div>
            
            {error && (
              <div className="bg-error-100 text-error-800 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="label">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="John Doe" 
                  className={`input ${errors.name ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                  {...register('name', { required: 'Full name is required' })}
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
                  placeholder="your@email.com" 
                  className={`input ${errors.email ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                  {...register('email', { 
                    required: 'Email is required', 
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
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
                  placeholder="+91 9876543210" 
                  className={`input ${errors.phone ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                  {...register('phone', { 
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                      message: 'Invalid phone number',
                    }
                  })}
                />
                {errors.phone && (
                  <p className="text-error-600 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="label">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="••••••••" 
                  className={`input ${errors.password ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    }
                  })}
                />
                {errors.password && (
                  <p className="text-error-600 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="label">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  placeholder="••••••••" 
                  className={`input ${errors.confirmPassword ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match',
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-error-600 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
              
              <div>
                <label className={`flex items-start cursor-pointer ${
                  errors.agreeTerms ? 'text-error-600' : ''
                }`}>
                  <input 
                    type="checkbox" 
                    className="mt-1 mr-2"
                    {...register('agreeTerms', { required: true })}
                  />
                  <span className="text-sm">
                    I agree to the <a href="#" className="text-primary-600 hover:underline">Terms and Conditions</a> and 
                    <a href="#" className="text-primary-600 hover:underline"> Privacy Policy</a>.
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="text-error-600 text-sm mt-1">
                    You must agree to the terms and privacy policy
                  </p>
                )}
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary w-full flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                ) : (
                  <UserPlus size={18} className="mr-2" />
                )}
                Create Account
              </button>
              
              <p className="text-center text-sm text-gray-600">
                Already have an account? <Link to="/login" className="text-primary-600 hover:text-primary-800">Sign in</Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;