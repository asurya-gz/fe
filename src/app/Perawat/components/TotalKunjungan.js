import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TotalKunjungan() {
  const [totalPasien, setTotalPasien] = useState(0);
  const [rekamMedisHariIni, setRekamMedisHariIni] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/rmpasien"
        ); // Adjust the endpoint as per your backend route
        const { rekam_medis } = response.data;

        // Filter rekam medis dimana tanggal kunjungan adalah hari ini
        const hariIni = new Date().toISOString().split("T")[0]; // Mendapatkan tanggal hari ini dalam format YYYY-MM-DD
        console.log("Data dari server:", rekam_medis);
        const rekamMedisHariIni = rekam_medis.filter(
          (item) => item.tanggal_kunjungan.split("T")[0] === hariIni
        );
        console.log("Data setelah filter:", rekamMedisHariIni);

        setRekamMedisHariIni(rekamMedisHariIni);
        setTotalPasien(rekamMedisHariIni.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="font-bold text-blue-800 text-xl opacity-70">
        {totalPasien}
      </p>
    </div>
  );
}
