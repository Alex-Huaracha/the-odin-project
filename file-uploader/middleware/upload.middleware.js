import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folderPath = `file-uploader/${req.user.id}`;

    if (req.body.parentId) {
      folderPath = `file-uploader/${req.user.id}/${req.body.parentId}`;
    }

    const public_id = `${Date.now()}-${file.originalname}`;

    return {
      folder: folderPath,
      public_id: public_id,
      allowed_formats: [
        'jpeg',
        'jpg',
        'png',
        'gif',
        'pdf',
        'doc',
        'docx',
        'txt',
      ],
    };
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

export default upload;
