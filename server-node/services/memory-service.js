const admin = require('firebase-admin')
const db = admin.database();
const auth = admin.auth();
const currentUser = auth.currentUser;
const memoryRef = db.ref("memories");

handleSuccess = (resolve, res) => {
  console.log(res)
  resolve(res);
}

handleError = (reject, error) => {
  reject(error);
}

// https://firebase.google.com/docs/database/admin/retrieve-data
exports.setupAsyncMemoryList = (userId) => {
  const usersMemories = db.ref(`memories/${userId}`);
  return new Promise( (resolve, reject) => {
    try {
      usersMemories.on("value", snapshot => {
        console.log("Async operation started")
        console.log(snapshot.val());
        resolve(snapshot.val());
      })
    } catch (error) {
      reject(error);
    }


  })
}

exports.addMemory = (newMemoryObj) => {
  console.log(`addMemory ${newMemoryObj.userId}`)
  const memoryUserRef = db.ref(`memories/${newMemoryObj.userId}`);
  const newMemoryOnUserRef = memoryUserRef.push();
  return new Promise( async (resolve, reject) => {
    newMemoryOnUserRef.set(newMemoryObj)
      .then( () => {
        resolve(newMemoryObj);
      })
      .catch ( err => {
        console.log(err);
        reject(err);
      })
  })
}

exports.deleteMemory = (userId, memoryId) => {
  console.log(`addMemory ${title}`)
  return new Promise( (resolve, reject) => {
    memoryRef[userId].update({
      [userId]: {
        [key]: value
      }
    })
      .then( (res) => {
        handleSuccess(resolve, res);
      })
      .catch( (error) => {
        handleError(reject, error)
      })
  })
}


exports.updateMemory = (userId, key, value) => {
  console.log(`addMemory ${title}`)
  return new Promise( (resolve, reject) => {
    ref.update({
      [userId]: {
        [key]: value
      }
    })
      .then( (res) => {
        handleSuccess(resolve, res);
      })
      .catch( (error) => {
        handleError(reject, error)
      })
  })
}