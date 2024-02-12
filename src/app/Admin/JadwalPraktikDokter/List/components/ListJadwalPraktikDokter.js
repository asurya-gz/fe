"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ListJadwalPraktikDokter = () => {
  const [jadwalPraktik, setJadwalPraktik] = useState([]);

  // Print
  const handlePrint = async () => {
    try {
      // Fetch the list of jadwal praktik dokter before printing
      const response = await axios.get(
        "https://bekk.up.railway.app/jadwal-praktik"
      );
      const jadwalPraktikListForPrint = response.data;

      // Open a new window for printing
      const printWindow = window.open("", "_blank");

      // Create a print document
      const printDocument = printWindow.document;

      // Add your table content to the print document with inline styles
      printDocument.write(`
      <html>
        <head>
          <title>List Jadwal Praktik Dokter</title>
        </head>
        <body style="
          font-family: Arial, sans-serif;
        ">
        <img src="/kop.png" alt="Letterhead" style="width: 100%; max-height: 150px; object-fit: cover; margin-bottom: 5px;">
          <h1 style="text-align: center;">List Jadwal Praktik Dokter</h1>
          <div style="
            width: 100%;
            border-collapse: collapse;
            margin-top: 1em;
            overflow-x: auto;
          ">
            <table style="
              width: 100%;
              border-collapse: collapse;
            ">
              <thead>
                <tr style="
                  background-color: #333;
                  color: white;
                ">
                  <th style="
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                  ">
                    Nama Dokter
                  </th>
                  <th style="
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                  ">
                    Hari
                  </th>
                  <th style="
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                  ">
                    Jam Mulai
                  </th>
                  <th style="
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                  ">
                    Jam Selesai
                  </th>
                </tr>
              </thead>
              <tbody>
                ${jadwalPraktikListForPrint
                  .map(
                    (jadwal) => `
                      <tr style="
                        background-color: #fff;
                      ">
                        <td style="
                          border: 1px solid #ddd;
                          padding: 8px;
                          text-align: left;
                        ">${jadwal.nama_dokter}</td>
                        <td style="
                          border: 1px solid #ddd;
                          padding: 8px;
                          text-align: left;
                        ">${jadwal.hari}</td>
                        <td style="
                          border: 1px solid #ddd;
                          padding: 8px;
                          text-align: left;
                        ">${jadwal.jam_mulai}</td>
                        <td style="
                          border: 1px solid #ddd;
                          padding: 8px;
                          text-align: left;
                        ">${jadwal.jam_selesai}</td>
                      </tr>
                    `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `);

      // Close the document and initiate printing
      printDocument.close();
      printWindow.print();
    } catch (error) {
      console.error(
        "Error fetching jadwal praktik dokter list for printing:",
        error.message
      );
    }
  };
  // Print end

  useEffect(() => {
    axios
      .get("https://bekk.up.railway.app/jadwal-praktik")
      .then((response) => {
        setJadwalPraktik(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jadwal praktik dokter:", error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold my-4 text-blue-800">
        List Jadwal Praktik Dokter
      </h1>
      <button onClick={handlePrint} className="p-2 rounded bg-amber-400 mb-4">
        Cetak Jadwal
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Nama Dokter
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Hari
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Jam Mulai
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Jam Selesai
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jadwalPraktik.map((jadwal, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {jadwal.nama_dokter}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{jadwal.hari}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {jadwal.jam_mulai}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {jadwal.jam_selesai}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListJadwalPraktikDokter;
