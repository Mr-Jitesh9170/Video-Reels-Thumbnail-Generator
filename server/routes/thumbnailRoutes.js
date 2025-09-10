const express = require("express")
const fs = require("fs")
const path = require("path")

const { uploadVideoGenThumbnail } = require("../controllers/thumbnailGenControllers")

const FileUploadMul = require("../middlewares/multer")
const uploadFolder = path.resolve("./uploads/video");

if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}
const upload = new FileUploadMul(uploadFolder);

const router = express.Router()

router.post("/thumbnail-generator", upload.single("videoFile"), uploadVideoGenThumbnail)

module.exports = router