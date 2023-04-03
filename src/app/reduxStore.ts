import { configureStore } from "@reduxjs/toolkit";
import activeJobSlice from "../features/jobs/slices/activeJobSlice";
import filterSlice from "../features/jobs/slices/filterSlice";

const store = configureStore({
  reducer: {
    filter: filterSlice,
    activeJob: activeJobSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
