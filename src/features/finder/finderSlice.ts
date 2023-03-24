import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FinderState {
  jobs: Array<any>;
}

const initialState: FinderState = {
  jobs: [{
    companyName: "Google",
    companyIcon: "google.png",
    title: "Full Stack Developer",
    desc: "In this position you will be working with a senior FS developer",
    tags: ["Javascript", "React", "Firebase", "Chakra UI"],
},
{
    companyName: "Google",
    companyIcon: "google.png",
    title: "Full Stack Developer",
    desc: "In this position you will be working with a senior FS developer",
    tags: ["Javascript", "React", "Firebase", "Chakra UI"],
},
{
    companyName: "Google",
    companyIcon: "google.png",
    title: "Full Stack Developer",
    desc: "In this position you will be working with a senior FS developer",
    tags: ["Javascript", "React", "Firebase", "Chakra UI"],
},],
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
