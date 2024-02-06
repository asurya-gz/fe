// CountingAnimation.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const CountingAnimation = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/getallpasien"
        ); // Adjust the endpoint accordingly
        const data = response.data;

        if (data.success) {
          const totalPasien = data.pasienList.length;
          const targetCount = totalPasien;
          const duration = 2000;
          const increment = Math.ceil(targetCount / (duration / 1000));

          const countingInterval = setInterval(() => {
            setCount((prevCount) => {
              const newCount = prevCount + increment;

              if (newCount >= targetCount) {
                clearInterval(countingInterval);
                return targetCount;
              }

              return newCount;
            });
          }, 20);

          // Clear the interval when the component unmounts
          return () => clearInterval(countingInterval);
        } else {
          console.error("Error fetching pasien data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching pasien data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-4xl font-bold mb-2 text-blue-800 transition-all duration-1000 ease-in-out">
        {count}
      </p>
      <p className="text-gray-600 text-sm opacity-70">Jumlah Pasien</p>
    </div>
  );
};

export default CountingAnimation;
