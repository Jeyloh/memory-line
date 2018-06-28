const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth-controller')

router.get('/get-access-token', async (req, res) => {
  try {
    const asyncMemory = await controller.getAccessToken(req, res);
    res.send(asyncMemory);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})

router.post('/login', async (req, res) => {
  const asyncMemory = await controller.login(req, res);
  res.send(asyncMemory);
})

module.exports = router;