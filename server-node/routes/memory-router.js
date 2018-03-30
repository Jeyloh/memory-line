const express = require('express');
const router = express.Router();
const controller = require('../controllers/memory-controller')

// About page route.
router.get('/get-async-memory-list/:userId', async (req, res) => {
  const asyncMemory = await controller.getAsyncMemoryList(req, res);
  res.send(asyncMemory);
})


// About page route.
router.post('/api/add-memory/:userId', function (req, res) {
  res.send('About this wiki');
})


module.exports = router;