"use client";
import { useEffect, useState } from "react";
import { database, ref, onValue, set } from "@/lib/firebase";

type SensorData = {
  temperature: number;
  humidity: number;
  distance: number;
  relayStatus: boolean;
  led1Status: boolean;
  led2Status: boolean;
};

export default function Home() {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);

  useEffect(() => {
    const sensorRef = ref(database, "tubes3");
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData(data);
      }
    });
  }, []);

  const toggleStatus = async (key: keyof SensorData) => {
    if (!sensorData) return;

    const newStatus = !sensorData[key];
    try {
      await set(ref(database, `tubes3/${key}`), newStatus);
      setSensorData((prev) => (prev ? { ...prev, [key]: newStatus } : prev));
    } catch (error) {
      console.error(`Failed to update ${key} status:`, error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">SISMIK IoT Dashboard</h1>
        <h2 className="text-lg text-gray-600 mt-2">M. Gabriel - Tiffany Angel</h2>
      </header>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
            T
          </div>
          <h3 className="text-xl font-bold">Temperature</h3>
          <p className="text-2xl text-gray-800">{sensorData?.temperature} °C</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
            H
          </div>
          <h3 className="text-xl font-bold">Humidity</h3>
          <p className="text-2xl text-gray-800">{sensorData?.humidity} %</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
            D
          </div>
          <h3 className="text-xl font-bold">Distance</h3>
          <p className="text-2xl text-gray-800">{sensorData?.distance} cm</p>
        </div>
      </div>

      <div className="grid gap-6 mt-8 grid-cols-1 md:grid-cols-3">
        <button
          onClick={() => toggleStatus("relayStatus")}
          className={`p-6 rounded-lg shadow-md text-white text-center transition-colors ${
            sensorData?.relayStatus ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <div className="w-12 h-12 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-black text-xl font-bold">
            F
          </div>
          <h3 className="text-lg font-bold">
            {sensorData?.relayStatus ? "Turn OFF Fan" : "Turn ON Fan"}
          </h3>
        </button>

        <button
          onClick={() => toggleStatus("led1Status")}
          className={`p-6 rounded-lg shadow-md text-white text-center transition-colors ${
            sensorData?.led1Status ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <div className="w-12 h-12 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-black text-xl font-bold">
            L1
          </div>
          <h3 className="text-lg font-bold">
            {sensorData?.led1Status ? "Turn OFF LED 1" : "Turn ON LED 1"}
          </h3>
        </button>

        <button
          onClick={() => toggleStatus("led2Status")}
          className={`p-6 rounded-lg shadow-md text-white text-center transition-colors ${
            sensorData?.led2Status ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <div className="w-12 h-12 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-black text-xl font-bold">
            L2
          </div>
          <h3 className="text-lg font-bold">
            {sensorData?.led2Status ? "Turn OFF LED 2" : "Turn ON LED 2"}
          </h3>
        </button>
      </div>
    </div>
  );
}
