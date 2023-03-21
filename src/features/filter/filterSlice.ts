import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface filterSlice {
  filters: Array<any>;
  searchTerm: Array<string>;
}

type FilterItems = { tag: string; amount: number; active: boolean };

const initialState: filterSlice = {
  filters: [
    // Temporary values for testing!
    {
      name: "category 1",
      items: [
        { tag: "react", amount: 123, active: true },
        { tag: "ChakraUI", amount: 123, active: false },
        { tag: "tagname3", amount: 123, active: false },
      ],
    },
    {
      name: "category 2",
      items: [
        { tag: "tagname1", amount: 123, active: false },
        { tag: "tagname2", amount: 123, active: false },
        { tag: "tagname3", amount: 123, active: false },
      ],
    },
  ],
  searchTerm: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<any>) => {
      const curState =
        state.filters[action.payload.catIndex].items[action.payload.tagIndex]
          .active;
      state.filters[action.payload.catIndex].items[
        action.payload.tagIndex
      ].active = !curState;
    },
    clearAllFilters: (state) => {
      state.filters.forEach((category) =>
        category.items.forEach((item: FilterItems) => (item.active = false))
      );
    },
    clearFilterCategory: (
      state,
      action: PayloadAction<{ catIndex: number }>
    ) => {
      state.filters[action.payload.catIndex].items.forEach(
        (item: FilterItems) => (item.active = false)
      );
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload.trim().split(" ");
    },
    RemoveSearchTerm: (state) => {
      state.searchTerm = [];
    },
  },
});

export const {
  setFilter,
  clearAllFilters,
  clearFilterCategory,
  setSearchTerm,
  RemoveSearchTerm,
} = filterSlice.actions;
export default filterSlice.reducer;
