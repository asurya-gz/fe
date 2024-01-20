"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminAkunAkunRolePemilik() {
  const [pemilikList, setPemilikList] = useState([]);

  useEffect(() => {
    const fetchPemilikData = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/datapemilik"
        );
        console.log("Pemilik list:", response.data.pemilik);
        setPemilikList(response.data.pemilik);
      } catch (error) {
        console.error("Error fetching pemilik data:", error.message);
      }
    };

    fetchPemilikData();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Data Pemilik</h2>
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
          {pemilikList.map((pemilik) => (
            <tr key={pemilik.id}>
              <td className="border px-4 py-2">{pemilik.id}</td>
              <td className="border px-4 py-2">{pemilik.username}</td>
              <td className="border px-4 py-2">{pemilik.nama}</td>
              <td className="border px-4 py-2">{pemilik.role}</td>
              <td className="border px-4 py-2">{pemilik.no_telp}</td>
              <td className="border px-4 py-2">{pemilik.alamat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
