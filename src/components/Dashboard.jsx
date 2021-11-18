import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Plants from "./Plants/Plants";
import { fetchPlants } from "./Plants/plants.slice";

export default function Dashboard() {
  const { plants } = useSelector(state => state.plants);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlants());
    setInterval(() => {
      dispatch(fetchPlants());
    }, 1000);
  }, [dispatch]);

  return (
    <div>
      {plants && plants.map(plant => <Plants plant={plant} key={plant.id} />)}
    </div>
  );
}
