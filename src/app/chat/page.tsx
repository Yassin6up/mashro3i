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
  AlertCircle,
  Loader2,
  ImageIcon,
  Mic,
  X,
  Play,
  Pause,
  StopCircle
} from 'lucide-react';
import { messagesApi } from '@/utils/api';

interface Message {
  id: number;
  message: string;
  sender_id: number;
  receiver_id: number;
  created_at: string;
  is_read: boolean;
  message_type?: string;
  file_path?: string;
  file_size?: number;
  file_type?: string;
}

interface Conversation {
  user_id: number;
  user_name: string;
  user_picture: string | null;
  last_message: string;
  last_message_time: string;
  unread_count: number;
}

const ChatContent = () => {
  const searchParams = useSearchParams();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<number | null>(null);
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const API_URL = 'http://localhost:3001';

  useEffect(() => {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      try {
        setCurrentUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  useEffect(() => {
    const loadConversations = async () => {
      try {
        const data = await messagesApi.getConversations();
        setConversations(data);
      } catch (error) {
        console.error('Error loading conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, []);

  useEffect(() => {
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
      
      const sellerIdNum = parseInt(sellerId);
      setSelectedUserId(sellerIdNum);
      
      const existingConv = conversations.find(c => c.user_id === sellerIdNum);
      if (!existingConv && sellerName) {
        setConversations(prev => [{
          user_id: sellerIdNum,
          user_name: sellerName,
          user_picture: null,
          last_message: '',
          last_message_time: new Date().toISOString(),
          unread_count: 0
        }, ...prev]);
      }
    }
  }, [searchParams, conversations]);

  useEffect(() => {
    if (selectedUserId) {
      loadMessages();
    }
  }, [selectedUserId]);

  const loadMessages = async () => {
    if (!selectedUserId) return;
    
    try {
      const data = await messagesApi.getMessages(selectedUserId);
      setMessages(data);
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setIsAtBottom(isNearBottom);
      setShowScrollButton(!isNearBottom && messages.length > 0);
    }
  };

  const handleSendMessage = async () => {
    if ((!message.trim() && !selectedImage && !audioBlob) || !selectedUserId) return;
    
    setSendingMessage(true);
    try {
      let newMessage;
      
      if (selectedImage) {
        newMessage = await messagesApi.sendMessageWithFile(selectedUserId, selectedImage, message.trim());
        setSelectedImage(null);
      } else if (audioBlob) {
        const audioFile = new File([audioBlob], `voice-${Date.now()}.webm`, { type: 'audio/webm' });
        newMessage = await messagesApi.sendMessageWithFile(selectedUserId, audioFile, message.trim() || 'رسالة صوتية');
        setAudioBlob(null);
      } else {
        newMessage = await messagesApi.sendMessage(selectedUserId, message.trim());
      }
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      setTimeout(scrollToBottom, 100);
      
      setConversations(prev => prev.map(conv => 
        conv.user_id === selectedUserId 
          ? { ...conv, last_message: newMessage.message, last_message_time: new Date().toISOString() }
          : conv
      ));
    } catch (error: any) {
      alert(`❌ فشل إرسال الرسالة: ${error.message}`);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('فشل بدء التسجيل. يرجى التحقق من إذن الميكروفون.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setAudioBlob(null);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const playAudio = (audioUrl: string, messageId: number) => {
    if (playingAudioId === messageId) {
      audioRef.current?.pause();
      setPlayingAudioId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      setPlayingAudioId(messageId);
      audioRef.current.onended = () => setPlayingAudioId(null);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
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

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusIcon = (msg: Message) => {
    if (msg.sender_id !== currentUser?.id) return null;
    
    if (msg.is_read) {
      return <CheckCheck className="w-4 h-4 text-blue-500" />;
    }
    return <Check className="w-4 h-4 text-gray-400" />;
  };

  const renderMessageContent = (msg: Message) => {
    const isCurrentUser = msg.sender_id === currentUser?.id;

    if (msg.message_type === 'image' && msg.file_path) {
      return (
        <div>
          <img 
            src={`${API_URL}${msg.file_path}`} 
            alt="صورة" 
            className="max-w-xs rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => window.open(`${API_URL}${msg.file_path}`, '_blank')}
          />
          {msg.message && msg.message !== 'صورة' && (
            <p className="text-sm mt-2">{msg.message}</p>
          )}
        </div>
      );
    }

    if (msg.message_type === 'voice' && msg.file_path) {
      return (
        <div className="flex items-center gap-3">
          <button
            onClick={() => playAudio(`${API_URL}${msg.file_path}`, msg.id)}
            className="p-2 hover:bg-black/10 rounded-full transition-colors"
          >
            {playingAudioId === msg.id ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>
          <div className="flex-1">
            <div className="h-1 bg-black/20 rounded-full">
              <div className="h-1 bg-white/40 rounded-full w-0"></div>
            </div>
          </div>
          <Mic className="w-4 h-4" />
        </div>
      );
    }

    return <p className="text-sm">{msg.message}</p>;
  };

  const filteredConversations = conversations.filter(conv =>
    conv.user_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConversation = selectedUserId 
    ? conversations.find(conv => conv.user_id === selectedUserId) 
    : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
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
          <div className={`${selectedUserId ? 'hidden lg:block' : 'block'} lg:col-span-1`}>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-full">
              <div className="lg:hidden p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">المحادثات</h2>
              </div>
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

              <div className="overflow-y-auto h-[calc(100%-80px)] lg:h-[calc(100%-80px)]">
                {filteredConversations.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>لا توجد محادثات بعد</p>
                  </div>
                ) : (
                  filteredConversations.map((conv) => (
                    <div
                      key={conv.user_id}
                      onClick={() => setSelectedUserId(conv.user_id)}
                      className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedUserId === conv.user_id ? 'bg-blue-50 border-r-4 border-r-[#7EE7FC]' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={conv.user_picture ? `${API_URL}${conv.user_picture}` : '/logo.png'}
                            alt={conv.user_name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 truncate">{conv.user_name}</h3>
                            {conv.unread_count > 0 && (
                              <span className="bg-[#7EE7FC] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {conv.unread_count}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 truncate">{conv.last_message || 'ابدأ المحادثة'}</p>
                          <div className="text-xs text-gray-400 mt-1">
                            {conv.last_message_time ? formatTime(conv.last_message_time) : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className={`${selectedUserId ? 'block' : 'hidden lg:block'} lg:col-span-3`}>
            {selectedUserId ? (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-full flex flex-col relative">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setSelectedUserId(null)}
                        className="lg:hidden p-2 hover:bg-gray-200 rounded-3xl transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <div className="relative">
                        <img
                          src={selectedConversation?.user_picture ? `${API_URL}${selectedConversation.user_picture}` : '/logo.png'}
                          alt={selectedConversation?.user_name || ''}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedConversation?.user_name}</h3>
                        {projectContext.projectTitle && (
                          <p className="text-sm text-blue-600 font-medium">
                            حول مشروع: {projectContext.projectTitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  ref={messagesContainerRef}
                  onScroll={handleScroll}
                  className="overflow-y-auto p-4 space-y-4 relative"
                  style={{ 
                    height: 'calc(100vh - 200px)',
                    maxHeight: 'calc(100vh - 200px)'
                  }}
                >
                  {showScrollButton && (
                    <button
                      onClick={scrollToBottom}
                      className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-[#7EE7FC] hover:bg-[#3bdeff] text-white p-2 rounded-full shadow-lg transition-all duration-200 z-10"
                    >
                      <ArrowLeft className="w-4 h-4 rotate-90" />
                    </button>
                  )}
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                      <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>ابدأ المحادثة الآن</p>
                    </div>
                  ) : (
                    messages.map((msg, index) => {
                      const isCurrentUser = msg.sender_id === currentUser?.id;
                      const showDate = index === 0 || 
                        formatDate(msg.created_at) !== formatDate(messages[index - 1].created_at);
                      
                      return (
                        <div key={msg.id}>
                          {showDate && (
                            <div className="text-center text-sm text-gray-500 mb-4">
                              {formatDate(msg.created_at)}
                            </div>
                          )}
                          <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                              isCurrentUser 
                                ? 'bg-[#7EE7FC] text-black rounded-br-md' 
                                : 'bg-gray-100 text-gray-900 rounded-bl-md'
                            }`}>
                              {renderMessageContent(msg)}
                              <div className={`flex items-center justify-end gap-1 mt-2 text-xs ${
                                isCurrentUser ? 'text-black' : 'text-gray-500'
                              }`}>
                                <span>{formatTime(msg.created_at)}</span>
                                {getStatusIcon(msg)}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
                  {selectedImage && (
                    <div className="mb-3 relative inline-block">
                      <img 
                        src={URL.createObjectURL(selectedImage)} 
                        alt="معاينة" 
                        className="h-20 rounded-lg"
                      />
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {audioBlob && (
                    <div className="mb-3 bg-white rounded-lg p-3 flex items-center gap-3">
                      <Mic className="w-5 h-5 text-[#7EE7FC]" />
                      <span className="text-sm">رسالة صوتية جاهزة للإرسال</span>
                      <button
                        onClick={() => setAudioBlob(null)}
                        className="mr-auto text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {isRecording && (
                    <div className="mb-3 bg-red-50 rounded-lg p-3 flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-red-600">
                          {formatRecordingTime(recordingTime)}
                        </span>
                      </div>
                      <button
                        onClick={stopRecording}
                        className="mr-auto bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                      >
                        <StopCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={cancelRecording}
                        className="text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 hover:bg-gray-200 rounded-3xl transition-colors"
                    >
                      <ImageIcon className="w-5 h-5 text-gray-600" />
                    </button>
                    <button 
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`p-2 hover:bg-gray-200 rounded-3xl transition-colors ${isRecording ? 'bg-red-100' : ''}`}
                    >
                      <Mic className={`w-5 h-5 ${isRecording ? 'text-red-500' : 'text-gray-600'}`} />
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="اكتب رسالتك هنا..."
                        disabled={sendingMessage || isRecording}
                        className="w-full pr-4 pl-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={(!message.trim() && !selectedImage && !audioBlob) || sendingMessage}
                      className="p-3 bg-[#7EE7FC] hover:bg-[#3bdeff] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full transition-colors"
                    >
                      {sendingMessage ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
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
    <div className="flex-1 flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    </div>
  </div>
);

const ChatPage = () => {
  return (
    <Suspense fallback={<ChatLoading />}>
      <ChatContent />
    </Suspense>
  );
};

export default ChatPage;
