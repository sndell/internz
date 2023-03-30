import { useAppDispatch, useAppSelector } from "../../../../app/reduxHooks";
import { updateFilter } from "../finder/filterSlice";

interface FilterDateProps {
  category: FilterCategory;
}

const FilterDate = ({ category }: FilterDateProps) => {
  const dispatch = useAppDispatch();
  const date = useAppSelector((state) => state.filter[category]);
  const dateOrder = useAppSelector(
    (state) =>
      state.filter[`${category}_order` as FilterCategory] as FilterDateOrder
  );

  console.log(category);

  return (
    <div className="flex justify-between">
      <input
        type="date"
        value={date ? date : ""}
        onChange={(e) =>
          dispatch(updateFilter({ category, value: e.target.value }))
        }
        className="h-10 rounded-xl bg-secondary px-2"
      />
      <select
        value={dateOrder}
        onChange={(e) =>
          dispatch(
            updateFilter({
              category: `${category}_order` as FilterCategory,
              value: e.target.value,
            })
          )
        }
        className="rounded-xl bg-secondary px-2"
      >
        <option value="before">before</option>
        <option value="on">on</option>
        <option value="after">after</option>
      </select>
    </div>
  );
};

export default FilterDate;
