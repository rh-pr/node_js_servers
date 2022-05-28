"use strict";

const fs = require("fs/promises");

const profileConfig = require("./profile.config");

class ProfileController {
  constructor(profile) {
    this.profile = profile;
  }

  addPhoto = async (req, res, next) => {
    try {
      const { id } = req.params;
      const profile = await this.profile.getById(id);
      if (!profile) {
        await fs
          .unlink(`${profileConfig.photo.pathToDir}/${req.file?.filename}`)
          .catch(console.error);
        return next();
      }

      const updatedProfile = await this.profile.update(id, {
        photo: req.file?.filename,
      });
      res.status(201).json({ photo: updatedProfile.photo });
    } catch (err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    try {
      const { firstName, lastName, email } = req.body;

      const data = await this.profile.create({
        firstName,
        lastName,
        email,
      });

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  };

  get = async (req, res, next) => {
    try {
      const data = await this.profile.get();

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;

      const data = await this.profile.getById(id);
      if (!data) return next();

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = ProfileController;