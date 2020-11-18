import firebase from "firebase";
import { Subscription } from "../typeDefs";
import { calculateTotals } from "../utils";

export const getSubscriptions = async (userId: string) => {
  const response = await firebase
    .firestore()
    .collection(`users/${userId}/subscriptions`)
    .get();

  return response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getSubscription = (userId: string, docId: string) =>
  firebase
    .firestore()
    .collection(`users/${userId}/subscriptions/${docId}`)
    .doc(docId)
    .get();

export const getSubscriptionTotals = async (userId: string) => {
  const user = firebase.firestore().collection("users").doc(userId);
  const userFields = (await user.get()).data();

  if (!userFields) {
    return null;
  }

  return {
    yearly: userFields["yearly"],
    monthly: userFields["monthly"],
    weekly: userFields["weekly"],
    daily: userFields["daily"],
  };
};

export const createSubscription = async (
  userId: string,
  newSubscription: Subscription
) => {
  const user = firebase.firestore().collection("users").doc(userId);

  const userFields = (await user.get()).data();

  if (!userFields) {
    throw new Error("userFields not found!");
  }

  // Aggreate user fields
  for (const [key, value] of Object.entries(
    calculateTotals(newSubscription.recurring, newSubscription.cost)
  )) {
    if (userFields[key]) {
      userFields[key] += value;
    } else {
      userFields[key] = value;
    }
  }

  // Update user fields
  await user.update(userFields);

  // Add subscription
  await user.collection("subscriptions").add(newSubscription);

  console.log("Subscription created!");
};

// TODO: Handle change of recurring
export const updateSubscription = async (
  userId: string,
  docId: string,
  updatedSubscription: Subscription
) => {
  const user = firebase.firestore().collection("users").doc(userId);

  const oldSubscription = (
    await user.collection("subscriptions").doc(docId).get()
  ).data();

  const userFields = (await user.get()).data();

  if (!userFields) {
    throw new Error("userFields not found!");
  }

  if (!oldSubscription) {
    throw new Error("oldSubscription not found!");
  }

  // Aggreate user fields
  for (const [key, value] of Object.entries(
    calculateTotals(updatedSubscription.recurring, updatedSubscription.cost)
  )) {
    if (userFields[key]) {
      // Don't update same value.
      if (oldSubscription[key] === value) {
        return;
      } else {
        // Add or subtract depending if value increases or decreases
        userFields[key] += value > oldSubscription[key] ? value : -value;
      }
    }
  }

  // Update user fields
  await user.update(userFields);

  // Update supbscription
  await user.collection("subscriptions").doc(docId).update(updatedSubscription);

  console.log("Subscription updated!");
};

export const deleteSubscription = async (
  userId: string,
  docId: string,
  deletedSubscription: Subscription
) => {
  const user = firebase.firestore().collection("users").doc(userId);

  const userFields = (await user.get()).data();

  if (!userFields) {
    throw new Error("userFields not found!");
  }

  // Decrease user fields
  for (const [key, value] of Object.entries(
    calculateTotals(deletedSubscription.recurring, deletedSubscription.cost)
  )) {
    if (userFields[key]) {
      userFields[key] -= value;
    }
  }

  // Update user fields
  await user.update(userFields);

  // Delete subscription
  await user.collection("subscriptions").doc(docId).delete();

  console.log("Subscription deleted!");
};
