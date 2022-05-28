"use strict";

const fs = require("fs");
const multer = require("multer");
const sharp = require("sharp");

const profileConfig = require("./profile.config");

class ProfileMiddleware {
  uploadPhoto = (req, res, next) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, profileConfig.photo.pathToDir);
      },
      filename: function (req, file, cb) {
        const extention = file?.originalname?.split(".")?.pop();
        const fileName = `${req.params.id}${extention ? "." + extention : ""}`;

        const ws = fs.createWriteStream(
          `${profileConfig.photo.pathToDir}/${fileName}`
        );
        ws.on("error", (err) => cb(err));

        file.stream
          .pipe(
            sharp().resize(
              profileConfig.photo.width,
              profileConfig.photo.height
            )
          )
          .pipe(ws);

        cb(null, fileName);
      },
    });

    const upload = multer({
      storage: storage,
      limits: { fileSize: profileConfig.photo.maxSize },
    });

    return upload.single("photo");
  };
}

module.exports = ProfileMiddleware;