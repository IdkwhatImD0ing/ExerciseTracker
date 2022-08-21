import { database } from "../firebase";
import { useAuth } from "../auth/UserAuthContext";
import { useRouter } from "next/router";

import {
  doc,
  updateDoc,
  deleteField,
  setDoc,
  collection,
  getDoc,
  set,
  getDocFromServer,
} from "firebase/firestore";

import { encode, decode } from "firebase-encode";

export function addAge(auth, num) {
  let userId = auth.user.uid;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, "stats");

  setDoc(docRef, { age: num}, { merge: true});
  return;
}

export function addGender(auth, str) {
  let userId = auth.user.uid;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, "stats");

  setDoc(docRef, { gender: str}, { merge: true});
  return;
}

export function addWeight(auth, num) {
  let userId = auth.user.uid;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, "stats");

  setDoc(docRef, { weight: num}, { merge: true});
  return;
}

export function addHeight(auth, num) {
  let userId = auth.user.uid;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, "stats");

  setDoc(docRef, { height: num}, { merge: true});
  return;
}

export function addNeck(auth, num) {
  let userId = auth.user.uid;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, "stats");

  setDoc(docRef, { neck: num}, { merge: true});
  return;
}

export function addWaist(auth, num) {
  let userId = auth.user.uid;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, "stats");

  setDoc(docRef, { waist: num}, { merge: true});
  return;
}

export function addHip(auth, num) {
  let userId = auth.user.uid;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, "stats");

  setDoc(docRef, { hip: num}, { merge: true});
  return;
}