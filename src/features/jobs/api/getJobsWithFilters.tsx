import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";

// Helper function to check if a job matches the given filters
const matchesJobFilters = (job: Job, filters: FilterSlice): boolean => {
  // Check if the job matches the location filter
  const matchesLocation =
    filters.locations.length === 0 || filters.locations.includes(job.city);

  // Check if the job matches the tags filter
  const matchesTags =
    filters.tags.length === 0 ||
    filters.tags.every((tag) => job.tags.includes(tag));

  // Prepare the search string
  const searchString = filters.search?.toLowerCase().trim() || "";

  // Check if the job matches the search filter
  const matchesSearch =
    !searchString ||
    job.position.toLowerCase().includes(searchString) ||
    job.description.toLowerCase().includes(searchString);

  // Prepare the start and end date filters
  const startDateFilter = filters.start_date
    ? new Date(filters.start_date).getTime()
    : null;
  const endDateFilter = filters.end_date
    ? new Date(filters.end_date).getTime()
    : null;

  // Convert job dates to timestamps
  const jobStartDate = new Date(job.start_date).getTime();
  const jobEndDate = new Date(job.end_date).getTime();

  // Check if the job matches the start date filter
  const matchesStartDate =
    !startDateFilter ||
    (filters.start_date_order === "before" && jobStartDate < startDateFilter) ||
    (filters.start_date_order === "after" && jobStartDate > startDateFilter) ||
    (filters.start_date_order === "on" && jobStartDate === startDateFilter);

  // Check if the job matches the end date filter
  const matchesEndDate =
    !endDateFilter ||
    (filters.end_date_order === "before" && jobEndDate < endDateFilter) ||
    (filters.end_date_order === "after" && jobEndDate > endDateFilter) ||
    (filters.end_date_order === "on" && jobEndDate === endDateFilter);

  // Return true if the job matches all filters
  return (
    matchesLocation &&
    matchesTags &&
    matchesSearch &&
    matchesStartDate &&
    matchesEndDate
  );
};

// Main function to get jobs with filters
export const getJobsWithFilters = async (
  filters: FilterSlice
): Promise<Job[]> => {
  try {
    // Get a reference to the jobs collection in Firestore
    const jobCollectionRef = collection(db, "jobs");

    // Fetch all the documents in the jobs collection
    const querySnapshot = await getDocs(jobCollectionRef);

    // Initialize an array to store the filtered jobs
    const jobs: Job[] = [];

    // Iterate through the fetched jobs and filter them
    querySnapshot.forEach((doc) => {
      const job = doc.data() as Job;

      // If the job matches all filters, add it to the jobs array
      if (matchesJobFilters(job, filters)) {
        jobs.push(job);
      }
    });

    // Return the filtered jobs
    return jobs;
  } catch (e) {
    // Throw any errors that occurred during the execution of the function
    throw e;
  }
};
