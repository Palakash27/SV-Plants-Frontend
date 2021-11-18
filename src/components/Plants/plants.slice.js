import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as plantsService from "../../services/plants.service";
import {
  getPlantStatus,
  isResting,
  isStranded,
  isWatering,
} from "./plants.helper";

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
      state.plants = action.payload.map(plant => ({
        ...plant,
        watering: isWatering(plant),
        resting: isResting(plant),
        stranded: isStranded(plant),
        status: getPlantStatus(plant),
      }));
    });
  },
});
