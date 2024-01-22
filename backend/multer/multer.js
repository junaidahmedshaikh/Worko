const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        console.log(ext, "asf");
        if (
            ext !== ".jpg" &&
            ext !== ".jpeg" &&
            ext !== ".png" &&
            ext !== ".pdf"
        ) {
            cb(new Error("Unsupported file type!"), false);
            return;
        }
        cb(null, true);
    },
});
