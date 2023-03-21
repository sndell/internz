import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import filterSlice from "../features/filter/filterSlice";
import filter from "../features/filter/filterSlice";
import { useAppSelector } from "../app/reduxHooks";

//////Importera Filter array och filtrera ut "active: false"
// const filterArray = filterSlice.filter((filter) => filter.active === false);

//////Skicka med en querry till firebase som kollar i firebase efter taggar som matchar filter

export const fetchFromDB = async () => {
  
  try {
    const querySnapshot = await getDocs(query(collection(db, "job-listings"), where("tags", "in", filterArray)));
    const docs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return docs;
  } catch (error) {
    console.error("Error fetching documents: ", error);
    throw error;
    return [];
  }
};
