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
  const [relayStatus, setRelayStatus] = useState<boolean>(false);
  const [LED1Status, setLED1Status] = useState<boolean>(false);
  const [LED2Status, setLED2Status] = useState<boolean>(false);

  // Mengambil data dari Firebase secara real-time
  useEffect(() => {
    const sensorRef = ref(database, "tubes3");

    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData({
          temperature: data.temperature || 0,
          humidity: data.humidity || 0,
          distance: data.distance || 0,
          relayStatus: data.relayStatus || false,
          led1Status: data.led1Status || false,
          led2Status: data.led2Status || false,
        });

        // Update relayStatus berdasarkan data dari Firebase
        setRelayStatus(data.relayStatus || false);
        setLED1Status(data.led1Status || false);
        setLED2Status(data.led2Status || false);
      }
    });
  }, []);

  // Menangani toggle status relay
  const handleToggleRelay = async () => {
    const newStatus = !relayStatus;
    setRelayStatus(newStatus);

    // Update status relay ke Firebase
    try {
      await set(ref(database, "tubes3/relayStatus"), newStatus);
      console.log(`Relay status updated to: ${newStatus ? "ON" : "OFF"}`);
    } catch (error) {
      console.error("Failed to update relay status:", error);
    }
  };

  // Menangani toggle status LED1
  const handleToggleLED1 = async () => {
    const newStatus = !LED1Status;

    try {
      // Update status LED1 ke Firebase
      await set(ref(database, "tubes3/led1Status"), newStatus);
      console.log(`LED 1 updated to: ${newStatus ? "ON" : "OFF"}`);
      setLED1Status(newStatus); // Update status di UI hanya jika berhasil
    } catch (error) {
      console.error("Failed to update LED 1 status:", error);
    }
  };

  // Menangani toggle status LED2
  const handleToggleLED2 = async () => {
    const newStatus = !LED2Status;

    try {
      // Update status LED2 ke Firebase
      await set(ref(database, "tubes3/led2Status"), newStatus);
      console.log(`LED 2 updated to: ${newStatus ? "ON" : "OFF"}`);
      setLED2Status(newStatus); // Update status di UI hanya jika berhasil
    } catch (error) {
      console.error("Failed to update LED 2 status:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">EL3012 Sismik - IOT</h1>
      <h1 className="text-xl font-bold mb-4">13222062 - 13222053</h1>

      <div className="my-16 bg-blue-600 text-white rounded-lg py-4">
        <h2 className="text-lg font-semibold">
          Temperature: {sensorData?.temperature} °C
        </h2>
        <h2 className="text-lg font-semibold">
          Humidity: {sensorData?.humidity} %
        </h2>
        <h2 className="text-lg font-semibold">
          Distance: {sensorData?.distance} cm
        </h2>
      </div>

      <button
        onClick={handleToggleRelay}
        className={`px-6 py-3 rounded-lg text-white ${
          relayStatus ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {relayStatus ? "Turn OFF Fan" : "Turn ON Fan"}
      </button>

      <div className="mt-2">
        <h2 className="text-xl font-semibold">
          Relay Status: {sensorData?.relayStatus ? "ON" : "OFF"}
        </h2>
      </div>
      <div className="flex justify-between items-center space-x-4 text-sm">
        <button
          onClick={handleToggleLED1}
          className={`mt-8 px-4 py-2 rounded-lg text-white transition-all duration-300 ${
            LED1Status
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {LED1Status ? "Turn OFF LED 1" : "Turn ON LED 1"}
        </button>
        <button
          onClick={handleToggleLED2}
          className={`mt-8 px-4 py-2 rounded-lg text-white transition-all duration-300 ${
            LED2Status
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {LED2Status ? "Turn OFF LED 2" : "Turn ON LED 2"}
        </button>
      </div>
    </div>
  );
}
