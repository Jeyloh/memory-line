import {auth, provider} from '../firebase/init'
import { extendObservable } from 'mobx'

class AuthStore {
  constructor() {
    extendObservable(this, {
      user: null,
      accessToken: sessionStorage.getItem("aT") ? sessionStorage.getItem("aT") : null
    });

    if (sessionStorage.getItem("aT")) {
      auth.onAuthStateChanged(user => {
        if (user) {
          console.log(user);
          this.user = user;
        }
      })
    }
  }



  loginUser = async () => {
    console.log("@action login user");

    auth.signInWithPopup(provider)
      .then( result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        this.accessToken = result.credential.accessToken;
        sessionStorage.setItem("aT", result.credential.accessToken);
        console.log(result.credential.accessToken);
        // The signed-in user info.
        this.user = result.user;
      })
      .catch( err => {
        // Handle Errors here.
        console.error(err);
      });
  }

  logoutUser = () => {
    console.log("@action logout user");
    auth.signOut()
      .then( () => {
        this.user = null;
        return null;
      })
      .catch( err => {
        console.error(err);
        return null;
      })
  }
}
export const authStore = new AuthStore();
