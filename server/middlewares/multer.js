const multer = require("multer");
const path = require("path");

class FileUploadMul {
    constructor(filePath) {
        this.filePath = filePath;
        this.storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, this.filePath);
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                const ext = path.extname(file.originalname);
                cb(null, file.fieldname + "-" + uniqueSuffix + ext);
            },
        });
        this.upload = multer({
            storage: this.storage,
            limits: { fileSize: 2 * 1024 * 1024 * 1024 },
            fileFilter: (req, file, cb) => {
                const ext = path.extname(file.originalname).toLowerCase() === ".mp4";
                const mime = file.mimetype === "video/mp4"; 
                if (ext && mime) {
                    cb(null, true);
                } else {
                    cb(new Error("Only MP4 videos are allowed"));
                }
            },
        });
    }
    single(fieldName) {
        return this.upload.single(fieldName);
    }
    multiple(fieldName, maxCount) {
        return this.upload.array(fieldName, maxCount);
    }
}

module.exports = FileUploadMul; 