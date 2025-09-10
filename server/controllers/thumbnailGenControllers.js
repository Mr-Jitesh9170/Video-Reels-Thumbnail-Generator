const path = require("path");
const fs = require("fs")
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);

exports.uploadVideoGenThumbnail = async (req, res, next) => {
    const { resolution, timestamp } = req.body; 
    if (!resolution || !timestamp || !req.file) {
        return res.status(400).json({ message: "Missing fields or files!" });
    }
    try {
        const outputDir = path.join(__dirname, "..", "uploads", "thumbnail");
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        const videoPath = path.join(process.cwd(), "uploads", "video", req.file.filename);
        const thumbnailName = `thumbnail-${Date.now()}-${path.parse(req.file.filename).name}.png`;
        const thumbnailPath = path.join(outputDir, thumbnailName);
        ffmpeg(videoPath)
            .on("end", () => console.log(thumbnailPath))
            .on("error", err => console.error(err))
            .screenshots({
                timestamps: [`${timestamp}`],
                filename: thumbnailName,
                folder: outputDir,
                size: resolution || "1080x1920",
            });
        res.status(200).json({ message: "Thumbnail created!", imgPath: `/uploads/thumbnail${thumbnailName}` });
    } catch (error) {
        next(error);
    }
};