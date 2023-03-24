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
  
  export const searchFullText = async (searchTerm: string) => {
    try {
      const response = await fetch("https://localhost:3001/jobs/search", {
        method: "POST",
        headers: {
          query: searchTerm,
          accept: "*/*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: "",
        mode: "cors",
      });
  
      const JSONdata = await response.json();
      const data = JSONdata.search
    console.log(data);
    
      return data
      
    } catch (error) {
      console.error(error);
    }
  };
