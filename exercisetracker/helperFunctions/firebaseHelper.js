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

export function addStats(auth, obj) {
  let userId = auth.user.uid;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, "stats");

  setDoc(
    docRef,
    {
      age: obj.age,
      gender: obj.gender,
      weight: obj.weight,
      height: obj.height,
      neck: obj.neck,
      waist: obj.waist,
      hip: obj.hip,
    },
    { merge: true }
  );

  return;
}

export function addTimeStats(auth, obj) {
  let userId = auth.user.uid;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, "time_stats");
  console.log(obj);

  setDoc(docRef, { [obj[0]]: [obj[1], obj[2]] }, { merge: true });
  return;
}

export async function getTime(auth) {
  let userId = auth.user.uid;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, "time_stats");

  let docSnap = await getDocFromServer(docRef);
  if (docSnap.data() == null) {
    return "";
  }

  let time = Object.keys(docSnap.data());
  time.sort(function (a, b) {
    //Sorts dates
    var c = new Date(a);
    var d = new Date(b);
    return c - d;
  });

  if (time.length == 0) {
    return "";
  }

  console.log(time);

  let bmi = [];
  let bodyFat = [];
  let dates = [];
  for (let i = 0; i < time.length; i++) {
    dates.push(time[i]);
    bmi.push(docSnap.data()[time[i]][0]);
    bodyFat.push(docSnap.data()[time[i]][1]);
  }
  //console.log(dates);
  //console.log(bmi);
  //console.log(bodyFat);
  return [dates, bmi, bodyFat];
}
