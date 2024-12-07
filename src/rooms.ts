import { v4 as uuidv4 } from "uuid";
import { headquarters } from "./db/db.json";
// Function to generate random room name
const generateRoomName = (): string => {
  const types = ["Lounge", "Conference", "Meeting", "Office", "Storage"];
  const roomNumber = Math.floor(Math.random() * 100) + 1; // Random room number between 1 and 100
  const randomType = types[Math.floor(Math.random() * types.length)];

  return `${randomType} Room ${roomNumber}`;
};

// Function to generate random data for room (temperature, humidity, timestamp)
const generateRoomData = (
  numEntries: number
): { timestamp: string; temperature: number; humidity: number }[] => {
  const data = [];

  for (let i = 0; i < numEntries; i++) {
    const timestamp = new Date(
      Date.now() - Math.floor(Math.random() * 10000000000)
    ).toISOString();
    const temperature = Math.floor(Math.random() * (35 - 20 + 1)) + 20;
    const humidity = Math.floor(Math.random() * (80 - 30 + 1)) + 30;

    data.push({ timestamp, temperature, humidity });
  }

  return data;
};

// Function to generate room data with the desired format
const generateRoom = (
  headquarterId: string,
  numDataEntries: number
): object => {
  const roomId = uuidv4(); // Generate unique room ID
  const roomName = generateRoomName(); // Generate room name
  const data = generateRoomData(numDataEntries); // Generate room data with multiple entries

  return {
    id: roomId,
    headquarterId,
    name: roomName,
    data: data,
  };
};

// Example: Generate rooms for a given headquarterId
const generateRandomRooms = (
  headquarterId: string,
  numRooms: number,
  numDataEntries: number
) => {
  const rooms = [];
  for (let i = 0; i < numRooms; i++) {
    rooms.push(generateRoom(headquarterId, numDataEntries));
  }
  return rooms;
};

const rooms = headquarters
  .map((hq) =>
    generateRandomRooms(
      hq.id,
      Math.floor(Math.random() * 20),
      Math.floor(Math.random() * 30)
    )
  )
  .flatMap((room) => room); // Generate rooms for all headquarters

console.log("rooms", rooms); // Pretty print the result
