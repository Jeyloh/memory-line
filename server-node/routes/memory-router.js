const express = require('express');
const router = express.Router();
const controller = require('../controllers/memory-controller')

// About page route.
router.get('/get-async-memory-list/:userId', async (req, res) => {
  const asyncMemory = await controller.getAsyncMemoryList(req, res);
  res.send(asyncMemory);
})


// About page route.
router.post('/add-memory/:userId', async (req, res) => {
  if (!req.body) return res.sendStatus(400)
  const memoryAddedResponse = await controller.addMemory(req, res);
  res.send(memoryAddedResponse);
})


module.exports = router;