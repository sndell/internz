import { useEffect, useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../../../app/reduxHooks";
import { updateFilter } from "../../slices/filterSlice";

interface FilterCheckboxProps {
  name: string;
  category: FilterCategory;
}

const FilterCheckbox = ({ category, name }: FilterCheckboxProps) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  const options = useAppSelector((state) => state.filter[category] as string[]);

  const handleChange = () => {
    dispatch(updateFilter({ category, value: name }));
  };

  useEffect(() => {
    if (options.includes(name)) setChecked(true);
    else setChecked(false);
  }, [options]);

  return (
    <label
      htmlFor={name}
      className="flex items-center gap-2 rounded-xl bg-secondary py-2 px-3"
    >
      <div className="relative grid h-4 w-4 place-items-center">
        <input
          id={name}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="peer absolute h-full w-full appearance-none rounded-[4px] bg-tertiary transition-colors duration-200 checked:bg-accnet"
        />
        <IoCheckmark className="aboslute pointer-events-none z-10 hidden text-xs text-white peer-checked:block" />
      </div>
      {name}
    </label>
  );
};

export default FilterCheckbox;
