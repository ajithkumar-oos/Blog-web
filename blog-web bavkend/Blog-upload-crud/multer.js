import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

export const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|mp4|mov|avi|mkv/;
    const isValid = fileTypes.test(file.mimetype) && fileTypes.test(file.originalname.toLowerCase());
    if (isValid) cb(null, true);
    else cb(new Error("Only images/videos allowed"));
  },
});
