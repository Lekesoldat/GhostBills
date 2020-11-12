import firebase from "firebase";
import Subscription from "../typeDefs";
import { calculateTotals } from "../utils";

export const getSubscriptions = async (userId: string) => {
  const response = await firebase
    .firestore()
    .collection(`users/${userId}/subscriptions`)
    .get();

  return response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createSubscription = async (
  userId: string,
  newSubscription: Subscription
) => {
  const user = firebase.firestore().collection("users").doc(userId);

  const userFields = (await user.get()).data();

  if (!userFields) {
    throw "userFields not found!";
  }

  // Update user fields
  for (const [key, value] of Object.entries(
    calculateTotals(newSubscription.recurring, newSubscription.cost)
  )) {
    if (userFields[key]) {
      userFields[key] += value;
    } else {
      userFields[key] = value;
    }
  }

  await user.update(userFields);

  // Add subscription
  await user.collection("subscriptions").add(newSubscription);
};

export const updateSubscription = async (
  userId: string,
  docId: string,
  updatedSubscription: Subscription
) => {
  const user = firebase.firestore().collection("users").doc(userId);

  const userFields = (await user.get()).data();

  if (!userFields) {
    throw "userFields not found!";
  }

  // Update user fields
  for (const [key, value] of Object.entries(
    calculateTotals(updatedSubscription.recurring, updatedSubscription.cost)
  )) {
    if (userFields[key]) {
      userFields[key] -= value;
    }
  }

  await user.update(userFields);

  await user.collection("subscriptions").doc(docId).update(updatedSubscription);
};

export const deleteSubscription = async (
  userId: string,
  docId: string,
  deletedSubscription: Subscription
) => {
  const user = firebase.firestore().collection("users").doc(userId);

  const userFields = (await user.get()).data();

  if (!userFields) {
    throw "userFields not found!";
  }

  // Update user fields
  for (const [key, value] of Object.entries(
    calculateTotals(deletedSubscription.recurring, deletedSubscription.cost)
  )) {
    if (userFields[key]) {
      userFields[key] -= value;
    }
  }

  await user.update(userFields);

  // Delete subscription
  await user.collection("subscriptions").doc(docId).delete();
};

export const getSubscription = (userId: string, docId: string) =>
  firebase
    .firestore()
    .collection(`users/${userId}/subscriptions/${docId}`)
    .doc(docId)
    .get();
