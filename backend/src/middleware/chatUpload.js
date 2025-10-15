const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create chat uploads directory if it doesn't exist
const chatUploadsDir = path.join(__dirname, '../../uploads/chat');
if (!fs.existsSync(chatUploadsDir)) {
  fs.mkdirSync(chatUploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, chatUploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `chat-${uniqueSuffix}${ext}`);
  }
});

// File filter - allow images and audio files
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const allowedAudioTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/webm', 'audio/ogg', 'audio/m4a'];
  
  if (allowedImageTypes.includes(file.mimetype) || allowedAudioTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('نوع الملف غير مدعوم. يُسمح فقط بالصور (JPEG, PNG, GIF, WebP) والملفات الصوتية (MP3, WAV, WebM, OGG, M4A)'), false);
  }
};

// Create multer instance
const chatUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  }
});

module.exports = chatUpload;
