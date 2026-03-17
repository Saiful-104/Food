import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaCreditCard, FaPaypal, FaGooglePay, FaApplePay, FaTruck, FaLock } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  // Sample cart total - in real app, this would come from context/state
  const cartTotal = 45.97;
  const deliveryFee = 2.99;
  const tax = 3.68;
  const total = cartTotal + deliveryFee + tax;

  const onSubmit = async (data) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success('Order placed successfully!');
      setLoading(false);
      navigate('/orders');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20 pb-12">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Delivery Address */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaTruck className="mr-2 text-primary-500" />
                Delivery Address
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Street Address</label>
                  <input
                    {...register('street', { required: 'Street address is required' })}
                    className="input-field"
                    placeholder="123 Main St"
                  />
                  {errors.street && (
                    <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Apartment/Suite (Optional)</label>
                  <input
                    {...register('apartment')}
                    className="input-field"
                    placeholder="Apt 4B"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    {...register('city', { required: 'City is required' })}
                    className="input-field"
                    placeholder="New York"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">State</label>
                  <input
                    {...register('state', { required: 'State is required' })}
                    className="input-field"
                    placeholder="NY"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">ZIP Code</label>
                  <input
                    {...register('zipCode', { required: 'ZIP code is required' })}
                    className="input-field"
                    placeholder="10001"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    {...register('phone', { required: 'Phone number is required' })}
                    className="input-field"
                    placeholder="+1 234 567 8900"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('saveAddress')}
                    className="rounded text-primary-500"
                  />
                  <span className="text-sm">Save this address for future orders</span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaCreditCard className="mr-2 text-primary-500" />
                Payment Method
              </h2>
              
              <div className="space-y-3 mb-4">
                <label className="flex items-center space-x-3 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700">
                  <input
                    type="radio"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary-500"
                  />
                  <FaCreditCard className="text-blue-500" />
                  <span>Credit / Debit Card</span>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700">
                  <input
                    type="radio"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary-500"
                  />
                  <FaPaypal className="text-blue-700" />
                  <span>PayPal</span>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700">
                  <input
                    type="radio"
                    value="googlepay"
                    checked={paymentMethod === 'googlepay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary-500"
                  />
                  <FaGooglePay className="text-blue-500" />
                  <span>Google Pay</span>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700">
                  <input
                    type="radio"
                    value="applepay"
                    checked={paymentMethod === 'applepay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary-500"
                  />
                  <FaApplePay className="text-black dark:text-white" />
                  <span>Apple Pay</span>
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <input
                      {...register('cardNumber', { required: paymentMethod === 'card' ? 'Card number is required' : false })}
                      className="input-field"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        {...register('expiry', { required: paymentMethod === 'card' ? 'Expiry date is required' : false })}
                        className="input-field"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVV</label>
                      <input
                        {...register('cvv', { required: paymentMethod === 'card' ? 'CVV is required' : false })}
                        className="input-field"
                        placeholder="123"
                        type="password"
                        maxLength="3"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary-500">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FaLock className="mr-2" />
                    Place Order
                  </>
                )}
              </button>
              
              <p className="text-xs text-center text-neutral-500 mt-4">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;