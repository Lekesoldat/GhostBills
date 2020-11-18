import firebase from "firebase";

export const signUp = (username: string, email: string, password: string) =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) =>
      firebase
        .firestore()
        .collection("users")
        .doc(res.user?.uid)
        .set({ username, email, yearly: 0, monthly: 0, weekly: 0, daily: 0 })
    )
    .then(() => "Successfully signed up!");

export const signIn = (email: string, password: string) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => "Successfully signed in!");

export const signOut = () => firebase.auth().signOut();
