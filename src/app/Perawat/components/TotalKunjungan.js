import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TotalKunjungan() {
  const [totalPasien, setTotalPasien] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/rmpasien_tgl"
        );
        const { rekam_medis } = response.data;

        setTotalPasien(rekam_medis.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="font-bold text-blue-800 text-xl opacity-70">
        {totalPasien}
      </p>
    </div>
  );
}
