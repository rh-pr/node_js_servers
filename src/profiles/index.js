'use strict';

const {Router} = require ('express');
const Profile = require ('./profile');
const ProfileController = require ('./profile.controller');
const ProfileMiddleware = require ('./profile.middleware');

module.exports = () => {
  const router = new Router ();

  const profile = new Profile ();
  const profileController = new ProfileController (profile);
  const profileMiddleware = new ProfileMiddleware ();

  router.get ('/', profileController.get);
  router.post ('/', profileController.create);
  router.get ('/:id', profileController.getById);
  router.post (
    '/:id/photo',
    profileMiddleware.uploadPhoto (),
    profileController.addPhoto
  );
  return router;
};
