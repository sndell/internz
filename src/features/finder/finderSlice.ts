
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector, useAppDispatch } from "../../app/reduxHooks";
import { fetchFromDB } from "../../lib/operations";
import { setFilter } from "../filter/filterSlice";


export interface FinderState {
  jobs: Array<any>;
}

    /* const cards: any  = fetchFromDB().then((listings: Array<any>) => {
        console.log(typeof(listings[0].companyName))
        return listings
    }) */
    

const initialState: FinderState = {
  jobs: [],
};
const filterArray = useAppSelector((state) => state.filter.filters);
// const dispatch = useAppDispatch();


const finderSlice = createSlice({
  name: "finder",
  initialState,
  reducers: {
    loadJobs: (state, action: PayloadAction<Array<any>>) => {
      state.jobs = action.payload;
    },
  },
});

// dispatch(setFilter(filterArray))

export const { loadJobs } = finderSlice.actions;
export default finderSlice.reducer;
