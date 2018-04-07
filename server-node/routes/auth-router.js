const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth-controller')

router.post('/login', async (req, res) => {
  const asyncMemory = await controller.login(req, res);
  res.send(asyncMemory);
})

module.exports = router;