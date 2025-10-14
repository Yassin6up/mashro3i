'use client';

import { useState } from 'react';
import { Youtube, Link as LinkIcon, Plus, X, AlertCircle } from 'lucide-react';

interface VideoLinksUploaderProps {
  projectType: string;
  videoLinks: string[];
  videoSource: 'youtube' | 'google_drive' | '';
  onLinksChange: (links: string[]) => void;
  onSourceChange: (source: 'youtube' | 'google_drive') => void;
}

export default function VideoLinksUploader({
  projectType,
  videoLinks,
  videoSource,
  onLinksChange,
  onSourceChange
}: VideoLinksUploaderProps) {
  const [newLink, setNewLink] = useState('');
  const isDesktopApp = projectType === 'تطبيقات سطح المكتب';
  const minVideos = isDesktopApp ? 6 : 0;

  const addLink = () => {
    if (newLink.trim() && videoSource) {
      const validLink = validateLink(newLink.trim(), videoSource);
      if (validLink) {
        onLinksChange([...videoLinks, validLink]);
        setNewLink('');
      } else {
        alert(`يرجى إدخال رابط ${videoSource === 'youtube' ? 'YouTube' : 'Google Drive'} صحيح`);
      }
    }
  };

  const removeLink = (index: number) => {
    onLinksChange(videoLinks.filter((_, i) => i !== index));
  };

  const validateLink = (link: string, source: string): string | null => {
    if (source === 'youtube') {
      if (link.includes('youtube.com') || link.includes('youtu.be')) {
        return link;
      }
      return null;
    } else if (source === 'google_drive') {
      if (link.includes('drive.google.com')) {
        return link;
      }
      return null;
    }
    return null;
  };

  return (
    <div className="card space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Youtube className="w-6 h-6 text-red-600" />
          فيديوهات توضيحية للمشروع
        </h2>
        {isDesktopApp && (
          <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
            مطلوب 6 فيديوهات على الأقل
          </span>
        )}
      </div>

      {/* Source Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          اختر مصدر الفيديوهات *
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onSourceChange('youtube')}
            className={`
              p-4 rounded-xl border-2 transition-all duration-200
              ${videoSource === 'youtube'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-red-300'
              }
            `}
          >
            <div className="flex flex-col items-center gap-2">
              <div className={`
                w-12 h-12 rounded-lg flex items-center justify-center
                ${videoSource === 'youtube' ? 'bg-red-500' : 'bg-gray-100'}
              `}>
                <Youtube className={`w-6 h-6 ${videoSource === 'youtube' ? 'text-white' : 'text-gray-600'}`} />
              </div>
              <span className={`font-medium ${videoSource === 'youtube' ? 'text-red-600' : 'text-gray-700'}`}>
                YouTube
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onSourceChange('google_drive')}
            className={`
              p-4 rounded-xl border-2 transition-all duration-200
              ${videoSource === 'google_drive'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
              }
            `}
          >
            <div className="flex flex-col items-center gap-2">
              <div className={`
                w-12 h-12 rounded-lg flex items-center justify-center
                ${videoSource === 'google_drive' ? 'bg-blue-500' : 'bg-gray-100'}
              `}>
                <LinkIcon className={`w-6 h-6 ${videoSource === 'google_drive' ? 'text-white' : 'text-gray-600'}`} />
              </div>
              <span className={`font-medium ${videoSource === 'google_drive' ? 'text-blue-600' : 'text-gray-700'}`}>
                Google Drive
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Add Link Input */}
      {videoSource && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            أضف رابط الفيديو
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLink())}
              placeholder={videoSource === 'youtube' ? 'https://www.youtube.com/watch?v=...' : 'https://drive.google.com/file/d/...'}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <button
              type="button"
              onClick={addLink}
              className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors duration-200 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              إضافة
            </button>
          </div>
        </div>
      )}

      {/* Video Links List */}
      {videoLinks.length > 0 && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            الفيديوهات المضافة ({videoLinks.length} {isDesktopApp && `/ ${minVideos}`})
          </label>
          <div className="space-y-2">
            {videoLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 flex items-center gap-2">
                  {videoSource === 'youtube' ? (
                    <Youtube className="w-4 h-4 text-red-500 flex-shrink-0" />
                  ) : (
                    <LinkIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  )}
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline truncate"
                  >
                    {link}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  className="p-1 hover:bg-red-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Desktop App Warning */}
      {isDesktopApp && videoLinks.length < minVideos && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-800">
              برامج سطح المكتب تحتاج إلى {minVideos} فيديوهات على الأقل
            </p>
            <p className="text-sm text-amber-700 mt-1">
              يرجى إضافة {minVideos - videoLinks.length} فيديوهات أخرى توضح طريقة تشغيل البرنامج واستخدامه
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
