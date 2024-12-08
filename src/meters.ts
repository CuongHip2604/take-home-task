import { v4 as uuidv4 } from "uuid";
import { headquarters, rooms } from "./db/db.json";

console.log("rooms", rooms);

// Function to generate random meter name
const generateMeterName = (): string => {
  return `Meter-${uuidv4().substring(0, 8)}`; // Random meter name with unique ID part
};

// Function to generate random meter data (energyConsumption, cost, timestamp)
const generateMeterData = (
  numEntries: number
): { timestamp: string; energyConsumption: number; cost: number }[] => {
  const data = [];

  for (let i = 0; i < numEntries; i++) {
    const timestamp = new Date(
      Date.now() - Math.floor(Math.random() * 10000000000)
    ).toISOString();
    const energyConsumption = (Math.random() * (200 - 100) + 100).toFixed(2); // Random energy consumption between 100 and 200
    const cost = Math.floor(Math.random() * (500 - 200 + 1)) + 200; // Random cost between 200 and 500

    data.push({
      timestamp,
      energyConsumption: parseFloat(energyConsumption),
      cost,
    });
  }

  return data;
};

// Function to generate meter data with the desired format
const generateMeter = (headquarterId: string): object => {
  const meterId = uuidv4(); // Generate unique meter ID
  const meterName = generateMeterName(); // Generate meter name

  const createdAt = new Date(
    Date.now() - Math.floor(Math.random() * 10000000000)
  ).toISOString(); // Random createdAt timestamp

  return {
    id: meterId,
    headquarterId,
    name: meterName,
    createdAt,
  };
};

// Example: Generate meters for a given headquarterId
const generateRandomMeters = (headquarterId: string, numMeters: number) => {
  const meters = [];
  for (let i = 0; i < numMeters; i++) {
    meters.push(generateMeter(headquarterId));
  }
  return meters;
};

// Example usage
const meters = headquarters
  .map((hq) => generateRandomMeters(hq.id, Math.floor(Math.random() * 5)))
  .flatMap((meter) => meter); // Generate 5 meters for this HQ, each with 2 data entries

console.log("meters", meters); // Pretty print the result
