import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getBikeById } from '../data/bikes';
import { Bike } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, MapPin, CreditCard, Upload, AlertCircle, Shield, Clock, Bike as BikeIcon, CheckCircle2, Info } from 'lucide-react';

interface BookingFormData {
  startDate: string;
  endDate: string;
  plan: 'daily' | 'monthly' | 'unlimited';
  pickupLocation: 'store' | 'delivery';
  deliveryAddress?: string;
  drivingLicense: FileList;
  idProof: FileList;
  paymentMethod: 'online' | 'cash';
  agreeTerms: boolean;
}

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [totalDays, setTotalDays] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<BookingFormData>();
  
  const selectedPlan = watch('plan') || 'daily';
  const selectedStartDate = watch('startDate');
  const selectedEndDate = watch('endDate');
  const isDelivery = watch('pickupLocation') === 'delivery';
  
  useEffect(() => {
    document.title = 'Book Your Bike - Dehradun Bike Rentals';
    
    const bikeId = searchParams.get('bikeId');
    if (bikeId) {
      const bike = getBikeById(bikeId);
      if (bike) {
        setSelectedBike(bike);
      }
    }
  }, [searchParams]);
  
  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      const start = new Date(selectedStartDate);
      const end = new Date(selectedEndDate);
      
      if (start && end && end >= start) {
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        
        setTotalDays(diffDays);
        
        if (selectedBike) {
          let baseAmount = 0;
          if (selectedPlan === 'daily') {
            baseAmount = selectedBike.dailyRate * diffDays;
          } else if (selectedPlan === 'monthly') {
            baseAmount = selectedBike.monthlyRate * (diffDays / 30);
          } else {
            baseAmount = selectedBike.unlimitedRate;
          }
          
          const taxAmount = (baseAmount * selectedBike.tax!) / 100;
          setTotalAmount(baseAmount + taxAmount);
        }
      }
    }
  }, [selectedStartDate, selectedEndDate, selectedPlan, selectedBike]);

  const sendBookingEmail = async (bookingDetails: any) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-booking-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: user?.email,
          subject: 'Booking Confirmation - Dehradun Bike Rentals',
          bookingDetails: {
            bikeName: selectedBike?.name,
            startDate: selectedStartDate,
            endDate: selectedEndDate,
            plan: selectedPlan,
            totalAmount: totalAmount,
            tax: (totalAmount * selectedBike?.tax!) / 100,
            finalAmount: totalAmount + (totalAmount * selectedBike?.tax!) / 100,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const onSubmit: SubmitHandler<BookingFormData> = async (data) => {
    if (!isAuthenticated) {
      navigate('/login?redirect=booking');
      return;
    }
    
    try {
      // Send booking confirmation email
      await sendBookingEmail({
        startDate: data.startDate,
        endDate: data.endDate,
        plan: data.plan,
      });

      alert('Booking successful! A confirmation email has been sent to your registered email address.');
      navigate('/');
    } catch (error) {
      console.error('Error processing booking:', error);
      alert('There was an error processing your booking. Please try again.');
    }
  };

  const steps = [
    { title: 'Select Dates', icon: Calendar },
    { title: 'Pickup Details', icon: MapPin },
    { title: 'Documents', icon: Upload },
    { title: 'Payment', icon: CreditCard },
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
            <BikeIcon size={48} className="text-primary-500 mx-auto mb-6" />
            <h1 className="heading-xl text-white mb-6">Book Your Perfect Ride</h1>
            <p className="text-lg text-gray-300">
              Complete your booking in just a few simple steps. All bookings include insurance and 24/7 roadside assistance.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Booking Steps */}
      <div className="container-custom -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
          <div className="flex justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div 
                  key={index}
                  className={`flex-1 flex flex-col items-center ${
                    index < steps.length - 1 ? 'border-r border-gray-200' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    currentStep > index + 1
                      ? 'bg-success-100 text-success-600'
                      : currentStep === index + 1
                      ? 'bg-primary-100 text-primary-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {currentStep > index + 1 ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      <StepIcon size={20} />
                    )}
                  </div>
                  <span className={`text-sm font-medium ${
                    currentStep === index + 1 ? 'text-primary-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  {/* Step 1: Select Dates */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-8"
                    >
                      <h2 className="text-2xl font-bold mb-6">Select Your Dates</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                          <label htmlFor="startDate" className="label">Pickup Date</label>
                          <div className="relative">
                            <input 
                              type="date" 
                              id="startDate" 
                              className={`input pl-10 ${errors.startDate ? 'border-error-500' : ''}`}
                              min={new Date().toISOString().split('T')[0]}
                              {...register('startDate', { required: true })}
                            />
                            <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                          </div>
                          {errors.startDate && (
                            <p className="text-error-600 text-sm mt-1">Pickup date is required</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="endDate" className="label">Return Date</label>
                          <div className="relative">
                            <input 
                              type="date" 
                              id="endDate" 
                              className={`input pl-10 ${errors.endDate ? 'border-error-500' : ''}`}
                              min={selectedStartDate || new Date().toISOString().split('T')[0]}
                              {...register('endDate', { required: true })}
                            />
                            <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                          </div>
                          {errors.endDate && (
                            <p className="text-error-600 text-sm mt-1">Return date is required</p>
                          )}
                        </div>
                      </div>

                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4">Select Your Plan</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            {
                              value: 'daily',
                              title: 'Daily',
                              description: 'Perfect for short trips',
                              rate: selectedBike?.dailyRate,
                              icon: Clock,
                            },
                            {
                              value: 'monthly',
                              title: 'Monthly',
                              description: 'Best value for long stays',
                              rate: selectedBike?.monthlyRate,
                              icon: Calendar,
                            },
                            {
                              value: 'unlimited',
                              title: 'Unlimited',
                              description: 'No distance limits',
                              rate: selectedBike?.unlimitedRate,
                              icon: Shield,
                            }
                          ].map((plan) => {
                            const PlanIcon = plan.icon;
                            return (
                              <label
                                key={plan.value}
                                className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
                                  selectedPlan === plan.value
                                    ? 'border-primary-500 bg-primary-50'
                                    : 'border-gray-200 hover:border-primary-200'
                                }`}
                              >
                                <input
                                  type="radio"
                                  value={plan.value}
                                  className="sr-only"
                                  {...register('plan')}
                                />
                                <div className="flex items-center gap-3 mb-2">
                                  <div className={`p-2 rounded-lg ${
                                    selectedPlan === plan.value
                                      ? 'bg-primary-100 text-primary-600'
                                      : 'bg-gray-100 text-gray-500'
                                  }`}>
                                    <PlanIcon size={20} />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold">{plan.title}</h4>
                                    <p className="text-sm text-gray-500">{plan.description}</p>
                                  </div>
                                </div>
                                <div className="text-xl font-bold text-primary-600">
                                  ₹{plan.rate}
                                  <span className="text-sm text-gray-500">
                                    {plan.value === 'daily' ? '/day' : plan.value === 'monthly' ? '/month' : ''}
                                  </span>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="btn btn-primary"
                        >
                          Continue to Pickup Details
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Pickup Details */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-8"
                    >
                      <h2 className="text-2xl font-bold mb-6">Pickup Details</h2>

                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4">Select Pickup Method</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <label className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
                            !isDelivery
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-primary-200'
                          }`}>
                            <input
                              type="radio"
                              value="store"
                              className="sr-only"
                              {...register('pickupLocation')}
                            />
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${
                                !isDelivery
                                  ? 'bg-primary-100 text-primary-600'
                                  : 'bg-gray-100 text-gray-500'
                              }`}>
                                <MapPin size={20} />
                              </div>
                              <div>
                                <h4 className="font-semibold">Store Pickup</h4>
                                <p className="text-sm text-gray-600 mb-2">
                                  123 Rajpur Road, Near Clock Tower, Dehradun
                                </p>
                                <div className="flex items-center gap-2 text-sm text-success-600">
                                  <CheckCircle2 size={16} />
                                  <span>Free</span>
                                </div>
                              </div>
                            </div>
                          </label>

                          <label className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
                            isDelivery
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-primary-200'
                          }`}>
                            <input
                              type="radio"
                              value="delivery"
                              className="sr-only"
                              {...register('pickupLocation')}
                            />
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${
                                isDelivery
                                  ? 'bg-primary-100 text-primary-600'
                                  : 'bg-gray-100 text-gray-500'
                              }`}>
                                <MapPin size={20} />
                              </div>
                              <div>
                                <h4 className="font-semibold">Home Delivery</h4>
                                <p className="text-sm text-gray-600 mb-2">
                                  We'll deliver to your location in Dehradun
                                </p>
                                <div className="flex items-center gap-2 text-sm text-primary-600">
                                  <Info size={16} />
                                  <span>₹100 delivery fee</span>
                                </div>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>

                      {isDelivery && (
                        <div className="mb-8">
                          <label htmlFor="deliveryAddress" className="label">Delivery Address</label>
                          <textarea
                            id="deliveryAddress"
                            rows={3}
                            className={`input ${errors.deliveryAddress ? 'border-error-500' : ''}`}
                            placeholder="Enter your complete address with landmarks"
                            {...register('deliveryAddress', { required: isDelivery })}
                          ></textarea>
                          {errors.deliveryAddress && (
                            <p className="text-error-600 text-sm mt-1">Delivery address is required</p>
                          )}
                        </div>
                      )}

                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="btn btn-outline"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="btn btn-primary"
                        >
                          Continue to Documents
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Documents */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-8"
                    >
                      <h2 className="text-2xl font-bold mb-6">Required Documents</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="drivingLicense" className="label">Driving License</label>
                          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors">
                            <Upload size={32} className="text-gray-400 mx-auto mb-4" />
                            <p className="text-sm text-gray-600 mb-4">
                              Upload your valid driving license<br />
                              (JPG, PNG or PDF, max 5MB)
                            </p>
                            <input
                              type="file"
                              id="drivingLicense"
                              accept="image/*,.pdf"
                              className="sr-only"
                              {...register('drivingLicense', { required: true })}
                            />
                            <button
                              type="button"
                              onClick={() => document.getElementById('drivingLicense')?.click()}
                              className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500"
                            >
                              Choose File
                            </button>
                          </div>
                          {errors.drivingLicense && (
                            <p className="text-error-600 text-sm mt-1">Driving license is required</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="idProof" className="label">ID Proof</label>
                          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors">
                            <Upload size={32} className="text-gray-400 mx-auto mb-4" />
                            <p className="text-sm text-gray-600 mb-4">
                              Upload Aadhar, Passport or Voter ID<br />
                              (JPG, PNG or PDF, max 5MB)
                            </p>
                            <input
                              type="file"
                              id="idProof"
                              accept="image/*,.pdf"
                              className="sr-only"
                              {...register('idProof', { required: true })}
                            />
                            <button
                              type="button"
                              onClick={() => document.getElementById('idProof')?.click()}
                              className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500"
                            >
                              Choose File
                            </button>
                          </div>
                          {errors.idProof && (
                            <p className="text-error-600 text-sm mt-1">ID proof is required</p>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between mt-8">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="btn btn-outline"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(4)}
                          className="btn btn-primary"
                        >
                          Continue to Payment
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Payment */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-8"
                    >
                      <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <label className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
                          watch('paymentMethod') === 'online'
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-200'
                        }`}>
                          <input
                            type="radio"
                            value="online"
                            className="sr-only"
                            {...register('paymentMethod', { required: true })}
                          />
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              watch('paymentMethod') === 'online'
                                ? 'bg-primary-100 text-primary-600'
                                : 'bg-gray-100 text-gray-500'
                            }`}>
                              <CreditCard size={20} />
                            </div>
                            <div>
                              <h4 className="font-semibold">Pay Online</h4>
                              <p className="text-sm text-gray-600">Credit/Debit Card, UPI, Wallets</p>
                            </div>
                          </div>
                        </label>

                        <label className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
                          watch('paymentMethod') === 'cash'
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-200'
                        }`}>
                          <input
                            type="radio"
                            value="cash"
                            className="sr-only"
                            {...register('paymentMethod', { required: true })}
                          />
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              watch('paymentMethod') === 'cash'
                                ? 'bg-primary-100 text-primary-600'
                                : 'bg-gray-100 text-gray-500'
                            }`}>
                              <CreditCard size={20} />
                            </div>
                            <div>
                              <h4 className="font-semibold">Pay at Pickup</h4>
                              <p className="text-sm text-gray-600">Cash or Card payment</p>
                            </div>
                          </div>
                        </label>
                      </div>

                      <div className="mb-8">
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
                            understand that I will be liable for any damages to the vehicle beyond normal wear and tear.
                          </span>
                        </label>
                        {errors.agreeTerms && (
                          <p className="text-error-600 text-sm mt-1">
                            You must agree to the terms and conditions
                          </p>
                        )}
                      </div>

                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="btn btn-outline"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          Complete Booking
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Booking Summary</h2>

              {selectedBike ? (
                <div className="mb-6">
                  <div className="flex items-center gap-4 pb-4 border-b">
                    <img
                      src={selectedBike.imageUrl}
                      alt={selectedBike.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold">{selectedBike.name}</h3>
                      <p className="text-sm text-gray-600">{selectedBike.type} • {selectedBike.category}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
                  <p className="text-gray-600">
                    No bike selected. Please select a bike from our collection.
                  </p>
                  <a href="/bikes" className="link block mt-2">
                    Browse Bikes
                  </a>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Rental Period:</span>
                  <span>{totalDays} day{totalDays !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan:</span>
                  <span className="capitalize">{selectedPlan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bike Rate:</span>
                  <span>₹{selectedBike ? (
                    selectedPlan === 'daily' ? selectedBike.dailyRate :
                    selectedPlan === 'monthly' ? selectedBike.monthlyRate :
                    selectedBike.unlimitedRate
                  ) : 0}{selectedPlan === 'daily' ? '/day' : selectedPlan === 'monthly' ? '/month' : ''}</span>
                </div>
                {isDelivery && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee:</span>
                    <span>₹100</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Security Deposit:</span>
                  
                  <span>₹2,000</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="text-xl font-bold text-accent-600">
                    ₹{totalAmount + (isDelivery ? 100 : 0) + 2000}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  (Including refundable security deposit)
                </p>
              </div>

              {!isAuthenticated && (
                <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">
                  <AlertCircle size={20} className="text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Login Required</p>
                    <p className="text-sm text-gray-600 mb-2">
                      Please log in to complete your booking.
                    </p>
                    <a href="/login?redirect=booking" className="link">
                      Login Now
                    </a>
                  </div>
                </div>
              )}
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

export default BookingPage;