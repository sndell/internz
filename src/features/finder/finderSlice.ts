import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchFromDB } from "../../lib/operations";


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

const finderSlice = createSlice({
  name: "finder",
  initialState,
  reducers: {
    loadJobs: (state, action: PayloadAction<Array<any>>) => {
      state.jobs = action.payload;
    },
  },
});

export const { loadJobs } = finderSlice.actions;
export default finderSlice.reducer;
