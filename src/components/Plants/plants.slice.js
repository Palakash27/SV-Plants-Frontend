import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as plantsService from "../../services/plants.service";
import {
  getPlantStatus,
  isResting,
  isStranded,
  isWatering,
} from "./plants.helper";

let RESTING_SECONDS = 30;

export const fetchPlants = createAsyncThunk("plants/fetchPlants", () => {
  return plantsService.fetchPlants();
});

export const startWateringPlant = createAsyncThunk(
  "plants/startWateringPlant",
  plant => {
    return plantsService.startWateringPlant(plant);
  },
);

export const stopWateringPlant = createAsyncThunk(
  "plants/stopWateringPlant",
  plant => {
    return plantsService.stopWateringPlant(plant);
  },
);

const initialState = {
  plants: [],
};

export const plantsSlice = createSlice({
  name: "plants",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPlants.fulfilled, (state, action) => {
      state.plants = action.payload.map(plant => {
        const lastWateringEndDate = new Date(plant.lastWateringEnd);
        const now = new Date();
        const diff = now.getTime() - lastWateringEndDate.getTime();
        const diffSeconds = Math.floor(diff / 1000);
        let resting = isResting(plant);
        let secondsLeft = resting
          ? RESTING_SECONDS - Math.abs(diffSeconds)
          : Math.abs(diffSeconds);
        return {
          ...plant,
          watering: isWatering(plant),
          secondsLeft,
          resting,
          stranded: isStranded(plant),
          status: getPlantStatus(plant),
        };
      });
    });
  },
});
