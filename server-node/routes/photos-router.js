const express = require('express');
const router = express.Router()
const controller = require('../controllers/photos-controller')

router.get('/get-photos/:access', async (req, res) => {
  try {
    const asyncPhotos = await controller.getPhotosByDate(req, res);
    res.send(asyncPhotos);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})

module.exports = router
