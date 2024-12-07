import { v4 as uuidv4 } from "uuid";
import { headquarters } from "./db/db.json";

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
const generateMeter = (
  headquarterId: string,
  numDataEntries: number
): object => {
  const meterId = uuidv4(); // Generate unique meter ID
  const meterName = generateMeterName(); // Generate meter name
  const data = generateMeterData(numDataEntries); // Generate meter data with multiple entries

  return {
    id: meterId,
    headquarterId,
    name: meterName,
    data: data,
  };
};

// Example: Generate meters for a given headquarterId
const generateRandomMeters = (
  headquarterId: string,
  numMeters: number,
  numDataEntries: number
) => {
  const meters = [];
  for (let i = 0; i < numMeters; i++) {
    meters.push(generateMeter(headquarterId, numDataEntries));
  }
  return meters;
};

// Example usage
const meters = headquarters
  .map((hq) =>
    generateRandomMeters(
      hq.id,
      Math.floor(Math.random() * 20),
      Math.floor(Math.random() * 30)
    )
  )
  .flatMap((meter) => meter); // Generate 5 meters for this HQ, each with 2 data entries

console.log("meters", meters); // Pretty print the result
