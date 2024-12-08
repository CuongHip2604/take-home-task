import { v4 as uuidv4 } from "uuid";
import { electricityMeters, timeSeries } from "./db/db.json";

const generateTimestamp = (length: number) => {
  const timestampTable = [];
  const startDate = new Date("2024-11-01T00:00:00.000Z");

  for (let i = 0; i < length; i++) {
    const newTimestamp = new Date(startDate);
    newTimestamp.setDate(startDate.getDate() + i);
    timestampTable.push({
      id: uuidv4(),
      timestamp: newTimestamp.toISOString(),
      temperature: parseFloat((Math.random() * 10 + 20).toFixed(2)), // Nhiệt độ ngẫu nhiên từ 20 - 30
      humidity: parseFloat((Math.random() * 30 + 30).toFixed(2)), // Độ ẩm ngẫu nhiên từ 30 - 60
      energyConsumption: parseFloat((Math.random() * 100 + 50).toFixed(2)), // Tiêu thụ năng lượng từ 50 - 150
      cost: parseFloat((Math.random() * 500).toFixed(2)), // Chi phí ngẫu nhiên từ 0 - 500
    });
  }

  return timestampTable;
};

const allTimestamps = timeSeries.map((time) => ({
  ...time,
  data: generateTimestamp(Math.ceil(Math.random() * 30)),
  electricityMeterId:
    electricityMeters[Math.floor(Math.random() * electricityMeters.length)].id,
}));

console.log("allTimestamps", allTimestamps);
