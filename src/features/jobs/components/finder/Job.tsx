interface JobProps {
  job: Job;
}

const Job = ({ job }: JobProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-white p-3">
      <div className="flex gap-3">
        <img
          src={job.company.logo as string}
          className="h-12 w-12 shrink-0 rounded-xl"
        />
        <div className="grid-cols-[minmax(auto, max-content)] grid">
          <div>{job.position}</div>
          <div className="no-scrollbar flex items-center gap-2 overflow-x-scroll text-sm text-primary">
            {job.company.name}
            <span className="text-[10px]">&#9679;</span>
            {job.scope}
            <span className="text-[10px]">&#9679;</span>
            {job.city}
            <span className="text-[10px]">&#9679;</span>
            {job.location}
          </div>
        </div>
      </div>
      <div className="line-clamp-3 text-sm">{job.description}</div>
      <div className="flex flex-wrap gap-3">
        {job.tags.map((tag, index) => (
          <div
            className="rounded-xl bg-secondary px-3 py-2 text-sm"
            key={index}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Job;
