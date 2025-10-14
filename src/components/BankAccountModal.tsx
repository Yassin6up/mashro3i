'use client';

import { useState } from 'react';
import { X, CreditCard, Building2, Shield, CheckCircle, AlertCircle } from 'lucide-react';

interface BankAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const BankAccountModal = ({ isOpen, onClose, onSuccess }: BankAccountModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    accountHolderName: '',
    iban: '',
    swiftCode: '',
    routingNumber: '',
    country: '',
    city: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.bankName.trim()) {
      newErrors.bankName = 'اسم البنك مطلوب';
    }
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'رقم الحساب مطلوب';
    }
    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = 'اسم صاحب الحساب مطلوب';
    }
    if (!formData.iban.trim()) {
      newErrors.iban = 'رقم الآيبان مطلوب';
    }
    if (!formData.country.trim()) {
      newErrors.country = 'البلد مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error connecting bank account:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">ربط الحساب البنكي</h2>
              <p className="text-sm text-gray-600">أضف بيانات حسابك البنكي لسحب الأرباح</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-cyan-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 1 ? 'bg-cyan-100 text-cyan-600' : 'bg-gray-200 text-gray-400'
              }`}>
                1
              </div>
              <span className="text-sm font-medium">بيانات البنك</span>
            </div>
            <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-cyan-400' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-cyan-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 2 ? 'bg-cyan-100 text-cyan-600' : 'bg-gray-200 text-gray-400'
              }`}>
                2
              </div>
              <span className="text-sm font-medium">التأكيد</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم البنك *
                  </label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) => handleInputChange('bankName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200 ${
                      errors.bankName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="مثال: البنك الأهلي السعودي"
                  />
                  {errors.bankName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.bankName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الحساب *
                  </label>
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200 ${
                      errors.accountNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="رقم الحساب البنكي"
                  />
                  {errors.accountNumber && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.accountNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم صاحب الحساب *
                  </label>
                  <input
                    type="text"
                    value={formData.accountHolderName}
                    onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200 ${
                      errors.accountHolderName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="الاسم كما هو في البنك"
                  />
                  {errors.accountHolderName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.accountHolderName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الآيبان *
                  </label>
                  <input
                    type="text"
                    value={formData.iban}
                    onChange={(e) => handleInputChange('iban', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200 ${
                      errors.iban ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="SA1234567890123456789012"
                  />
                  {errors.iban && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.iban}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رمز السويفت (اختياري)
                  </label>
                  <input
                    type="text"
                    value={formData.swiftCode}
                    onChange={(e) => handleInputChange('swiftCode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200"
                    placeholder="NATXSAJE"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    البلد *
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200 ${
                      errors.country ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">اختر البلد</option>
                    <option value="SA">السعودية</option>
                    <option value="AE">الإمارات</option>
                    <option value="KW">الكويت</option>
                    <option value="QA">قطر</option>
                    <option value="BH">البحرين</option>
                    <option value="OM">عمان</option>
                    <option value="EG">مصر</option>
                    <option value="JO">الأردن</option>
                    <option value="LB">لبنان</option>
                    <option value="MA">المغرب</option>
                    <option value="TN">تونس</option>
                    <option value="DZ">الجزائر</option>
                  </select>
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.country}
                    </p>
                  )}
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">أمان البيانات</h4>
                    <p className="text-sm text-blue-700">
                      جميع بياناتك البنكية محمية بتشفير عالي المستوى ولن يتم مشاركتها مع أي طرف ثالث. 
                      نستخدم أحدث تقنيات الأمان لحماية معلوماتك المالية.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">تأكيد بيانات الحساب</h3>
                <p className="text-gray-600">يرجى مراجعة البيانات التالية قبل المتابعة</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">اسم البنك:</span>
                    <p className="font-medium text-gray-900">{formData.bankName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">رقم الحساب:</span>
                    <p className="font-medium text-gray-900">{formData.accountNumber}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">اسم صاحب الحساب:</span>
                    <p className="font-medium text-gray-900">{formData.accountHolderName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">رقم الآيبان:</span>
                    <p className="font-medium text-gray-900">{formData.iban}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">البلد:</span>
                    <p className="font-medium text-gray-900">{formData.country}</p>
                  </div>
                  {formData.swiftCode && (
                    <div>
                      <span className="text-sm text-gray-600">رمز السويفت:</span>
                      <p className="font-medium text-gray-900">{formData.swiftCode}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-900 mb-1">تنبيه مهم</h4>
                    <p className="text-sm text-amber-700">
                      سيتم التحقق من صحة البيانات البنكية خلال 1-3 أيام عمل. 
                      ستتلقى إشعاراً عند تأكيد الحساب ويمكنك بعدها سحب الأرباح.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={step === 1 ? onClose : () => setStep(1)}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors duration-200"
          >
            {step === 1 ? 'إلغاء' : 'رجوع'}
          </button>
          
          <button
            onClick={step === 1 ? handleNext : handleSubmit}
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                جاري المعالجة...
              </div>
            ) : step === 1 ? (
              'التالي'
            ) : (
              'تأكيد وإرسال'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankAccountModal;
