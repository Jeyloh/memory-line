const service = require('../services/memory-service')

exports.getAsyncMemoryList = async (req, res) => {
  try {
    const userId = req.params.userId;
    const list = await service.setupAsyncMemoryList(userId)
    console.log("success! list: ", list)
    res.status(200).send({
      memoryList: list
    })
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

exports.addMemory = async (req, res) => {
  if (!req.body) return res.sendStatus(400)
  try {
    console.log(req.body);
    const requestBody = req.body;
    console.log(req.params.userId);
    const newMemoryModel = {
      ...requestBody,
      userId: req.params.userId
    };
    console.log("---- body ");
    console.log(newMemoryModel);

    const addMemoryResponse = await service.addMemory(newMemoryModel);
    console.log("response: ", addMemoryResponse);
    res.status(200).send({
      message: "Memory was added"
    })
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
