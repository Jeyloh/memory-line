// import React, { Component } from "react";
// import {firebase, auth} from "../firebase/init"
//
// export function addFirebase(WrappedComponent) {
//   return class NewFunctionality extends Component {
//
//     signinPopup = () => {
//       const provider = new auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          this.setState({user: user, token: token})
        })
        .catch(function(error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential;
          // ...
        });
//     }
//
//     render() {
//      const { user, token } = this.state;
//
//      if (user) {
//        return <WrappedComponent {...this.props} user={user} accessTokenGAPI={token} />
//      } else {
//        return <button onClick={() => this.signinPopup()}>Login</button>
//      }
//     }
//   }
// }
