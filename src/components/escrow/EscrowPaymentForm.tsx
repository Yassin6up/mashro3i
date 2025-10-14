'use client';

import { useState } from 'react';
import { ArrowLeft, Shield, Eye, EyeOff, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { EscrowTransaction, PaymentMethod, EscrowPaymentData } from '@/types';
import { formatCurrency } from '@/utils/helpers';

interface EscrowPaymentFormProps {
  transaction: EscrowTransaction;
  paymentMethod: PaymentMethod;
  onSuccess: (paymentData: EscrowPaymentData) => void;
  onBack: () => void;
}

const EscrowPaymentForm = ({ 
  transaction, 
  paymentMethod, 
  onSuccess, 
  onBack 
}: EscrowPaymentFormProps) => {
  const [formData, setFormData] = useState({
    // Buyer info
    buyerName: transaction.buyerName || '',
    buyerEmail: transaction.buyerEmail || '',
    buyerPhone: '',
    
    // Credit card data
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    
    // PayPal data
    paypalEmail: '',
    
    // Bank transfer data
    accountNumber: '',
    routingNumber: '',
    accountType: 'checking' as const,
    accountHolder: '',
    
    // Crypto data
    walletAddress: '',
    cryptoCurrency: 'USDT' as const
  });

  const [showCVV, setShowCVV] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Buyer info validation
    if (!formData.buyerName.trim()) {
      newErrors.buyerName = 'Full name is required';
    }
    if (!formData.buyerEmail.trim() || !/\S+@\S+\.\S+/.test(formData.buyerEmail)) {
      newErrors.buyerEmail = 'Valid email is required';
    }

    // Payment method specific validation
    switch (paymentMethod.type) {
      case 'credit_card':
        if (!formData.cardNumber.replace(/\s/g, '') || formData.cardNumber.replace(/\s/g, '').length < 13) {
          newErrors.cardNumber = 'Valid card number is required';
        }
        if (!formData.expiryMonth || !formData.expiryYear) {
          newErrors.expiry = 'Expiry date is required';
        }
        if (!formData.cvv || formData.cvv.length < 3) {
          newErrors.cvv = 'Valid CVV is required';
        }
        if (!formData.cardholderName.trim()) {
          newErrors.cardholderName = 'Cardholder name is required';
        }
        break;
        
      case 'paypal':
        if (!formData.paypalEmail.trim() || !/\S+@\S+\.\S+/.test(formData.paypalEmail)) {
          newErrors.paypalEmail = 'Valid PayPal email is required';
        }
        break;
        
      case 'bank_transfer':
        if (!formData.accountHolder.trim()) {
          newErrors.accountHolder = 'Account holder name is required';
        }
        if (!formData.accountNumber.trim()) {
          newErrors.accountNumber = 'Account number is required';
        }
        if (!formData.routingNumber.trim()) {
          newErrors.routingNumber = 'Routing number is required';
        }
        break;
        
      case 'crypto':
        if (!formData.walletAddress.trim()) {
          newErrors.walletAddress = 'Wallet address is required';
        }
        break;
    }

    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const paymentData: EscrowPaymentData = {
        amount: transaction.totalAmount,
        paymentMethod,
        buyerInfo: {
          name: formData.buyerName,
          email: formData.buyerEmail,
          phone: formData.buyerPhone
        }
      };

      // Add payment method specific data
      switch (paymentMethod.type) {
        case 'credit_card':
          paymentData.cardData = {
            cardNumber: formData.cardNumber,
            expiryMonth: formData.expiryMonth,
            expiryYear: formData.expiryYear,
            cvv: formData.cvv,
            cardholderName: formData.cardholderName
          };
          break;
          
        case 'paypal':
          paymentData.paypalData = {
            email: formData.paypalEmail
          };
          break;
          
        case 'bank_transfer':
          paymentData.bankData = {
            accountNumber: formData.accountNumber,
            routingNumber: formData.routingNumber,
            accountHolder: formData.accountHolder,
            accountType: formData.accountType
          };
          break;
          
        case 'crypto':
          paymentData.cryptoData = {
            walletAddress: formData.walletAddress,
            currency: formData.cryptoCurrency
          };
          break;
      }

      onSuccess(paymentData);
      
    } catch (error) {
      console.error('Payment processing error:', error);
      setErrors({ general: 'Payment processing failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const calculateProcessingFee = () => {
    return (transaction.totalAmount * paymentMethod.processingFee) / 100;
  };

  const calculateTotal = () => {
    return transaction.totalAmount + calculateProcessingFee();
  };

  return (
    <div className="bg-white rounded-3xl shadow-md p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </button>
        <h2 className="text-2xl font-bold">Payment Details</h2>
      </div>

      {/* Selected Payment Method Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-3xl p-4 mb-6">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{paymentMethod.type === 'credit_card' ? '💳' : paymentMethod.type === 'paypal' ? '🅿️' : paymentMethod.type === 'bank_transfer' ? '🏦' : '₿'}</span>
          <div>
            <h3 className="font-semibold text-blue-800">{paymentMethod.name}</h3>
            <p className="text-blue-600 text-sm">Processing time: {paymentMethod.processingTime}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Buyer Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Buyer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.buyerName}
                onChange={(e) => handleInputChange('buyerName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.buyerName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.buyerName && (
                <p className="text-red-500 text-sm mt-1">{errors.buyerName}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.buyerEmail}
                onChange={(e) => handleInputChange('buyerEmail', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.buyerEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your@email.com"
              />
              {errors.buyerEmail && (
                <p className="text-red-500 text-sm mt-1">{errors.buyerEmail}</p>
              )}
            </div>
          </div>
        </div>

        {/* Payment Method Specific Forms */}
        {paymentMethod.type === 'credit_card' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Credit Card Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number *
                </label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Month *
                  </label>
                  <select
                    value={formData.expiryMonth}
                    onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.expiry ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year *
                  </label>
                  <select
                    value={formData.expiryYear}
                    onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.expiry ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">YYYY</option>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={String(new Date().getFullYear() + i)}>
                        {new Date().getFullYear() + i}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV *
                  </label>
                  <div className="relative">
                    <input
                      type={showCVV ? 'text' : 'password'}
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 ${
                        errors.cvv ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="123"
                      maxLength={4}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCVV(!showCVV)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showCVV ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
              
              {errors.expiry && (
                <p className="text-red-500 text-sm">{errors.expiry}</p>
              )}
              {errors.cvv && (
                <p className="text-red-500 text-sm">{errors.cvv}</p>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  value={formData.cardholderName}
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.cardholderName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Name as shown on card"
                />
                {errors.cardholderName && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {paymentMethod.type === 'paypal' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">PayPal Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PayPal Email Address *
              </label>
              <input
                type="email"
                value={formData.paypalEmail}
                onChange={(e) => handleInputChange('paypalEmail', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.paypalEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="paypal@email.com"
              />
              {errors.paypalEmail && (
                <p className="text-red-500 text-sm mt-1">{errors.paypalEmail}</p>
              )}
              <p className="text-sm text-gray-600 mt-2">
                You'll be redirected to PayPal to complete your payment securely.
              </p>
            </div>
          </div>
        )}

        {paymentMethod.type === 'bank_transfer' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Bank Transfer Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Holder Name *
                </label>
                <input
                  type="text"
                  value={formData.accountHolder}
                  onChange={(e) => handleInputChange('accountHolder', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.accountHolder ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter account holder name"
                />
                {errors.accountHolder && (
                  <p className="text-red-500 text-sm mt-1">{errors.accountHolder}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number *
                </label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.accountNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter account number"
                />
                {errors.accountNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Routing Number *
                </label>
                <input
                  type="text"
                  value={formData.routingNumber}
                  onChange={(e) => handleInputChange('routingNumber', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.routingNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter routing number"
                />
                {errors.routingNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.routingNumber}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type
                </label>
                <select
                  value={formData.accountType}
                  onChange={(e) => handleInputChange('accountType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="checking">Checking</option>
                  <option value="savings">Savings</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Payment Summary */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
          <div className="bg-gray-50 rounded-3xl p-4 space-y-2">
            <div className="flex justify-between">
              <span>Project Price:</span>
              <span>{formatCurrency(transaction.totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Processing Fee ({paymentMethod.processingFee}%):</span>
              <span>{formatCurrency(calculateProcessingFee())}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-blue-600">{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="mt-1 mr-3"
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>,{' '}
            <a href="#" className="text-blue-600 hover:underline">Escrow Agreement</a>, and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
          </label>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-sm">{errors.terms}</p>
        )}

        {/* General Error */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-3xl p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-700">{errors.general}</p>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-3xl p-4">
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
            <div className="text-sm text-green-700">
              <h4 className="font-medium mb-1">Secure Escrow Protection</h4>
              <p>Your payment will be held securely until you confirm delivery. Full refund guaranteed if project doesn't meet specifications.</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-[#7EE7FC] text-white py-3 px-6 rounded-3xl font-semibold hover:bg-[#3bdeff] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing Payment...
            </div>
          ) : (
            `Secure Payment - ${formatCurrency(calculateTotal())}`
          )}
        </button>
      </form>
    </div>
  );
};

export default EscrowPaymentForm;