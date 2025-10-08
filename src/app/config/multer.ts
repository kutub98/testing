// /* eslint-disable no-undef */
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import { Request } from 'express';

// // uploads ডিরেক্টরি তৈরি করুন যদি না থাকে
// const uploadsDir = path.join(process.cwd(), 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// const profilePicsDir = path.join(uploadsDir, 'profile-pics');
// if (!fs.existsSync(profilePicsDir)) {
//   fs.mkdirSync(profilePicsDir, { recursive: true });
// }

// // স্টোরেজ কনফিগারেশন
// const storage = multer.diskStorage({
//   destination: (req: Request, file: Express.Multer.File, cb) => {
//     cb(null, profilePicsDir);
//   },
//   filename: (req: Request, file: Express.Multer.File, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const extension = path.extname(file.originalname);
//     cb(null, 'profile-' + uniqueSuffix + extension);
//   }
// });

// // ফাইল ফিল্টার
// const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('শুধুমাত্র ইমেজ ফাইল অনুমোদিত'));
//   }
// };

// // Multer instance
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB limit
//   }
// });

// export default upload;

/* eslint-disable no-undef */
import multer from 'multer';
import { Request } from 'express';

// 🧠 Memory storage (safe for serverless)
const storage = multer.memoryStorage();

// 🧾 File filter (still active)
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('শুধুমাত্র ইমেজ ফাইল অনুমোদিত')); // Only images allowed
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;
