"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

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
    <div className="min-h-screen bg-slate-400">
      {/* Breadcrumb */}
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Pemilik" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/Pemilik/Akun">Akun</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Pemilik</Breadcrumb.Item>
      </Breadcrumb>
      {/* Breadcrumb end */}
      {/* Table */}
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Data Pemilik</h2>
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
            {pemilikList.map((pemilik) => (
              <tr
                key={pemilik.id}
                className="hover:bg-gray-100 text-black bg-white"
              >
                <td className="border px-4 py-2 border-black">{pemilik.id}</td>
                <td className="border px-4 py-2 border-black">
                  {pemilik.username}
                </td>
                <td className="border px-4 py-2 border-black">
                  {pemilik.nama}
                </td>
                <td className="border px-4 py-2 border-black">
                  {pemilik.role}
                </td>
                <td className="border px-4 py-2 border-black">
                  {pemilik.no_telp}
                </td>
                <td className="border px-4 py-2 border-black">
                  {pemilik.alamat}
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
