import {fdb, auth, provider} from '../firebase/init'
import { extendObservable } from 'mobx'

class AuthStore {
  constructor() {
    extendObservable(this, {
      user: null,
      accessToken: null
    });

    // auth.onAuthStateChanged(user => {
    //   if (user) {
    //     this.user = user;
    //   }
    // })
  }



  loginUser = async () => {
    console.log("@action login user");

    auth.signInWithPopup(provider)
      .then( result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        this.accessToken = result.credential.accessToken;
        console.log(result.credential.accessToken);
        // The signed-in user info.
        this.user = result.user;
      })
      .catch( error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        console.error(error);
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
        return null;
      })
  }
}
export const authStore = new AuthStore();
