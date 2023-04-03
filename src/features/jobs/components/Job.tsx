import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/reduxHooks";
import { getJobById } from "../api/getJobById";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { BsCalendarDateFill } from "react-icons/bs";

const Job = () => {
  const [job, setJob] = useState<Job | null>(
    useAppSelector((state) => state.activeJob.job)
  );
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      const job = await getJobById(params.jobId as string);
      if (job) setJob(job);
    };

    fetchJob();
  }, [params]);

  const handleClose = () => {
    navigate("/");
  };

  const handleNavigate = () => {
    navigate(`/profile/${job?.user.id}`);
  };

  return (
    <div
      onMouseDown={handleClose}
      className="fixed inset-0 grid place-items-center bg-black/25"
    >
      <motion.div
        onMouseDown={(e) => e.stopPropagation()}
        layoutId={job?.id}
        className="inset-0 m-3 flex max-h-screen flex-col overflow-y-auto rounded-xl bg-white p-3"
      >
        <div className="flex items-start justify-between">
          Details
          <button onClick={handleClose} className="rounded-xl bg-secondary p-3">
            <IoClose />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <div className="text-sm font-semibold">Role</div>
            <div>{job?.position}</div>
          </div>
          <div>
            <div className="text-sm font-semibold">Details</div>
            <div className="grid-cols-[minmax(auto, max-content)] grid">
              <div className="no-scrollbar flex items-center gap-2 overflow-x-scroll text-sm font-medium text-primary">
                {job?.company.name}
                <span className="text-[10px]">&#9679;</span>
                {job?.scope}
                <span className="text-[10px]">&#9679;</span>
                {job?.city}
                <span className="text-[10px]">&#9679;</span>
                {job?.location}
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold">Description</div>
            <div className="text-sm">{job?.description}</div>
          </div>
          <div>
            <div className="text-sm font-semibold">Periods</div>
            <div className="mt-1 flex flex-col gap-3 rounded-xl bg-primary">
              <div className="flex items-center gap-3 text-sm max-xs:flex-col max-xs:items-start xs:items-center">
                <div className="flex items-center gap-3 rounded-xl bg-secondary py-2 px-3">
                  <BsCalendarDateFill />
                  {job?.start_date.toString()}
                </div>
                to
                <div className="flex items-center gap-3 rounded-xl bg-secondary py-2 px-3">
                  <BsCalendarDateFill />
                  {job?.end_date.toString()}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold">Company</div>
            <div className="mt-1 flex flex-col gap-3 rounded-xl bg-secondary p-3">
              <div className="flex gap-3">
                <img
                  src={job?.company.logo as string}
                  alt="company image"
                  className="h-12 w-12 rounded-xl"
                />
                <div className="flex flex-col">
                  <div className="font-semibold">{job?.company.name}</div>
                  <div className="text-sm font-medium">{job?.company.url}</div>
                </div>
              </div>
              <div className="text-smline-clamp-3 text-sm line-clamp-3">
                {job?.company.description}
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold">Recruiter</div>
            <div
              onClick={handleNavigate}
              className="mt-1 flex cursor-pointer flex-col gap-3 rounded-xl bg-secondary p-3"
            >
              <div className="flex gap-3">
                <img
                  src={job?.user.photo as string}
                  alt="company image"
                  className="h-12 w-12 rounded-xl"
                />
                <div className="flex flex-col">
                  <div className="font-semibold">{job?.user.username}</div>
                  <div className="text-sm font-medium">
                    {job?.user.phone || job?.user.email}
                  </div>
                </div>
              </div>
              <div className="text-smline-clamp-3 text-sm line-clamp-3">
                {job?.user.introduction}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Job;
