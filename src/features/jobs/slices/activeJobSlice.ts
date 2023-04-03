import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: JobSlice = {
  job: null,
};

export const activeJobSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveJob: (state, action: PayloadAction<Job>) => {
      state.job = action.payload;
    },
    clearActiveJob: (state) => {
      state.job = null;
    },
  },
});

export const { setActiveJob, clearActiveJob } = activeJobSlice.actions;
export default activeJobSlice.reducer;
