import { BsFilter, BsSearch } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import useToggle from "../../../../hooks/useToggle";
import Filter from "../filter/Filter";
import { AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../../app/reduxHooks";
import { updateFilter } from "./filterSlice";
import { useEffect, useState } from "react";
import { getFilters } from "../../api/getFilters";
import { getJobs } from "../../api/getJobs";
import Job from "./Job";
import { getJobsWithFilters } from "../../api/getJobsWithFilters";

const Finder = () => {
  const [active, toggleActive] = useToggle();
  const [filters, setFilters] = useState<Filters | null>(null);
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const dispath = useAppDispatch();
  const searchValue = useAppSelector((state) => state.filter.search);
  const activeFilters = useAppSelector((state) => state.filter);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispath(updateFilter({ category: "search", value: e.target.value }));
  };

  useEffect(() => {
    const fetch = async () => {
      const filtersData = await getFilters();
      const jobsData = await getJobs();
      setFilters(filtersData);
      setJobs(jobsData);
    };
    fetch();
  }, []);

  useEffect(() => {
    console.log(jobs);
  }, [jobs]);

  const search = async () => {
    console.log(activeFilters);
    const test = await getJobsWithFilters(activeFilters);
    setJobs(test);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex h-12 items-center rounded-xl bg-white px-3">
        <BsSearch className="text-lg" />
        <input
          value={searchValue}
          placeholder="Search"
          onChange={handleSearch}
          type="text"
          className="h-full flex-1 px-2 outline-none"
        />
        <button onClick={toggleActive}>
          {active ? (
            <CgClose className="text-lg" />
          ) : (
            <BsFilter className="text-2xl" />
          )}
        </button>
      </div>
      <AnimatePresence>
        {active && <Filter filters={filters} />}
      </AnimatePresence>
      <button onClick={search} className="rounded-xl bg-black py-2 text-white">
        Search
      </button>
      <div className="flex flex-col gap-3">
        {jobs && jobs.map((job, index) => <Job job={job} key={index} />)}
      </div>
    </div>
  );
};

export default Finder;
