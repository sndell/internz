import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/reduxHooks";
import { clearActiveJob, setActiveJob } from "../slices/activeJobSlice";
import { motion } from "framer-motion";
interface JobProps {
  job: Job;
}

const JobPreview = ({ job }: JobProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activeJob = useAppSelector((state) => state.activeJob.job);

  const handleActibeJob = () => {
    dispatch(setActiveJob(job));
    navigate(`/${job.id}`);
  };

  useEffect(() => {
    dispatch(clearActiveJob());
  }, []);

  return (
    <motion.div
      layoutId={job.id}
      onClick={handleActibeJob}
      className="flex cursor-pointer flex-col gap-3 rounded-xl bg-white p-3"
    >
      <div className="flex gap-3">
        <img
          src={job.company.logo as string}
          className="h-12 w-12 shrink-0 rounded-xl"
        />
        <div className="grid-cols-[minmax(auto, max-content)] grid">
          <div className="text-base font-semibold">{job.position}</div>
          <div className="no-scrollbar flex items-center gap-2 overflow-x-scroll text-sm font-medium text-primary">
            {job.company.name}
            <span className="text-xs">&#9679;</span>
            {job.scope}
            <span className="text-xs">&#9679;</span>
            {job.city}
            <span className="text-xs">&#9679;</span>
            {job.location}
          </div>
        </div>
      </div>
      <div className="text-sm line-clamp-3">{job.description}</div>
      <div className="flex flex-wrap gap-3">
        {job.tags.map((tag, index) => (
          <div
            className="rounded-xl bg-secondary px-3 py-1.5 text-sm"
            key={index}
          >
            {tag}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default JobPreview;
