"use client";
import React, { useState, useEffect } from "react";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import axios from "axios";
import Link from "next/link";

export default function PemilikRuangan() {
  const [ruanganData, setRuanganData] = useState([]);

  useEffect(() => {
    fetchRuanganData();
  }, []);

  const fetchRuanganData = async () => {
    try {
      const response = await axios.get(
        "https://bekk.up.railway.app/api/ruangan"
      );
      setRuanganData(response.data);
    } catch (error) {
      console.error("Error fetching ruangan data:", error);
    }
  };

  const handleIsiPasien = async (id) => {
    try {
      const response = await axios.put(
        `https://bekk.up.railway.app/api/ruangan/${id}`,
        {
          status: "Tidak Tersedia",
        }
      );
      // Refresh data setelah berhasil mengubah status ruangan
      fetchRuanganData();
    } catch (error) {
      console.error("Error updating ruangan status:", error);
    }
  };

  const handlePasienPulang = async (id) => {
    try {
      const response = await axios.put(
        `https://bekk.up.railway.app/api/ruangan/${id}`,
        {
          status: "Tersedia",
        }
      );
      // Refresh data setelah berhasil mengubah status ruangan
      fetchRuanganData();
    } catch (error) {
      console.error("Error updating ruangan status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-400">
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Pemilik" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Ruangan</Breadcrumb.Item>
      </Breadcrumb>
      <div className="mx-4 my-4">
        <h1 className="text-2xl font-bold text-blue-800">
          Pengelolaan Ruangan
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ruanganData.map((ruangan) => (
            <div
              key={ruangan.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
            >
              <h2 className="text-lg font-semibold">{ruangan.nama_ruangan}</h2>
              <p
                className={`text-sm ${
                  ruangan.status === "Tersedia"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Status: {ruangan.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
