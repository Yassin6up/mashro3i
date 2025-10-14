'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  Search, 
  Paperclip, 
  Smile, 
  ArrowLeft,
  Check,
  CheckCheck,
  Clock,
  User,
  MessageCircle,
  Star,
  Shield,
  AlertCircle
} from 'lucide-react';
import { featuredProjects } from '@/data/projects';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'seller';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file';
}

interface ChatUser {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: Date;
  rating: number;
  totalSales: number;
  isVerified: boolean;
}

// Component that uses useSearchParams - needs to be wrapped in Suspense
const ChatContent = () => {
  const searchParams = useSearchParams();
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [projectContext, setProjectContext] = useState<{
    projectId: string | null;
    projectTitle: string | null;
    sellerName: string | null;
  }>({
    projectId: null,
    projectTitle: null,
    sellerName: null
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Mock chat users (sellers from projects)
  const chatUsers: ChatUser[] = featuredProjects.slice(0, 5).map(project => ({
    id: project.id,
    name: project.seller.name,
    avatar: project.seller.avatar,
    status: Math.random() > 0.3 ? 'online' : 'offline',
    lastSeen: new Date(Date.now() - Math.random() * 86400000),
    rating: project.seller.rating,
    totalSales: project.seller.totalSales,
    isVerified: project.verified
  }));

  // Mock messages for the first chat
  const mockMessages: Message[] = [
    {
      id: 1,
      text: 'مرحباً! شكراً لاهتمامك بمشروعي. هل لديك أي استفسارات حول المشروع؟',
      sender: 'seller',
      timestamp: new Date(Date.now() - 3600000),
      status: 'read',
      type: 'text'
    },
    {
      id: 2,
      text: 'نعم، أريد أن أعرف المزيد عن التقنيات المستخدمة في المشروع',
      sender: 'user',
      timestamp: new Date(Date.now() - 3000000),
      status: 'read',
      type: 'text'
    },
    {
      id: 3,
      text: 'المشروع مطور باستخدام Next.js و TypeScript مع قاعدة بيانات MongoDB. هل تريد رؤية الكود المصدري؟',
      sender: 'seller',
      timestamp: new Date(Date.now() - 2400000),
      status: 'read',
      type: 'text'
    },
    {
      id: 4,
      text: 'نعم، أريد رؤية الكود. هل يمكنك إرسال رابط GitHub؟',
      sender: 'user',
      timestamp: new Date(Date.now() - 1800000),
      status: 'read',
      type: 'text'
    },
    {
      id: 5,
      text: 'بالطبع! سأرسل لك الرابط الآن',
      sender: 'seller',
      timestamp: new Date(Date.now() - 1200000),
      status: 'read',
      type: 'text'
    },
    {
      id: 6,
      text: 'شكراً لك! هل يمكنني الحصول على خصم إذا اشتريت المشروع اليوم؟',
      sender: 'user',
      timestamp: new Date(Date.now() - 600000),
      status: 'delivered',
      type: 'text'
    }
  ];

  useEffect(() => {
    setIsClient(true);
    
    // Handle URL parameters for direct seller chat
    const sellerId = searchParams.get('sellerId');
    const sellerName = searchParams.get('sellerName');
    const projectId = searchParams.get('projectId');
    const projectTitle = searchParams.get('projectTitle');
    
    if (sellerId && sellerName) {
      setProjectContext({
        projectId,
        projectTitle,
        sellerName
      });
      
      // Find and select the seller
      const seller = chatUsers.find(user => user.name === sellerName);
      if (seller) {
        setSelectedChat(seller.id);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedChat) {
      // Create contextual messages if coming from a project
      if (projectContext.projectTitle && projectContext.sellerName) {
        const contextualMessages: Message[] = [
          {
            id: 1,
            text: `مرحباً! شكراً لاهتمامك بمشروع "${projectContext.projectTitle}". هل لديك أي استفسارات حول المشروع؟`,
            sender: 'seller',
            timestamp: new Date(Date.now() - 3600000),
            status: 'read',
            type: 'text'
          }
        ];
        setMessages(contextualMessages);
      } else {
        setMessages(mockMessages);
      }
      setIsAtBottom(true);
      setShowScrollButton(false);
    }
  }, [selectedChat, projectContext]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (isClient && messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setIsAtBottom(isNearBottom);
      setShowScrollButton(!isNearBottom && messages.length > 0);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: message,
        sender: 'user',
        timestamp: new Date(),
        status: 'sent',
        type: 'text'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'اليوم';
    } else if (diffDays === 1) {
      return 'أمس';
    } else {
      return date.toLocaleDateString('ar-SA');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Clock className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const filteredUsers = chatUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedUser = selectedChat ? chatUsers.find(user => user.id === selectedChat) : null;

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-3xl transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-[#7EE7FC]" />
              <h1 className="text-2xl font-bold text-gray-900">المحادثات</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-4 py-6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Chat List */}
          <div className={`${selectedChat ? 'hidden lg:block' : 'block'} lg:col-span-1`}>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-full">
              {/* Mobile Header */}
              <div className="lg:hidden p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">المحادثات</h2>
              </div>
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                
                  <input
                    type="text"
                    placeholder="البحث في المحادثات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Chat List */}
              <div className="overflow-y-auto h-[calc(100%-80px)] lg:h-[calc(100%-80px)]">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedChat(user.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedChat === user.id ? 'bg-blue-50 border-r-4 border-r-[#7EE7FC]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={50}
                          height={50}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          user.status === 'online' ? 'bg-green-500' : 
                          user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                          {user.isVerified && (
                            <Shield className="w-4 h-4 text-[#7EE7FC]" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{user.rating}</span>
                          <span>•</span>
                          <span>{user.totalSales} مبيعات</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {user.status === 'online' ? 'متصل الآن' : 
                           user.status === 'away' ? 'بعيد' : 'غير متصل'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className={`${selectedChat ? 'block' : 'hidden lg:block'} lg:col-span-3`}>
            {selectedChat ? (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-full flex flex-col relative">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Mobile back button */}
                      <button 
                        onClick={() => setSelectedChat(null)}
                        className="lg:hidden p-2 hover:bg-gray-200 rounded-3xl transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <div className="relative">
                        <Image
                          src={selectedUser?.avatar || ''}
                          alt={selectedUser?.name || ''}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          selectedUser?.status === 'online' ? 'bg-green-500' : 
                          selectedUser?.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedUser?.name}</h3>
                        {projectContext.projectTitle && (
                          <p className="text-sm text-blue-600 font-medium">
                            حول مشروع: {projectContext.projectTitle}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{selectedUser?.rating}</span>
                          <span>•</span>
                          <span>{selectedUser?.totalSales} مبيعات</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-200 rounded-3xl transition-colors">
                        <Phone className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-200 rounded-3xl transition-colors">
                        <Video className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-200 rounded-3xl transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div 
                  ref={messagesContainerRef}
                  onScroll={handleScroll}
                  className="overflow-y-auto p-4 space-y-4 relative"
                  style={{ 
                    height: 'calc(100vh - 200px)',
                    maxHeight: 'calc(100vh - 200px)'
                  }}
                >
                  {isClient && showScrollButton && (
                    <button
                      onClick={scrollToBottom}
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#7EE7FC] hover:bg-[#3bdeff] text-white p-2 rounded-full shadow-lg transition-all duration-200 z-10"
                    >
                      <ArrowLeft className="w-4 h-4 rotate-90" />
                    </button>
                  )}
                  {messages.map((msg, index) => {
                    const isUser = msg.sender === 'user';
                    const showDate = index === 0 || 
                      formatDate(msg.timestamp) !== formatDate(messages[index - 1].timestamp);
                    
                    return (
                      <div key={msg.id}>
                        {showDate && (
                          <div className="text-center text-sm text-gray-500 mb-4">
                            {formatDate(msg.timestamp)}
                          </div>
                        )}
                        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                            isUser 
                              ? 'bg-[#7EE7FC] text-black rounded-br-md' 
                              : 'bg-gray-100 text-gray-900 rounded-bl-md'
                          }`}>
                            <p className="text-sm">{msg.text}</p>
                            <div className={`flex items-center justify-end gap-1 mt-2 text-xs ${
                              isUser ? 'text-black' : 'text-gray-500'
                            }`}>
                              <span>{formatTime(msg.timestamp)}</span>
                              {isUser && getStatusIcon(msg.status)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-gray-200 rounded-3xl transition-colors">
                      <Paperclip className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="اكتب رسالتك هنا..."
                        className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors">
                        <Smile className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="p-3 bg-[#7EE7FC] hover:bg-[#3bdeff] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">اختر محادثة للبدء</h3>
                  <p className="text-gray-500">اختر أحد البائعين من القائمة لبدء المحادثة</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading component for Suspense fallback
const ChatLoading = () => (
  <div className="h-screen bg-gray-50 flex flex-col">
    <div className="bg-white border-b border-gray-200 flex-shrink-0">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-gray-100 rounded-3xl">
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-gray-300" />
            <h1 className="text-2xl font-bold text-gray-300">المحادثات</h1>
          </div>
        </div>
      </div>
    </div>
    <div className="flex-1 max-w-7xl mx-auto px-4 py-6 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-full">
            <div className="p-4 border-b border-gray-200">
              <div className="h-12 bg-gray-200 rounded-3xl animate-pulse"></div>
            </div>
            <div className="p-4 space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-3 p-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-full flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">جاري التحميل...</h3>
              <p className="text-gray-400">يرجى الانتظار</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main page component with Suspense boundary
const ChatPage = () => {
  return (
    <Suspense fallback={<ChatLoading />}>
      <ChatContent />
    </Suspense>
  );
};

export default ChatPage;