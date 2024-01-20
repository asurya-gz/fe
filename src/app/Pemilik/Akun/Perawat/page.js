"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PemilikAkunPerawat() {
  const [perawatList, setPerawatList] = useState([]);

  useEffect(() => {
    const fetchPerawatData = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/dataperawat"
        );
        console.log("Perawat list:", response.data.perawat);
        setPerawatList(response.data.perawat);
      } catch (error) {
        console.error("Error fetching perawat data:", error.message);
      }
    };

    fetchPerawatData();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Data Perawat</h2>
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
          {perawatList.map((perawat) => (
            <tr key={perawat.id}>
              <td className="border px-4 py-2">{perawat.id}</td>
              <td className="border px-4 py-2">{perawat.username}</td>
              <td className="border px-4 py-2">{perawat.nama}</td>
              <td className="border px-4 py-2">{perawat.role}</td>
              <td className="border px-4 py-2">{perawat.no_telp}</td>
              <td className="border px-4 py-2">{perawat.alamat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
