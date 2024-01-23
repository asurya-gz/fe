"use client";
// Import
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminUsgFormulir() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // State untuk menyimpan nilai input formulir
  const [formData, setFormData] = useState({
    nama: "",
    tanggalUsg: "",
    tanggalLahir: "",
    alamat: "",
  });

  // Fungsi untuk menghandle perubahan nilai input formulir
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fungsi untuk mengirim data formulir
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Data Formulir:", formData); // Console log untuk memeriksa payload
    // Kirim data formulir ke server atau lakukan sesuai kebutuhan
    try {
      const response = await axios.post(
        "https://bekk.up.railway.app/pendaftaran-usg",
        formData
      );
      console.log("Respon dari server:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error saat mengirim formulir:", error.message);
    }
  };

  // Session
  useEffect(() => {
    // Fetch user details or check session status
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://bekk.up.railway.app/user", {
          withCredentials: true,
        });
        console.log("User data:", response.data);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error.message);
        // Redirect to login page if not authenticated
        router.push("/");
      }
    };

    fetchUser();
  }, [router]);

  return (
    <div className="bg-[#ffcccc] min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Admin" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/Admin/Usg">USG</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Formulir</Breadcrumb.Item>
      </Breadcrumb>
      {/* Breadcrumb end */}

      <div className="mt-8 mx-auto max-w-md p-4 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-6">Pendaftaran USG</h1>

        {/* Formulir */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="nama"
              className="block text-sm font-medium text-gray-600"
            >
              Nama:
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="tanggalUsg"
              className="block text-sm font-medium text-gray-600"
            >
              Tanggal USG:
            </label>
            <input
              type="date"
              id="tanggalUsg"
              name="tanggalUsg"
              value={formData.tanggalUsg}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="tanggalLahir"
              className="block text-sm font-medium text-gray-600"
            >
              Tanggal Lahir:
            </label>
            <input
              type="date"
              id="tanggalLahir"
              name="tanggalLahir"
              value={formData.tanggalLahir}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="alamat"
              className="block text-sm font-medium text-gray-600"
            >
              Alamat:
            </label>
            <textarea
              id="alamat"
              name="alamat"
              value={formData.alamat}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Submit
          </button>
        </form>
        {/* Formulir end */}
      </div>
    </div>
  );
}
