import multer from "multer";

const storage: Awaited<ReturnType<typeof  multer.diskStorage>> = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
});

export default upload;