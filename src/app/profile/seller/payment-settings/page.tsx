'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  CreditCard,
  Banknote,
  Building2,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Shield,
  DollarSign,
  Calendar,
  Download,
  Eye,
  EyeOff,
  Save,
  Globe
} from 'lucide-react';

// Arabic countries with their IBAN formats and major banks
const arabicCountries = [
  {
    code: 'SA',
    name: 'المملكة العربية السعودية',
    nameEn: 'Saudi Arabia',
    ibanLength: 24,
    ibanFormat: 'SA## #### #### #### #### ####',
    banks: [
      'البنك الأهلي السعودي',
      'بنك الراجحي',
      'البنك السعودي للاستثمار',
      'بنك الجزيرة',
      'البنك السعودي الفرنسي',
      'البنك السعودي الهولندي',
      'بنك الرياض',
      'البنك السعودي البريطاني'
    ]
  },
  {
    code: 'AE',
    name: 'دولة الإمارات العربية المتحدة',
    nameEn: 'United Arab Emirates',
    ibanLength: 23,
    ibanFormat: 'AE## #### #### #### #### ###',
    banks: [
      'بنك الإمارات دبي الوطني',
      'بنك أبوظبي الأول',
      'بنك دبي الإسلامي',
      'بنك الإمارات الإسلامي',
      'مصرف أبوظبي الإسلامي',
      'بنك الإمارات للتنمية',
      'بنك الإمارات الوطني',
      'مصرف الإمارات المركزي'
    ]
  },
  {
    code: 'EG',
    name: 'جمهورية مصر العربية',
    nameEn: 'Egypt',
    ibanLength: 27,
    ibanFormat: 'EG## #### #### #### #### #### ###',
    banks: [
      'البنك الأهلي المصري',
      'بنك مصر',
      'البنك التجاري الدولي',
      'البنك العربي الأفريقي',
      'بنك الإسكندرية',
      'البنك الأهلي الكويتي',
      'بنك القاهرة',
      'البنك العربي'
    ]
  },
  {
    code: 'KW',
    name: 'دولة الكويت',
    nameEn: 'Kuwait',
    ibanLength: 30,
    ibanFormat: 'KW## #### #### #### #### #### #### ####',
    banks: [
      'البنك الأهلي الكويتي',
      'بنك الكويت الوطني',
      'بنك الكويت والشرق الأوسط',
      'البنك التجاري الكويتي',
      'بنك بوبيان',
      'البنك الأهلي المتحد',
      'بنك الكويت المركزي'
    ]
  },
  {
    code: 'QA',
    name: 'دولة قطر',
    nameEn: 'Qatar',
    ibanLength: 29,
    ibanFormat: 'QA## #### #### #### #### #### #### ###',
    banks: [
      'البنك الأهلي القطري',
      'بنك قطر الوطني',
      'البنك التجاري',
      'بنك قطر الإسلامي',
      'مصرف قطر المركزي',
      'البنك الأهلي المتحد',
      'بنك الدوحة'
    ]
  },
  {
    code: 'BH',
    name: 'مملكة البحرين',
    nameEn: 'Bahrain',
    ibanLength: 22,
    ibanFormat: 'BH## #### #### #### #### ##',
    banks: [
      'البنك الأهلي البحريني',
      'بنك البحرين والكويت',
      'البنك العربي الأفريقي',
      'بنك البحرين الإسلامي',
      'مصرف البحرين المركزي',
      'البنك التجاري البحريني'
    ]
  },
  {
    code: 'OM',
    name: 'سلطنة عُمان',
    nameEn: 'Oman',
    ibanLength: 23,
    ibanFormat: 'OM## #### #### #### #### ###',
    banks: [
      'البنك الوطني العُماني',
      'بنك مسقط',
      'البنك الأهلي العُماني',
      'بنك عُمان العربي',
      'البنك التجاري العُماني',
      'مصرف عُمان المركزي'
    ]
  },
  {
    code: 'JO',
    name: 'المملكة الأردنية الهاشمية',
    nameEn: 'Jordan',
    ibanLength: 30,
    ibanFormat: 'JO## #### #### #### #### #### #### ####',
    banks: [
      'البنك الأهلي الأردني',
      'بنك الأردن',
      'البنك العربي',
      'بنك القاهرة عمان',
      'البنك الإسلامي الأردني',
      'البنك الأهلي المتحد',
      'مصرف الأردن المركزي'
    ]
  },
  {
    code: 'LB',
    name: 'الجمهورية اللبنانية',
    nameEn: 'Lebanon',
    ibanLength: 28,
    ibanFormat: 'LB## #### #### #### #### #### #### ##',
    banks: [
      'البنك الأهلي اللبناني',
      'بنك لبنان والمهجر',
      'البنك العربي',
      'البنك التجاري اللبناني',
      'بنك بيروت',
      'مصرف لبنان المركزي'
    ]
  },
  {
    code: 'MA',
    name: 'المملكة المغربية',
    nameEn: 'Morocco',
    ibanLength: 28,
    ibanFormat: 'MA## #### #### #### #### #### #### ##',
    banks: [
      'البنك المغربي للتجارة الخارجية',
      'البنك الشعبي',
      'البنك التجاري المغربي',
      'البنك الأهلي المغربي',
      'مصرف المغرب المركزي'
    ]
  }
];

const PaymentSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('bank-accounts');
  const [showAddBank, setShowAddBank] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showCardNumber, setShowCardNumber] = useState(false);

  // Bank Accounts Data
  const [bankAccounts, setBankAccounts] = useState([
    {
      id: 1,
      bankName: 'البنك الأهلي السعودي',
      accountNumber: '1234567890',
      accountHolder: 'أحمد محمد السيد',
      iban: 'SA1234567890123456789012',
      country: 'SA',
      countryName: 'المملكة العربية السعودية',
      isDefault: true,
      isVerified: true
    },
    {
      id: 2,
      bankName: 'بنك الراجحي',
      accountNumber: '0987654321',
      accountHolder: 'أحمد محمد السيد',
      iban: 'SA0987654321098765432109',
      country: 'SA',
      countryName: 'المملكة العربية السعودية',
      isDefault: false,
      isVerified: true
    }
  ]);

  // Payment Cards Data
  const [paymentCards, setPaymentCards] = useState([
    {
      id: 1,
      cardNumber: '1234 5678 9012 3456',
      cardHolder: 'أحمد محمد السيد',
      expiryDate: '12/26',
      cardType: 'Visa',
      isDefault: true
    }
  ]);

  // Withdrawal Settings
  const [withdrawalSettings, setWithdrawalSettings] = useState({
    autoWithdrawal: false,
    minimumAmount: 100,
    withdrawalMethod: 'bank',
    withdrawalFrequency: 'weekly'
  });

  // New Bank Account Form
  const [newBankAccount, setNewBankAccount] = useState({
    country: '',
    bankName: '',
    accountNumber: '',
    accountHolder: '',
    iban: ''
  });

  // New Card Form
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  // Helper functions
  const getSelectedCountry = () => {
    return arabicCountries.find(country => country.code === newBankAccount.country);
  };

  const validateIBAN = (iban: string, countryCode: string) => {
    const country = arabicCountries.find(c => c.code === countryCode);
    if (!country) return false;
    
    // Remove spaces and convert to uppercase
    const cleanIban = iban.replace(/\s/g, '').toUpperCase();
    
    // Check length
    if (cleanIban.length !== country.ibanLength) return false;
    
    // Check country code
    if (!cleanIban.startsWith(countryCode)) return false;
    
    // Basic format validation (numbers and letters)
    const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/;
    return ibanRegex.test(cleanIban);
  };

  const formatIBAN = (iban: string) => {
    const cleanIban = iban.replace(/\s/g, '').toUpperCase();
    const country = arabicCountries.find(c => c.code === newBankAccount.country);
    if (!country) return cleanIban;
    
    // Format based on country's IBAN format
    const format = country.ibanFormat;
    let formatted = cleanIban;
    let index = 0;
    
    for (let i = 0; i < format.length && index < cleanIban.length; i++) {
      if (format[i] === '#') {
        formatted = formatted.substring(0, i) + cleanIban[index] + formatted.substring(i + 1);
        index++;
      }
    }
    
    return formatted;
  };

  const getAvailableBanks = () => {
    const selectedCountry = getSelectedCountry();
    return selectedCountry ? selectedCountry.banks : [];
  };

  const handleAddBankAccount = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Validate IBAN
      if (!validateIBAN(newBankAccount.iban, newBankAccount.country)) {
        setError('رقم IBAN غير صحيح للدولة المحددة');
        setIsLoading(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const selectedCountry = getSelectedCountry();
      const newAccount = {
        id: Date.now(),
        ...newBankAccount,
        countryName: selectedCountry?.name || '',
        isDefault: bankAccounts.length === 0,
        isVerified: false
      };
      
      setBankAccounts(prev => [...prev, newAccount]);
      setNewBankAccount({ country: '', bankName: '', accountNumber: '', accountHolder: '', iban: '' });
      setShowAddBank(false);
      setSuccess('تم إضافة الحساب البنكي بنجاح');
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('حدث خطأ أثناء إضافة الحساب البنكي');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCard = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newCardData = {
        id: Date.now(),
        ...newCard,
        cardType: newCard.cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
        isDefault: paymentCards.length === 0
      };
      
      setPaymentCards(prev => [...prev, newCardData]);
      setNewCard({ cardNumber: '', cardHolder: '', expiryDate: '', cvv: '' });
      setShowAddCard(false);
      setSuccess('تم إضافة البطاقة بنجاح');
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('حدث خطأ أثناء إضافة البطاقة');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetDefaultBank = (id: number) => {
    setBankAccounts(prev => 
      prev.map(account => ({
        ...account,
        isDefault: account.id === id
      }))
    );
  };

  const handleSetDefaultCard = (id: number) => {
    setPaymentCards(prev => 
      prev.map(card => ({
        ...card,
        isDefault: card.id === id
      }))
    );
  };

  const handleDeleteBank = (id: number) => {
    setBankAccounts(prev => prev.filter(account => account.id !== id));
  };

  const handleDeleteCard = (id: number) => {
    setPaymentCards(prev => prev.filter(card => card.id !== id));
  };

  const handleSaveWithdrawalSettings = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('تم حفظ إعدادات السحب بنجاح');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('حدث خطأ أثناء حفظ الإعدادات');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'bank-accounts', label: 'الحسابات البنكية', icon: Building2 },
    { id: 'payment-cards', label: 'بطاقات الدفع', icon: CreditCard },
    { id: 'withdrawal-settings', label: 'إعدادات السحب', icon: Banknote }
  ];

  return (
    <div className="min-h-screen bg-soft-gray py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/profile/seller"
            className="p-3 bg-white/80 backdrop-blur-sm border-2 border-slate-200/80 text-slate-700 rounded-xl hover:bg-white hover:border-slate-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">إعدادات الدفع والسحب</h1>
            <p className="text-gray-600 mt-1">إدارة طرق الدفع والحسابات البنكية</p>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-green-800 font-medium">{success}</span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span className="text-red-800 font-medium">{error}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 inline-flex items-center ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm border-2 border-slate-200/80 text-slate-700 hover:bg-white hover:border-slate-300'
              }`}
            >
              <tab.icon className="w-5 h-5 ml-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Bank Accounts Tab */}
          {activeTab === 'bank-accounts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">الحسابات البنكية</h3>
                <button
                  onClick={() => setShowAddBank(true)}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white font-bold rounded-xl hover:from-cyan-500 hover:via-cyan-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة حساب بنكي
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bankAccounts.map(account => (
                  <div key={account.id} className="card">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-8 h-8 text-blue-600" />
                        <div>
                          <h4 className="font-bold text-gray-900">{account.bankName}</h4>
                          <p className="text-sm text-gray-600">{account.accountHolder}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Globe className="w-4 h-4 text-gray-500" />
                            <span className="text-xs text-gray-500">{account.countryName}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {account.isDefault && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                            افتراضي
                          </span>
                        )}
                        {account.isVerified ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-amber-600" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">رقم الحساب:</span>
                        <p className="font-medium text-gray-900">{account.accountNumber}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">IBAN:</span>
                        <p className="font-medium text-gray-900 font-mono">{account.iban}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      {!account.isDefault && (
                        <button
                          onClick={() => handleSetDefaultBank(account.id)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          تعيين كافتراضي
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteBank(account.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Cards Tab */}
          {activeTab === 'payment-cards' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">بطاقات الدفع</h3>
                <button
                  onClick={() => setShowAddCard(true)}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white font-bold rounded-xl hover:from-cyan-500 hover:via-cyan-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة بطاقة
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paymentCards.map(card => (
                  <div key={card.id} className="card">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-8 h-8 text-purple-600" />
                        <div>
                          <h4 className="font-bold text-gray-900">{card.cardType}</h4>
                          <p className="text-sm text-gray-600">{card.cardHolder}</p>
                        </div>
                      </div>
                      {card.isDefault && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                          افتراضي
                        </span>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">رقم البطاقة:</span>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900 font-mono">
                            {showCardNumber ? card.cardNumber : '**** **** **** ' + card.cardNumber.slice(-4)}
                          </p>
                          <button
                            onClick={() => setShowCardNumber(!showCardNumber)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            {showCardNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">تاريخ الانتهاء:</span>
                        <p className="font-medium text-gray-900">{card.expiryDate}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      {!card.isDefault && (
                        <button
                          onClick={() => handleSetDefaultCard(card.id)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          تعيين كافتراضي
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Withdrawal Settings Tab */}
          {activeTab === 'withdrawal-settings' && (
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-6">إعدادات السحب التلقائي</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">السحب التلقائي</h4>
                      <p className="text-sm text-gray-600">سحب الأرباح تلقائياً عند الوصول للمبلغ المحدد</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={withdrawalSettings.autoWithdrawal}
                        onChange={(e) => setWithdrawalSettings(prev => ({ ...prev, autoWithdrawal: e.target.checked }))}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7EE7FC]"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأدنى للسحب</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={withdrawalSettings.minimumAmount}
                          onChange={(e) => setWithdrawalSettings(prev => ({ ...prev, minimumAmount: parseInt(e.target.value) }))}
                          className="input-field pr-8"
                          placeholder="100"
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">طريقة السحب</label>
                      <select
                        value={withdrawalSettings.withdrawalMethod}
                        onChange={(e) => setWithdrawalSettings(prev => ({ ...prev, withdrawalMethod: e.target.value }))}
                        className="input-field"
                      >
                        <option value="bank">حساب بنكي</option>
                        <option value="card">بطاقة ائتمان</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">تكرار السحب</label>
                    <select
                      value={withdrawalSettings.withdrawalFrequency}
                      onChange={(e) => setWithdrawalSettings(prev => ({ ...prev, withdrawalFrequency: e.target.value }))}
                      className="input-field"
                    >
                      <option value="daily">يومي</option>
                      <option value="weekly">أسبوعي</option>
                      <option value="monthly">شهري</option>
                    </select>
                  </div>

                  <button
                    onClick={handleSaveWithdrawalSettings}
                    disabled={isLoading}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white font-bold rounded-2xl hover:from-cyan-500 hover:via-cyan-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
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
                        حفظ الإعدادات
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add Bank Account Modal */}
        {showAddBank && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-900 mb-6">إضافة حساب بنكي</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الدولة</label>
                  <select
                    value={newBankAccount.country}
                    onChange={(e) => setNewBankAccount(prev => ({ ...prev, country: e.target.value, bankName: '', iban: '' }))}
                    className="input-field"
                  >
                    <option value="">اختر الدولة</option>
                    {arabicCountries.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم البنك</label>
                  {newBankAccount.country ? (
                    <select
                      value={newBankAccount.bankName}
                      onChange={(e) => setNewBankAccount(prev => ({ ...prev, bankName: e.target.value }))}
                      className="input-field"
                    >
                      <option value="">اختر البنك</option>
                      {getAvailableBanks().map(bank => (
                        <option key={bank} value={bank}>
                          {bank}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={newBankAccount.bankName}
                      onChange={(e) => setNewBankAccount(prev => ({ ...prev, bankName: e.target.value }))}
                      className="input-field"
                      placeholder="اختر الدولة أولاً"
                      disabled
                    />
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رقم الحساب</label>
                  <input
                    type="text"
                    value={newBankAccount.accountNumber}
                    onChange={(e) => setNewBankAccount(prev => ({ ...prev, accountNumber: e.target.value }))}
                    className="input-field"
                    placeholder="رقم الحساب"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم صاحب الحساب</label>
                  <input
                    type="text"
                    value={newBankAccount.accountHolder}
                    onChange={(e) => setNewBankAccount(prev => ({ ...prev, accountHolder: e.target.value }))}
                    className="input-field"
                    placeholder="اسم صاحب الحساب"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IBAN
                    {newBankAccount.country && (
                      <span className="text-xs text-gray-500 mr-2">
                        ({getSelectedCountry()?.ibanFormat})
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={newBankAccount.iban}
                    onChange={(e) => {
                      const formatted = formatIBAN(e.target.value);
                      setNewBankAccount(prev => ({ ...prev, iban: formatted }));
                    }}
                    className="input-field"
                    placeholder={newBankAccount.country ? getSelectedCountry()?.ibanFormat : "اختر الدولة أولاً"}
                    disabled={!newBankAccount.country}
                  />
                  {newBankAccount.country && newBankAccount.iban && (
                    <div className="mt-1">
                      {validateIBAN(newBankAccount.iban, newBankAccount.country) ? (
                        <span className="text-xs text-green-600 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          صيغة IBAN صحيحة
                        </span>
                      ) : (
                        <span className="text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          صيغة IBAN غير صحيحة
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setShowAddBank(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleAddBankAccount}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white font-bold rounded-xl hover:from-cyan-500 hover:via-cyan-600 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'جاري الإضافة...' : 'إضافة'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Card Modal */}
        {showAddCard && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-900 mb-6">إضافة بطاقة دفع</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رقم البطاقة</label>
                  <input
                    type="text"
                    value={newCard.cardNumber}
                    onChange={(e) => setNewCard(prev => ({ ...prev, cardNumber: e.target.value }))}
                    className="input-field"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم صاحب البطاقة</label>
                  <input
                    type="text"
                    value={newCard.cardHolder}
                    onChange={(e) => setNewCard(prev => ({ ...prev, cardHolder: e.target.value }))}
                    className="input-field"
                    placeholder="اسم صاحب البطاقة"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الانتهاء</label>
                    <input
                      type="text"
                      value={newCard.expiryDate}
                      onChange={(e) => setNewCard(prev => ({ ...prev, expiryDate: e.target.value }))}
                      className="input-field"
                      placeholder="MM/YY"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <input
                      type="text"
                      value={newCard.cvv}
                      onChange={(e) => setNewCard(prev => ({ ...prev, cvv: e.target.value }))}
                      className="input-field"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setShowAddCard(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleAddCard}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white font-bold rounded-xl hover:from-cyan-500 hover:via-cyan-600 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'جاري الإضافة...' : 'إضافة'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSettingsPage;
