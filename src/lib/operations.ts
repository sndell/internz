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
import loadJobs from "../features/finder/finderSlice";

//////Importera Filter array och filtrera ut "active: false"
// const filterArray = filterSlice.filter((filter) => filter.active === false);

//////Skicka med en querry till firebase som kollar i firebase efter taggar som matchar filter

export const fetchFromDB = async (array: Array<any>) => {
  try {
    
/*     const filterArray = useAppSelector((state )=> state.filter.filters.map((item) => {
      item.items.filter((tag: {active: boolean}) => tag.active === true)
    })) */
    console.log(array)
  const querySnapshot = await getDocs(/* query( */collection(db, "job-listings")/* , where("title", "==", "Google") *//* ) */);
  console.log(querySnapshot)

    const docs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(docs)
    return docs;
  } catch (error) {
    console.error("Error fetching documents: ", error);
    throw error;
    return [];
  }
};
export const fetchFromNode = async (searchTerm: string) => {
  try {
    const fetchOptions = {
      method: "POST",
      headers: {
        "query": searchTerm,
        "accept": "*/*",
        "Content-Type": "application/json",
      },
      mode: "same-origin",
      body: JSON.stringify({ query: searchTerm }),
    }
    const url = "http://localhost:3001/jobs/search"
    const response = await fetch(url, fetchOptions)
    const data = await response.json()
    console.log(data);
    
  } catch (error) {
    console.error(error)
  }
}
fetchFromNode("på")
