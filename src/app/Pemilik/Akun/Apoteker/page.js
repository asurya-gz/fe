"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PemilikAkunApoteker() {
  const [apotekerList, setApotekerList] = useState([]);

  useEffect(() => {
    const fetchApotekerData = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/dataapoteker"
        );
        console.log("Apoteker list:", response.data.apoteker);
        setApotekerList(response.data.apoteker);
      } catch (error) {
        console.error("Error fetching apoteker data:", error.message);
      }
    };

    fetchApotekerData();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Data Apoteker</h2>
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
          {apotekerList.map((apoteker) => (
            <tr key={apoteker.id}>
              <td className="border px-4 py-2">{apoteker.id}</td>
              <td className="border px-4 py-2">{apoteker.username}</td>
              <td className="border px-4 py-2">{apoteker.nama}</td>
              <td className="border px-4 py-2">{apoteker.role}</td>
              <td className="border px-4 py-2">{apoteker.no_telp}</td>
              <td className="border px-4 py-2">{apoteker.alamat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
