const googleAuthService = require('../services/google-auth-service')

exports.getAccessToken = async (req, res) => {
  try {
    const accessToken = await googleAuthService.getAccessToken();
    console.log("accessToken: ", accessToken);
    res.status(200).send({
      accessToken: accessToken
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

exports.login = (req, res) => {
  if (!req.body) return res.sendStatus(400)

  const token = req.body.token
  console.log(token);
  firebase.auth().verifyIdToken(token)
    .then((decodedToken) => {
      req.session.decodedToken = decodedToken
      return decodedToken
    })
    .then((decodedToken) => res.json({ status: true, decodedToken }))
    .catch((error) => res.json({ error }))
}

