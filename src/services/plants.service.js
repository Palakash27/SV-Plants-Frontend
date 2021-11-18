export const fetchPlants = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/plants`);
  const json = await res.json();
  console.log(json);
  return json;
};

export const startWateringPlant = async ({ id }) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/api/plants/${id}/start-watering`,
    {
      method: "PUT",
    },
  );
  const json = await res.json();
  console.log(json);
  return json;
};

export const stopWateringPlant = async ({ id }) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/api/plants/${id}/stop-watering`,
    {
      method: "PUT",
    },
  );
  const json = await res.json();
  console.log(json);
  return json;
};
