export const fetchPlants = async () => {
  const res = await fetch("http://192.168.1.92:5032/api/plants");
  const json = await res.json();
  console.log(json);
  return json;
};

export const startWateringPlant = async ({ id }) => {
  const res = await fetch(
    `http://192.168.1.92:5032/api/plants/${id}/start-watering`,
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
    `http://192.168.1.92:5032/api/plants/${id}/stop-watering`,
    {
      method: "PUT",
    },
  );
  const json = await res.json();
  console.log(json);
  return json;
};
