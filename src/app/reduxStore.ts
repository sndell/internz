import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "../features/jobs/components/finder/filterSlice";

const store = configureStore({
  reducer: {
    filter: filterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
