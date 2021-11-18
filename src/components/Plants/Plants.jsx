import React from "react";
import { useDispatch } from "react-redux";
import {
  getPlantStatus,
  isResting,
  isStranded,
  isWatering,
} from "./plants.helper";
import { startWateringPlant, stopWateringPlant } from "./plants.slice";
import classNames from "./plants.module.css";
import clsx from "clsx";

export default function Plants({ plant }) {
  const dispatch = useDispatch();
  const { name, lastWateringEnd } = plant;
  const lastWateredDate = new Date(lastWateringEnd);

  const watering = isWatering(plant);
  const resting = isResting(plant);
  const stranded = isStranded(plant);

  const status = getPlantStatus(plant);

  const handleWatering = () => {
    if (!watering && !resting) {
      dispatch(startWateringPlant(plant));
    } else {
      dispatch(stopWateringPlant(plant));
    }
  };

  return (
    <div
      style={{
        border: "1px solid black",
        margin: "10px",
        padding: "10px",
        display: "flex",
      }}
    >
      <div>
        <h1>{name}</h1>
        <p>
          {`Last Watering Ended on - ${lastWateredDate.toLocaleDateString()} at ${lastWateredDate.toLocaleTimeString()}`}
        </p>
        <p
          className={clsx(
            classNames.status,
            watering && classNames.watering,
            resting && classNames.resting,
            stranded && classNames.stranded,
          )}
        >
          Status : {status}
        </p>
      </div>

      <div
        style={{
          flex: "1",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <button
          style={{
            backgroundColor: watering ? "red" : resting ? "#8f8f8f" : "green",
            color: "white",
            border: "none",
            padding: "10px",
            margin: "10px",
            borderRadius: "5px",
          }}
          disabled={resting}
          onClick={handleWatering}
        >
          {watering ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
}
