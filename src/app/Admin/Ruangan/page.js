"use client";
import React, { useState, useEffect } from "react";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import axios from "axios";
import Link from "next/link";

export default function Adminruangan() {
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
        <Breadcrumb.Item href="/Admin" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Ruangan</Breadcrumb.Item>
      </Breadcrumb>
      <div className="mx-4 my-4">
        <h1 className="text-2xl font-bold text-blue-800">Ruangan</h1>
        <Link href="/Admin/Ruangan/Manage">
          <button className="p-2 bg-amber-400 rounded my-4">
            Manage Ruangan
          </button>
        </Link>
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
              {ruangan.status === "Tersedia" ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => handleIsiPasien(ruangan.id)}
                >
                  Isi Pasien
                </button>
              ) : (
                <button
                  className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => handlePasienPulang(ruangan.id)}
                >
                  Pasien Pulang
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
