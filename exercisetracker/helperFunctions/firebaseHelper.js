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
