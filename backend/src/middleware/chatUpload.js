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

// File filter - allow images and audio files with size validation
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const allowedAudioTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/webm', 'audio/ogg', 'audio/m4a'];
  
  if (allowedImageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else if (allowedAudioTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('نوع الملف غير مدعوم. يُسمح فقط بالصور (JPEG, PNG, GIF, WebP) والملفات الصوتية (MP3, WAV, WebM, OGG, M4A)'), false);
  }
};

// Create multer instance with dynamic size limits
const chatUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max (will be validated per file type in controller)
  }
}).single('file');

// Wrapper middleware to enforce size limits per file type
const chatUploadWithValidation = (req, res, next) => {
  chatUpload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    
    // Validate size based on file type
    if (req.file) {
      const isImage = req.file.mimetype.startsWith('image/');
      const isAudio = req.file.mimetype.startsWith('audio/');
      
      if (isImage && req.file.size > 5 * 1024 * 1024) {
        // Remove uploaded file
        const fs = require('fs');
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ 
          success: false, 
          message: 'حجم الصورة يتجاوز الحد المسموح (5 MB)' 
        });
      }
      
      if (isAudio && req.file.size > 10 * 1024 * 1024) {
        // Remove uploaded file
        const fs = require('fs');
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ 
          success: false, 
          message: 'حجم الملف الصوتي يتجاوز الحد المسموح (10 MB)' 
        });
      }
    }
    
    next();
  });
};

module.exports = chatUploadWithValidation;
