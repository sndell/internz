import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export const getJobs = async (): Promise<Job[]> => {
  try {
    // Get a reference to the jobs collection in the Firestore
    const jobCollectionRef = collection(db, "jobs");

    // Get all the documents in the jobs collection and return them as an array
    const querySnapshot = await getDocs(jobCollectionRef);
    const jobs: Job[] = [];
    querySnapshot.forEach((doc) => {
      const jobData = doc.data() as Job;
      jobs.push({
        ...jobData,
        id: doc.id,
      });
    });
    return jobs;
  } catch (e) {
    // Throw any errors that occurred during the execution of the function
    throw e;
  }
};
