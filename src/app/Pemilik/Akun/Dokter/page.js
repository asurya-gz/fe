"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export default function PemilikAkunDokter() {
  const [dokterList, setDokterList] = useState([]);

  useEffect(() => {
    const fetchDokterData = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/datadokter"
        );
        console.log("Dokter list:", response.data.dokter);
        setDokterList(response.data.dokter);
      } catch (error) {
        console.error("Error fetching dokter data:", error.message);
      }
    };

    fetchDokterData();
  }, []);

  const handlePrintDokter = () => {
    const printWindow = window.open("", "_blank");
    const printDocument = printWindow.document;

    printDocument.write(`
      <html>
        <head>
          <title>Data Dokter</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 20px;
            }
            h2 {
              color: #333;
              border-bottom: 2px solid #333;
              padding-bottom: 10px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: left;
            }
            th {
              background-color: #333;
              color: white;
            }
            tr:nth-child(even) {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h2>Data Dokter</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Nama</th>
                <th>Role</th>
                <th>No. Telepon</th>
                <th>Alamat</th>
              </tr>
            </thead>
            <tbody>
              ${dokterList
                .map(
                  (dokter) => `
                  <tr>
                    <td>${dokter.id || " "}</td>
                    <td>${dokter.username || " "}</td>
                    <td>${dokter.nama || " "}</td>
                    <td>${dokter.role || " "}</td>
                    <td>${dokter.no_telp || " "}</td>
                    <td>${dokter.alamat || " "}</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `);

    printDocument.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-slate-400">
      {/* Breadcrumb */}
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Pemilik" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/Pemilik/Akun">Akun</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Dokter</Breadcrumb.Item>
      </Breadcrumb>
      {/* Breadcrumb end */}

      {/* Table */}
      <div className="mt-4 mx-4 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4 text-white">Data Dokter</h2>
        <button
          onClick={handlePrintDokter}
          className="p-2 bg-amber-400 rounded my-4"
        >
          Cetak Data
        </button>
        <table className="min-w-full table-auto border-collapse border border-blue-800">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="px-4 py-2 border border-blue-800">ID</th>
              <th className="px-4 py-2 border border-blue-800">Username</th>
              <th className="px-4 py-2 border border-blue-800">Nama</th>
              <th className="px-4 py-2 border border-blue-800">Role</th>
              <th className="px-4 py-2 border border-blue-800">No. Telepon</th>
              <th className="px-4 py-2 border border-blue-800">Alamat</th>
            </tr>
          </thead>
          <tbody>
            {dokterList.map((dokter) => (
              <tr
                key={dokter.id}
                className="hover:bg-gray-100 text-black bg-white"
              >
                <td className="border px-4 py-2 border-black">{dokter.id}</td>
                <td className="border px-4 py-2 border-black">
                  {dokter.username}
                </td>
                <td className="border px-4 py-2 border-black">{dokter.nama}</td>
                <td className="border px-4 py-2 border-black">{dokter.role}</td>
                <td className="border px-4 py-2 border-black">
                  {dokter.no_telp}
                </td>
                <td className="border px-4 py-2 border-black">
                  {dokter.alamat}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Table end */}
    </div>
  );
}
