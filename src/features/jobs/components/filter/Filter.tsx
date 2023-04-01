import { motion } from "framer-motion";
import FilterCategory from "./Category";

interface FilterProps {
  filters: Filters | null;
}

const Filter = ({ filters }: FilterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "fit-content" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden rounded-xl bg-white"
    >
      <div className="flex items-center justify-between p-3">
        <div className="flex gap-2 text-primary">
          <div>Filters</div>
          <div className="grid place-content-center rounded-md bg-secondary px-1 text-sm">
            0
          </div>
        </div>
        <button className="text-blue-400">Clear all</button>
      </div>
      {filters?.tags && (
        <FilterCategory
          category="tags"
          title="Tags"
          mode="checkbox"
          options={filters.tags}
        />
      )}
      {filters?.cities && (
        <FilterCategory
          category="locations"
          title="Location"
          mode="checkbox"
          options={filters.cities}
        />
      )}
      <FilterCategory category="start_date" title="Start date" mode="date" />
      <FilterCategory category="end_date" title="End date" mode="date" />
    </motion.div>
  );
};

export default Filter;
