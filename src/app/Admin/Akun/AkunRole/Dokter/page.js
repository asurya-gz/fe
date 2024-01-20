"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

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

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Data Dokter</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">No. Telepon</th>
            <th className="px-4 py-2">Alamat</th>
          </tr>
        </thead>
        <tbody>
          {dokterList.map((dokter) => (
            <tr key={dokter.id}>
              <td className="border px-4 py-2">{dokter.id}</td>
              <td className="border px-4 py-2">{dokter.username}</td>
              <td className="border px-4 py-2">{dokter.nama}</td>
              <td className="border px-4 py-2">{dokter.role}</td>
              <td className="border px-4 py-2">{dokter.no_telp}</td>
              <td className="border px-4 py-2">{dokter.alamat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
