const express = require('express');
const router = express.Router()
const controller = require('../controllers/calendar-controller')

router.get('/get-access-token', async (req, res) => {
  try {
    const asyncMemory = await controller.getAccessToken(req, res);
    res.send(asyncMemory);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})
router.get('/get-events/:access', async (req, res) => {
  try {
    const asyncMemory = await controller.getGoogleCalendarEvents(req, res);
    res.send(asyncMemory);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})

module.exports = router
