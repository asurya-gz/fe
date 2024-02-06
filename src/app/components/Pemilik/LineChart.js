// LineChart.js
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const LineChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/jumlahpasienperbulan"
        );
        const data = response.data;

        if (data.success) {
          // Sort monthly data by 'bulan' before setting it
          const sortedData = data.jumlah_pasien_per_bulan.sort(
            (a, b) => a.bulan - b.bulan
          );
          setMonthlyData(sortedData);
        } else {
          console.error("Error fetching jumlah pasien per bulan:", data.error);
        }
      } catch (error) {
        console.error("Error fetching jumlah pasien per bulan:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const createLineChart = () => {
      const ctx = document.getElementById("lineChart");
      const existingChart = ctx.chart;

      // Destroy the existing chart if it exists
      if (existingChart) {
        existingChart.destroy();
      }

      // Create a new line chart using the fetched data
      const newChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: monthlyData.map((data) => `Bulan ${data.bulan}`),
          datasets: [
            {
              label: "Kunjungan Pasien",
              data: monthlyData.map((data) => data.jumlah_pasien),
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
              fill: false,
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
      ctx.chart = newChart;
    };

    createLineChart();
  }, [monthlyData]);

  return (
    <div>
      <canvas id="lineChart" width="400" height="200"></canvas>
    </div>
  );
};

export default LineChart;
