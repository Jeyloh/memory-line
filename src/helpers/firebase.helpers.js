import gapi from "gapi-client";
import {auth} from "../firebase/init"

getAuthInstance();

function getAuthInstance() {
  gapi.auth2.getAuthInstance().signIn()
    .then(function _firebaseSignIn(googleUser) {
      const unsubscribe = auth.onAuthStateChanged(function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!_isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          const credential = auth.GoogleAuthProvider.credential(
            googleUser.getAuthResponse().id_token);

          // Sign in with credential from the Google user.
          return auth.signInWithCredential(credential)
            .then(function (result) {
              alert(result);
              console.log(result);
            });
        }
      });
    })
}

function _isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}

var user = gapi.auth2.getAuthInstance().currentUser.get();
return user.getAuthResponse().access_token;