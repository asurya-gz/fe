import React, { useState, useEffect } from "react";
import axios from "axios";

const HasilPenjualanObat = () => {
  const [totalPendapatan, setTotalPendapatan] = useState(0);

  useEffect(() => {
    const fetchTotalPendapatanHariIni = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/datatransaksi"
        );
        const transaksiData = response.data.transaksi;

        const today = new Date();
        const months = [
          "Januari",
          "Februari",
          "Maret",
          "April",
          "Mei",
          "Juni",
          "Juli",
          "Agustus",
          "September",
          "Oktober",
          "November",
          "Desember",
        ];
        const formattedToday = `${today.getDate()} ${
          months[today.getMonth()]
        } ${today.getFullYear()}`;

        const transaksiHariIni = transaksiData.filter(
          (transaksi) => transaksi.tanggal === formattedToday
        );

        const totalPendapatanHariIni = transaksiHariIni.reduce(
          (total, transaksi) => total + parseFloat(transaksi.total_harga),
          0
        );

        setTotalPendapatan(totalPendapatanHariIni);
      } catch (error) {
        console.error("Error fetching total pendapatan:", error.message);
      }
    };

    fetchTotalPendapatanHariIni();
  }, []);

  return (
    <div>
      <h2>Total Pendapatan Hari Ini: Rp. {totalPendapatan}</h2>
    </div>
  );
};

export default HasilPenjualanObat;
