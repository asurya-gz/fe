"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LihatJadwalPraktikDokter() {
  const [jadwalPraktik, setJadwalPraktik] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({
    id: null,
    nama_dokter: "",
    hari: "",
    jam_mulai: "",
    jam_selesai: "",
  });
  const [dokterList, setDokterList] = useState([]);
  const [hariList] = useState([
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [jadwalResponse, dokterResponse] = await Promise.all([
        axios.get("https://bekk.up.railway.app/jadwal-praktik"),
        axios.get("https://bekk.up.railway.app/datadokter"),
      ]);
      setJadwalPraktik(jadwalResponse.data);
      setDokterList(dokterResponse.data.dokter);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (jadwal) => {
    setEditedData(jadwal);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://bekk.up.railway.app/jadwal-praktik/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting jadwal praktik:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://bekk.up.railway.app/jadwal-praktik/${editedData.id}`,
        editedData
      );
      setEditMode(false);
      // Memperbarui data setelah penyuntingan
      fetchData();
    } catch (error) {
      console.error("Error updating jadwal praktik:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-blue-800">
        Jadwal Praktik Dokter
      </h1>
      <div className="overflow-x-auto">
        {" "}
        <table className="min-w-full divide-y divide-blue-800">
          <thead className="bg-blue-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Nama Dokter
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Hari
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Jam Mulai
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Jam Selesai
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jadwalPraktik.map((jadwal, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {jadwal.nama_dokter}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{jadwal.hari}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {jadwal.jam_mulai}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {jadwal.jam_selesai}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(jadwal)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(jadwal.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editMode && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            ></span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Edit Jadwal Praktik
                </h3>
                <div className="mt-2">
                  <label className="block">
                    <span className="text-gray-700">Nama Dokter</span>
                    <select
                      name="nama_dokter"
                      value={editedData.nama_dokter}
                      onChange={handleInputChange}
                      className="border-gray-300 border rounded-md p-2 ml-2"
                    >
                      <option value="">Pilih Dokter</option>
                      {dokterList.map((dokter) => (
                        <option key={dokter.id} value={dokter.username}>
                          {dokter.nama || dokter.username}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block mt-2">
                    <span className="text-gray-700">Hari</span>
                    <select
                      name="hari"
                      value={editedData.hari}
                      onChange={handleInputChange}
                      className="border-gray-300 border rounded-md p-2 ml-2"
                    >
                      <option value="">Pilih Hari</option>
                      {hariList.map((hari) => (
                        <option key={hari} value={hari}>
                          {hari}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block mt-2">
                    <span className="text-gray-700">Jam Mulai</span>
                    <input
                      type="time"
                      name="jam_mulai"
                      value={editedData.jam_mulai}
                      onChange={handleInputChange}
                      className="border-gray-300 border rounded-md p-2 ml-2"
                    />
                  </label>
                  <label className="block mt-2">
                    <span className="text-gray-700">Jam Selesai</span>
                    <input
                      type="time"
                      name="jam_selesai"
                      value={editedData.jam_selesai}
                      onChange={handleInputChange}
                      className="border-gray-300 border rounded-md p-2 ml-2"
                    />
                  </label>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleUpdate}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
