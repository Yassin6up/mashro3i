'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Shield,
  Key,
  Save,
  AlertTriangle
} from 'lucide-react';

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  const checkPasswordStrength = (password: string) => {
    setPasswordStrength({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  const getPasswordStrengthScore = () => {
    const score = Object.values(passwordStrength).filter(Boolean).length;
    return score;
  };

  const getPasswordStrengthColor = () => {
    const score = getPasswordStrengthScore();
    if (score < 2) return 'bg-red-500';
    if (score < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    const score = getPasswordStrengthScore();
    if (score < 2) return 'ضعيف';
    if (score < 4) return 'متوسط';
    return 'قوي';
  };

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
    checkPasswordStrength(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (!currentPassword) {
      setError('يرجى إدخال كلمة المرور الحالية');
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('كلمة المرور الجديدة وتأكيدها غير متطابقتين');
      setIsLoading(false);
      return;
    }

    if (getPasswordStrengthScore() < 3) {
      setError('كلمة المرور الجديدة ضعيفة جداً. يرجى اختيار كلمة مرور أقوى');
      setIsLoading(false);
      return;
    }

    if (currentPassword === newPassword) {
      setError('كلمة المرور الجديدة يجب أن تكون مختلفة عن كلمة المرور الحالية');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordStrength({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('حدث خطأ أثناء تغيير كلمة المرور. يرجى المحاولة مرة أخرى');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-soft-gray py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/profile/seller"
            className="p-3 bg-white/80 backdrop-blur-sm border-2 border-slate-200/80 text-slate-700 rounded-xl hover:bg-white hover:border-slate-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">تغيير كلمة المرور</h1>
            <p className="text-gray-600 mt-1">تحديث كلمة المرور لحماية حسابك</p>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <span className="text-green-800 font-medium">تم تغيير كلمة المرور بنجاح!</span>
              <p className="text-green-700 text-sm mt-1">تم تحديث كلمة المرور الخاصة بك</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span className="text-red-800 font-medium">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Security Tips */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                نصائح الأمان
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                  <Key className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">كلمة مرور قوية</h4>
                    <p className="text-sm text-blue-700 mt-1">استخدم 8 أحرف على الأقل مع مزيج من الأرقام والرموز</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">تغيير دوري</h4>
                    <p className="text-sm text-green-700 mt-1">غيّر كلمة المرور كل 3-6 أشهر</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-900">لا تشاركها</h4>
                    <p className="text-sm text-amber-700 mt-1">لا تشارك كلمة المرور مع أي شخص</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Lock className="w-6 h-6 text-cyan-600" />
                تغيير كلمة المرور
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور الحالية</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="input-field pr-12"
                      placeholder="أدخل كلمة المرور الحالية"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور الجديدة</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => handleNewPasswordChange(e.target.value)}
                      className="input-field pr-12"
                      placeholder="أدخل كلمة المرور الجديدة"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {newPassword && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">قوة كلمة المرور</span>
                        <span className={`text-sm font-bold ${
                          getPasswordStrengthScore() < 2 ? 'text-red-600' : 
                          getPasswordStrengthScore() < 4 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                          style={{width: `${(getPasswordStrengthScore() / 5) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Password Requirements */}
                {newPassword && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-medium text-gray-900 mb-3">متطلبات كلمة المرور:</h4>
                    <div className="space-y-2">
                      <div className={`flex items-center gap-2 text-sm ${
                        passwordStrength.length ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        <CheckCircle className={`w-4 h-4 ${passwordStrength.length ? 'text-green-600' : 'text-gray-400'}`} />
                        8 أحرف على الأقل
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${
                        passwordStrength.uppercase ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        <CheckCircle className={`w-4 h-4 ${passwordStrength.uppercase ? 'text-green-600' : 'text-gray-400'}`} />
                        حرف كبير واحد على الأقل
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${
                        passwordStrength.lowercase ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        <CheckCircle className={`w-4 h-4 ${passwordStrength.lowercase ? 'text-green-600' : 'text-gray-400'}`} />
                        حرف صغير واحد على الأقل
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${
                        passwordStrength.number ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        <CheckCircle className={`w-4 h-4 ${passwordStrength.number ? 'text-green-600' : 'text-gray-400'}`} />
                        رقم واحد على الأقل
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${
                        passwordStrength.special ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        <CheckCircle className={`w-4 h-4 ${passwordStrength.special ? 'text-green-600' : 'text-gray-400'}`} />
                        رمز خاص واحد على الأقل
                      </div>
                    </div>
                  </div>
                )}

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">تأكيد كلمة المرور الجديدة</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input-field pr-12"
                      placeholder="أعد إدخال كلمة المرور الجديدة"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Match Indicator */}
                  {confirmPassword && (
                    <div className="mt-2">
                      {newPassword === confirmPassword ? (
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                          <CheckCircle className="w-4 h-4" />
                          كلمة المرور متطابقة
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          كلمة المرور غير متطابقة
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading || getPasswordStrengthScore() < 3 || newPassword !== confirmPassword}
                    className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white font-bold rounded-2xl hover:from-cyan-500 hover:via-cyan-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    ) : (
                      <>
                        <Save className="w-5 h-5 ml-2" />
                        تغيير كلمة المرور
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
