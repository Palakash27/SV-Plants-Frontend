import { configureStore } from "@reduxjs/toolkit";
import { plantsSlice } from "./components/Plants/plants.slice";

export const store = configureStore({
  reducer: {
    plants: plantsSlice.reducer,
  },
});
