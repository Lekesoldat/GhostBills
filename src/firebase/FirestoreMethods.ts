import firebase from "firebase";
import Subscription from "../typeDefs";

export const getSubscriptions = (userId: string) =>
  firebase
    .firestore()
    .collection(`users/${userId}/subscriptions`)
    .get()
    .then((snapshot) =>
      snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );

export const createSubscription = (
  userId: string,
  newSubscription: Subscription
) =>
  firebase
    .firestore()
    .collection(`users/${userId}/subscriptions`)
    .add(newSubscription);

export const getSubscription = (userId: string, docId: string) =>
  firebase
    .firestore()
    .collection(`users/${userId}/subscriptions/${docId}`)
    .doc(docId)
    .get();

export const updateSubscription = (
  userId: string,
  docId: string,
  updatedSubscription: Subscription
) =>
  firebase
    .firestore()
    .collection(`users/${userId}/subscriptions/${docId}`)
    .doc(docId)
    .update(updatedSubscription);

export const deleteSubscription = (userId: string, docId: string) =>
  firebase
    .firestore()
    .collection(`users/${userId}/subscriptions`)
    .doc(docId)
    .delete();
