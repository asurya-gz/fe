// BarChart.js
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const BarChart = () => {
  const chartRef = useRef(null);
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/getalltransaksi"
        );
        const data = response.data;

        if (data.success) {
          setTransactionData(data.transaksiList);
        } else {
          console.error("Error fetching transaksi data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching transaksi data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const createBarChart = () => {
      const ctx = document.getElementById("barChart");
      const existingChart = chartRef.current;

      // Destroy the existing chart if it exists
      if (existingChart) {
        existingChart.destroy();
      }

      // Process the data to calculate total_harga for each month
      const monthlyData = transactionData.reduce((acc, transaction) => {
        const month = new Date(transaction.tanggal).getMonth() + 1; // Assuming 'tanggal' is a date property
        const totalHarga = parseFloat(transaction.total_harga);

        acc[month] = (acc[month] || 0) + totalHarga;
        return acc;
      }, {});

      // Sort the keys (months) in ascending order
      const sortedMonths = Object.keys(monthlyData).sort((a, b) => a - b);

      // Create a new bar chart using the processed data
      const newChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: sortedMonths.map((month) => `Bulan ke: ${month}`),
          datasets: [
            {
              label: "Pendapatan Obat",
              data: sortedMonths.map((month) => monthlyData[month]),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // Save the new chart instance to the ref
      chartRef.current = newChart;
    };

    createBarChart();
  }, [transactionData]);

  return (
    <div>
      <p className="mb-1">Contoh: 'Bulan ke: 1' = Januari</p>
      <canvas id="barChart" width="400" height="200"></canvas>
    </div>
  );
};

export default BarChart;
