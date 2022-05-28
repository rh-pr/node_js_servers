"use strict";

const Model = require("../core/model");

const PHOTO_PUBLIC_PATH = "/images/profiles";

class Profile extends Model {
  getTableName = () => "profiles";

  async update(id, value) {
    const profile = await super.update(id, value);
    return this.#setPhotoPublicPath(profile);
  }

  async get() {
    return super
      .get()
      .then((data) =>
        data.map((profile) => this.#setPhotoPublicPath(profile))
      );
  }

  async getById(id) {
    const profile = await super.getById(id);
    return  this.#setPhotoPublicPath(profile);
  }

  #setPhotoPublicPath(profile) {
    if (!profile) return profile;
    return {
      ...profile,
      ...(profile?.photo ? {photo: `${PHOTO_PUBLIC_PATH}/${profile.photo}`} : null),
    };
  }
}

module.exports = Profile;