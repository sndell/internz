import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: FilterSlice = {
  tags: [],
  search: "",
  locations: [],
  start_date: null,
  start_date_order: "after",
  end_date: null,
  end_date_order: "after",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter: (
      state,
      action: PayloadAction<{
        category: FilterCategory;
        value: string | string[] | FilterDateOrder | null;
      }>
    ) => {
      const { category, value } = action.payload;
      if (Array.isArray(state[category])) {
        const categoryArray = state[category] as string[];
        const index = categoryArray.indexOf(value as string);

        if (index !== -1) categoryArray.splice(index, 1);
        else categoryArray.push(value as string);
      } else {
        (state as any)[category] = value;
      }
    },
  },
});

export const { updateFilter } = filterSlice.actions;
export default filterSlice.reducer;
