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

  export const fetchFromDB = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "job-listings"));
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