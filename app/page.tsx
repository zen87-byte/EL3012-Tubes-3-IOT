"use client";
import { useState, useEffect } from "react";
import { database, ref, onValue, set } from "@/lib/firebase";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center w-full">
      <nav className="mt-4 px-5 py-2 flex items-center justify-between w-full text-black">
        <div className="greeting flex flex-col">
          <p className="text-xl font-semibold">EL3012-IOT</p>
          <p className="text-sm">13222002 - 13222008</p>
        </div>
        <div
          className="menu-icon space-y-1 cursor-pointer"
          onClick={() => console.log("Menu clicked")}
        >
          <span className="block h-0.5 w-6 bg-black"></span>
          <span className="block h-0.5 w-6 bg-black"></span>
          <span className="block h-0.5 w-6 bg-black"></span>
        </div>
      </nav>

      <div className="flex flex-col items-center gap-10 lg:gap-20 mt-16 w-full">
        <div className="temperature-container flex flex-col items-center justify-center w-64 h-64 rounded-full shadow-lg bg-black text-white">
          <p className="text-5xl flex">
            <span id="temperature">{sensorData?.temperature}</span>
            <span className="ml-1">&deg;C</span>
          </p>
          <p className="text-md sm:text-md mt-2">
            <span className="font-medium">Humidity:</span>
            <span className="ml-2" id="humidity">
              {sensorData?.humidity}
            </span>
            <span className="ml-1">%</span>
          </p>
          <p className="text-md sm:text-4xl flex">
            <span id="temperature">{sensorData?.distance}</span>
            <span className="ml-1">cm</span>
          </p>
        </div>
        <div className="w-full space-y-4 p-4">
          <div className="title flex justify-between items-center p-3 rounded-lg border border-white shadow-lg w-full bg-white">
            <div className="name">
              <p className="text-md font-medium text-black">Fan</p>
            </div>
            <div className="tombol">
              <button
                id="tombol"
                onClick={handleToggleRelay}
                className={`w-12 h-6 text-sm rounded-full ${
                  relayStatus ? "bg-black" : "bg-gray-700"
                } text-white focus:outline-none transition-colors duration-300 ease-in-out`}
              >
                {relayStatus ? "ON" : "OFF"}
              </button>
            </div>
          </div>

          <div className="title flex justify-between items-center p-3 rounded-lg border border-white shadow-lg w-full bg-white">
            <div className="name">
              <p className="text-md font-medium text-black">LED 1</p>
            </div>
            <div className="tombol">
              <button
                id="tombol"
                onClick={handleToggleLED1}
                className={`w-12 h-6 text-sm rounded-full ${
                  relayStatus ? "bg-black" : "bg-gray-700"
                } text-white focus:outline-none transition-colors duration-300 ease-in-out`}
              >
                {LED1Status ? "ON" : "OFF"}
              </button>
            </div>
          </div>

          <div className="title flex justify-between items-center p-3 rounded-lg border border-white shadow-lg w-full bg-white">
            <div className="name">
              <p className="text-md font-medium text-black">LED 2</p>
            </div>
            <div className="tombol">
              <button
                id="tombol"
                onClick={handleToggleLED2}
                className={`w-12 h-6 text-sm rounded-full ${
                  relayStatus ? "bg-black" : "bg-gray-700"
                } text-white focus:outline-none transition-colors duration-300 ease-in-out`}
              >
                {LED2Status ? "ON" : "OFF"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
