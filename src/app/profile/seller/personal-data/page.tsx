'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  Save,
  Camera,
  Edit,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

const PersonalDataPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: 'أحمد',
    lastName: 'محمد السيد',
    email: 'ahmed.seller@example.com',
    phone: '+966 50 123 4567',
    country: 'السعودية',
    city: 'الرياض',
    address: 'شارع الملك فهد، حي النخيل',
    dateOfBirth: '1985-03-15',
    gender: 'ذكر',
    nationalId: '1234567890',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'مطور متخصص في تطوير تطبيقات الويب والجوال بخبرة تزيد عن 8 سنوات. أعمل مع أحدث التقنيات لتقديم حلول مبتكرة وموثوقة للعملاء.',
    website: 'https://ahmed-dev.com',
    linkedin: 'https://linkedin.com/in/ahmed-dev',
    twitter: 'https://twitter.com/ahmed_dev'
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
    setSaveSuccess(true);
    setIsEditing(false);
    
    // Hide success message after 3 seconds
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSaveSuccess(false);
  };

  return (
    <div className="min-h-screen bg-soft-gray py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/profile/seller"
            className="p-3 bg-white/80 backdrop-blur-sm border-2 border-slate-200/80 text-slate-700 rounded-xl hover:bg-white hover:border-slate-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">تعديل البيانات الشخصية</h1>
            <p className="text-gray-600 mt-1">إدارة معلوماتك الشخصية وإعدادات الحساب</p>
          </div>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-green-800 font-medium">تم حفظ البيانات بنجاح!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture Section */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-6">الصورة الشخصية</h3>
              
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <Image
                    src={profileData.avatar}
                    alt="Profile Picture"
                    width={150}
                    height={150}
                    className="w-40 h-40 rounded-2xl shadow-lg ring-4 ring-white object-cover"
                  />
                  <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                    <Camera className="w-6 h-6" />
                  </button>
                </div>
                
                <button className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 inline-flex items-center text-sm">
                  <Camera className="w-4 h-4 ml-2" />
                  تغيير الصورة
                </button>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">المعلومات الشخصية</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white font-bold rounded-xl hover:from-cyan-500 hover:via-cyan-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center"
                  >
                    <Edit className="w-4 h-4 ml-2" />
                    تعديل
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 inline-flex items-center"
                    >
                      إلغاء
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white font-bold rounded-xl hover:from-cyan-500 hover:via-cyan-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? (
                        <div className="loading-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      ) : (
                        <>
                          <Save className="w-4 h-4 ml-2" />
                          حفظ
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الأول</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="input-field"
                        placeholder="الاسم الأول"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-xl text-gray-900">{profileData.firstName}</div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الأخير</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="input-field"
                        placeholder="الاسم الأخير"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-xl text-gray-900">{profileData.lastName}</div>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="input-field"
                        placeholder="البريد الإلكتروني"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        {profileData.email}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">رقم الجوال</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="input-field"
                        placeholder="رقم الجوال"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        {profileData.phone}
                      </div>
                    )}
                  </div>
                </div>

                {/* Location Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">البلد</label>
                    {isEditing ? (
                      <select
                        value={profileData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="input-field"
                      >
                        <option value="السعودية">السعودية</option>
                        <option value="الإمارات">الإمارات</option>
                        <option value="الكويت">الكويت</option>
                        <option value="قطر">قطر</option>
                        <option value="البحرين">البحرين</option>
                        <option value="عمان">عمان</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        {profileData.country}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">المدينة</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="input-field"
                        placeholder="المدينة"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        {profileData.city}
                      </div>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                  {isEditing ? (
                    <textarea
                      value={profileData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="input-field"
                      rows={3}
                      placeholder="العنوان التفصيلي"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      {profileData.address}
                    </div>
                  )}
                </div>

                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الميلاد</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {new Date(profileData.dateOfBirth).toLocaleDateString('ar-SA')}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الجنس</label>
                    {isEditing ? (
                      <select
                        value={profileData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="input-field"
                      >
                        <option value="ذكر">ذكر</option>
                        <option value="أنثى">أنثى</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-xl text-gray-900">{profileData.gender}</div>
                    )}
                  </div>
                </div>

                {/* National ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهوية الوطنية</label>
                  {isEditing ? (
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={profileData.nationalId}
                        onChange={(e) => handleInputChange('nationalId', e.target.value)}
                        className="input-field pr-12"
                        placeholder="رقم الهوية الوطنية"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-xl text-gray-900">
                      {profileData.nationalId.replace(/\d/g, '*')}
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نبذة شخصية</label>
                  {isEditing ? (
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="input-field"
                      rows={4}
                      placeholder="اكتب نبذة عنك وخبراتك"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-xl text-gray-900">{profileData.bio}</div>
                  )}
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900">روابط التواصل الاجتماعي</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الموقع الشخصي</label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={profileData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          className="input-field"
                          placeholder="https://your-website.com"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-xl text-gray-900">
                          <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:text-cyan-700">
                            {profileData.website}
                          </a>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={profileData.linkedin}
                          onChange={(e) => handleInputChange('linkedin', e.target.value)}
                          className="input-field"
                          placeholder="https://linkedin.com/in/username"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-xl text-gray-900">
                          <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:text-cyan-700">
                            {profileData.linkedin}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={profileData.twitter}
                        onChange={(e) => handleInputChange('twitter', e.target.value)}
                        className="input-field"
                        placeholder="https://twitter.com/username"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-xl text-gray-900">
                        <a href={profileData.twitter} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:text-cyan-700">
                          {profileData.twitter}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDataPage;
