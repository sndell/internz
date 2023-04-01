import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

// Define the getFilters function
export const getFilters = async (): Promise<Filters> => {
  try {
    // Get a reference to the cities and tags documents within the filters collection
    const [citiesDocRef, tagsDocRef] = [
      doc(db, "filters/cities"),
      doc(db, "filters/tags"),
    ];

    // Get the cities and tags documents from the Firestore
    const [citiesDocSnap, tagsDocSnap] = await Promise.all([
      getDoc(citiesDocRef),
      getDoc(tagsDocRef),
    ]);

    // Extract the cities and tags data from the documents
    const citiesData = citiesDocSnap.data()?.items ?? [];
    const tagsData = tagsDocSnap.data()?.items ?? [];

    // Return the extracted filters data
    return { cities: citiesData, tags: tagsData };
  } catch (e) {
    // Throw any errors that occurred during the execution of the function
    throw e;
  }
};
