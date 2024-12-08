import { timeSeries } from "./db/db.json";

const generateHeadquarterName = (): string => {
  const adjectives = ["Alpha", "Beta", "Gamma", "Delta", "Omega", "Zeta"];
  const places = ["Center", "Hub", "Tower", "Park", "Base", "Station"];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomPlace = places[Math.floor(Math.random() * places.length)];

  return `${randomAdjective} ${randomPlace} HQ`;
};

const generateRoomName = (): string => {
  const types = ["Lounge", "Conference", "Meeting", "Office", "Storage"];
  const roomNumber = Math.floor(Math.random() * 100) + 1; // Random room number between 1 and 100
  const randomType = types[Math.floor(Math.random() * types.length)];

  return `${randomType} Room ${roomNumber}`;
};

// const allHeadquarters = headquarters.map((headquarter) => ({
//   ...headquarter,
//   name: generateHeadquarterName(),
// }));
// const allRooms = rooms.map((room) => ({
//   ...room,
//   name: generateRoomName(),
// }));

console.log(
  "allRooms",
  timeSeries.map((time, index) => ({
    id: time.id,
    roomId: time.roomId,
    name: `Time Series ${index + 1}`,
  }))
);
