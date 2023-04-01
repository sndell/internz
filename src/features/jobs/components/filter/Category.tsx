import FilterCheckbox from "./CategoryCheckbox";
import FilterDate from "./CategoryDate";

interface FilterCategoryProps {
  mode?: "checkbox" | "date";
  options?: string[];
  category: FilterCategory;
  title: string;
}

const FilterCategory = ({
  category,
  title,
  mode = "checkbox",
  options = [],
}: FilterCategoryProps) => {
  if (mode === "checkbox")
    return (
      <div className="flex flex-col gap-1 p-3">
        <div className="flex justify-between">
          <div className="flex gap-2 text-sm font-semibold text-primary">
            {title}
          </div>
          <button className="text-blue-400">Clear</button>
        </div>
        <div className="flex flex-col gap-2">
          {options.map((filter, index) => (
            <FilterCheckbox category={category} name={filter} key={index} />
          ))}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-2 p-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 text-sm font-semibold text-primary">
          {title}
        </div>
        <button className="text-blue-400">Clear</button>
      </div>
      <FilterDate category={category} />
    </div>
  );
};

export default FilterCategory;
