export const isWatering = plant => {
  const lastWateringEndDate = new Date(plant.lastWateringEnd);
  const now = new Date();
  const diff = now.getTime() - lastWateringEndDate.getTime();
  return diff < 0;
};

export const isResting = plant => {
  const lastWateringEndDate = new Date(plant.lastWateringEnd);
  const now = new Date();
  const diff = now.getTime() - lastWateringEndDate.getTime();
  return diff > 0 && diff <= 1000 * 30;
};

export const isStranded = plant => {
  const lastWateringEndDate = new Date(plant.lastWateringEnd);
  const now = new Date();
  const diff = now.getTime() - lastWateringEndDate.getTime();
  return diff > 1000 * 60 * 60 * 6;
};

export const getPlantStatus = plant => {
  if (isWatering(plant)) {
    return "watering";
  } else if (isResting(plant)) {
    return "resting";
  } else if (isStranded(plant)) {
    // alert(
    //   `Plant ${plant.name} with ID ${plant.id} hasn't been watered for more than last 6 hours`,
    // );
    return "hasn't been watered for more than last 6 hours";
  } else {
    return "not started";
  }
};
