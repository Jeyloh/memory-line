const express = require('express');
const router = express.Router()
const controller = require('../controllers/calendar-controller')

router.get('/get-events/:access', async (req, res) => {
  console.log("WORKS")
  try {
    const asyncMemory = await controller.getGoogleCalendarEvents(req, res);
    res.send(asyncMemory);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})

module.exports = router
