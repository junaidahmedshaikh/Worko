const express = require("express");
const fs = require("fs");

const { v4: uuidv4 } = require("uuid");
// const { promisify } = require("util");

// const pipeline = promisify(require("stream").pipeline);

const router = express.Router();

// const upload = multer();
const upload = require("../multer/multer");
const cloudinary = require("../cloudinary/cloudinary");
const path = require("path");
const User = require("../db/User");
const JobApplicant = require("../db/JobApplicant");
router.post("/resume", upload.single("file"), async (req, res) => {
    // const { file } = req;
    // console.log(file, "asf", file.detectedFileExtension);
    // if (file.mimetype != "application/pdf") {
    //     res.status(400).json({
    //         message: "Invalid format",
    //     });
    // } else {
    //     const filename = `${uuidv4()}.pdf`;
    //     console.log("HEELLO", filename);

    //     pipeline(
    //         file.stream,
    //         fs.createWriteStream(
    //             `/Users/vishal/Documents/code/jobPortals/job-portal/backend/public/resume/${filename}`
    //         )
    //     )
    //         .then(() => {
    //             res.send({
    //                 message: "File uploaded successfully",
    //                 url: `/host/resume/${filename}`,
    //             });
    //         })
    //         .catch((err) => {
    //             res.status(400).json({
    //                 message: "Error while uploading",
    //             });
    //         });
    // }
    try {
        //Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            transformation: {
                flags: `attachment:${uuidv4()}${req.file.name}`,
                fetch_format: "auto",
            },
            format: "pdf",
        });
        let user = await User.findOneAndUpdate(
            { _id: req.body._id },
            {
                resume: result.secure_url,
            }
        );
        // let jobapply = await JobApplicant.findById(req.body._id);
        let jobApplicant = await JobApplicant.findOneAndUpdate(
            { userId: req.body._id },
            {
                resume: result.secure_url,
            }
        );

        await user.save();
        await jobApplicant.save();
        res.send({
            message: "Resume uploaded successfully",
            url: result.secure_url,
            cloudinary_id: result.public_id,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Error while uploading",
        });
    }
});

router.post("/profile", upload.single("file"), async (req, res) => {
    try {
        //Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        let user = await User.findOneAndUpdate(
            { _id: req.body._id },
            {
                profile: result.secure_url,
                cloudinary_id: result.public_id,
            }
        );
        // let jobapply = await JobApplicant.findById(req.body._id);
        let jobApplicant = await JobApplicant.findOneAndUpdate(
            { userId: req.body._id },
            {
                profile: result.secure_url,
                cloudinary_id: result.public_id,
            }
        );

        await user.save();
        await jobApplicant.save();
        res.send({
            message: "Profile image uploaded successfully",
            url: result.secure_url,
            cloudinary_id: result.public_id,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Error while uploading",
        });
    }
    // console.log("HELLO WORLD");
    // const { file } = req;
    // console.log(file, "as");
    // if (file.mimetype != "image/jpeg" && file.mimetype != "image/png") {
    //     res.status(400).json({
    //         message: "Invalid format",
    //     });
    // } else {
    //     const filename = `${uuidv4()}${
    //         file.mimetype === "image/jpeg" ? ".jpg" : ".png"
    //     }`;
    //     console.log(filename, "asd");
    //     pipeline(
    //         file.stream,
    //         fs.createWriteStream(
    //             `/Users/vishal/Documents/code/jobPortals/job-portal/backend/public/profile/${filename}`
    //         )
    //     )
    //         .then(() => {
    //             res.send({
    //                 message: "Profile image uploaded successfully",
    //                 url: `/host/profile/${filename}`,
    //             });
    //         })
    //         .catch((err) => {
    //             res.status(400).json({
    //                 message: "Error while uploading",
    //             });
    //         });
    // }
});

module.exports = router;
