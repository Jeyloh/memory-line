import {fdb, auth, provider} from '../firebase/init'
import { extendObservable } from 'mobx'

class AuthStore {
  constructor() {
    extendObservable(this, {
      user: null,
      token: null
    });

    // auth.onAuthStateChanged(user => {
    //   if (user) {
    //     this.user = user;
    //   }
    // })
  }

  login = () => {
    fetch("/api/accessToken").then(res => {
      console.table(res)
      fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList/primary', {
        method: 'GET',
        headers: {
          'Authorization': "Bearer ya29.c.Elt9BYVESzAtv1L97tfE0Ubu9a4ZJxsB6AwuYA0xN6zWz7z6f3uWh8pMTjQ9e5yhRgVvG43nTCDAK7K-Q5N4hRahLl39sWllkuOmASdakkno2rSKn_LgZZ_LLiBu"
        }
      }).catch(() => {
        console.log("failure")
      })
    })
  }

  loginUser = async () => {
    console.log("@action login user");

    auth.signInWithPopup(provider)
      .then( result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        this.token = result.credential.accessToken;
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
