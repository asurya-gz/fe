"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const InputJadwal = () => {
  const [hari, setHari] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [namaDokter, setNamaDokter] = useState("");
  const [dokterList, setDokterList] = useState([]);

  useEffect(() => {
    const fetchDokterData = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/datadokter"
        );
        console.log("Dokter list:", response.data);
        setDokterList(response.data.dokter);
      } catch (error) {
        console.error("Error fetching dokter data:", error.message);
      }
    };

    fetchDokterData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://bekk.up.railway.app/jadwal-praktik`,
        {
          hari,
          jam_mulai: jamMulai,
          jam_selesai: jamSelesai,
          nama_dokter: namaDokter,
        }
      );
      console.log(response.data);
      window.location.reload();
      // Handle success, redirect, or show a success message
    } catch (error) {
      console.error(error);
      // Handle error, show an error message
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">
        Input Jadwal Praktik Dokter
      </h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        {/* Input nama dokter */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="namaDokter"
          >
            Nama Dokter:
          </label>
          <select
            id="namaDokter"
            value={namaDokter}
            onChange={(e) => setNamaDokter(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Pilih Dokter</option>
            {dokterList.map((dokter) => (
              <option key={dokter.id} value={dokter.username}>
                {dokter.nama || dokter.username}
              </option>
            ))}
          </select>
        </div>
        {/* Input hari */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="hari"
          >
            Hari:
          </label>
          <select
            id="hari"
            value={hari}
            onChange={(e) => setHari(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Pilih Hari</option>
            <option value="Senin">Senin</option>
            <option value="Selasa">Selasa</option>
            <option value="Rabu">Rabu</option>
            <option value="Kamis">Kamis</option>
            <option value="Jumat">Jumat</option>
            <option value="Sabtu">Sabtu</option>
            <option value="Minggu">Minggu</option>
          </select>
        </div>
        {/* Input jam mulai */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="jamMulai"
          >
            Jam Mulai:
          </label>
          <input
            id="jamMulai"
            type="time"
            value={jamMulai}
            onChange={(e) => setJamMulai(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Input jam selesai */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="jamSelesai"
          >
            Jam Selesai:
          </label>
          <input
            id="jamSelesai"
            type="time"
            value={jamSelesai}
            onChange={(e) => setJamSelesai(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Tombol simpan */}
        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default InputJadwal;
