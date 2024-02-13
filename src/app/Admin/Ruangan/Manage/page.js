"use client";
import React, { useState, useEffect } from "react";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import axios from "axios";

export default function Adminruangan() {
  const [ruanganData, setRuanganData] = useState([]);
  const [editingRuangan, setEditingRuangan] = useState(null);
  const [editedNamaRuangan, setEditedNamaRuangan] = useState("");
  const [editedStatusRuangan, setEditedStatusRuangan] = useState("");
  const [newRuangan, setNewRuangan] = useState(null); // Awalnya null

  useEffect(() => {
    fetchRuanganData();
    // Menutup form tambah ruangan ketika halaman dimuat
    setNewRuangan(null);
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

  const handleDeleteRuangan = async (id) => {
    try {
      await axios.delete(`https://bekk.up.railway.app/api/ruangan/${id}`);
      fetchRuanganData();
    } catch (error) {
      console.error("Error deleting ruangan:", error);
    }
  };

  const handleEditRuangan = (ruangan) => {
    setEditingRuangan(ruangan);
    setEditedNamaRuangan(ruangan.nama_ruangan);
    setEditedStatusRuangan(ruangan.status);
    // Tambahkan logika untuk menutup form tambah ruangan
    setNewRuangan(null);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `https://bekk.up.railway.app/api/manageruangan/${editingRuangan.id}`,
        {
          nama_ruangan: editedNamaRuangan,
          status: editedStatusRuangan,
        }
      );
      fetchRuanganData();
      setEditingRuangan(null);
    } catch (error) {
      console.error("Error saving edited ruangan:", error);
    }
  };

  const handleAddRuangan = async () => {
    try {
      await axios.post(
        "https://bekk.up.railway.app/api/tambahruangan",
        newRuangan
      );
      fetchRuanganData();
      // Tambahkan logika untuk menutup form tambah ruangan
      setNewRuangan(null);
    } catch (error) {
      console.error("Error adding new ruangan:", error);
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
        <h1 className="text-2xl font-bold text-blue-800">Manage Ruangan</h1>
        <button
          className="bg-blue-800 p-2 rounded my-4 text-white"
          onClick={() => {
            // Buka form tambah ruangan hanya jika sedang tidak ada yang diedit
            if (!editingRuangan) setNewRuangan({});
          }}
        >
          Tambah Ruangan
        </button>
        {newRuangan !== null && (
          <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-between mb-4">
            <input
              type="text"
              placeholder="Nama Ruangan"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2"
              value={newRuangan.nama_ruangan}
              onChange={(e) =>
                setNewRuangan({ ...newRuangan, nama_ruangan: e.target.value })
              }
            />
            <select
              className="border border-gray-300 rounded-md px-3 py-2 mb-2"
              value={newRuangan.status}
              onChange={(e) =>
                setNewRuangan({ ...newRuangan, status: e.target.value })
              }
            >
              <option value="">Pilih Status</option>
              <option value="Tersedia">Tersedia</option>
              <option value="Tidak Tersedia">Tidak Tersedia</option>
            </select>

            <button
              className="bg-green-500 text-white font-bold p-1 rounded"
              onClick={handleAddRuangan}
            >
              Simpan
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ruanganData.map((ruangan) => (
            <div
              key={ruangan.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
            >
              {/* Render nama ruangan atau input nama ruangan */}
              {editingRuangan && editingRuangan.id === ruangan.id ? (
                <div>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md px-3 py-2 mb-2"
                    value={editedNamaRuangan}
                    onChange={(e) => setEditedNamaRuangan(e.target.value)}
                  />
                  <select
                    className="border border-gray-300 rounded-md px-3 py-2 mb-2"
                    value={editedStatusRuangan}
                    onChange={(e) => setEditedStatusRuangan(e.target.value)}
                  >
                    <option value="Tersedia">Tersedia</option>
                    <option value="Tidak Tersedia">Tidak Tersedia</option>
                  </select>
                </div>
              ) : (
                <h2 className="text-lg font-semibold">
                  {ruangan.nama_ruangan}
                </h2>
              )}
              {/* Render status ruangan */}
              <p
                className={`text-sm ${
                  ruangan.status === "Tersedia"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Status: {ruangan.status}
              </p>
              {/* Render tombol edit dan hapus */}
              <div className="flex mt-1">
                {editingRuangan && editingRuangan.id === ruangan.id ? (
                  <button
                    className="bg-green-500 text-white font-bold p-1 rounded"
                    onClick={handleSaveEdit}
                  >
                    Simpan
                  </button>
                ) : (
                  <button
                    className="bg-blue-800 text-white font-bold p-1 rounded"
                    onClick={() => handleEditRuangan(ruangan)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-amber-400 p-1 rounded mx-2"
                  onClick={() => handleDeleteRuangan(ruangan.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
