import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userPath = path.join('uploads', req.user.id);
    fs.mkdirSync(userPath, { recursive: true });
    cb(null, userPath);
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = uniquePrefix + '-' + file.originalname;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt/;

  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    req.fileValidationError =
      'Invalid file type. Only allowed: JPEG, PNG, GIF, PDF, DOC, DOCX, TXT.';
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: fileFilter,
});

export default upload;
