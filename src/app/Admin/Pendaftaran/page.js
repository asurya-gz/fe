"use client";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { BiSolidBookAdd } from "react-icons/bi";

export default function PerawatPendaftaran() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    noMedrek: "",
    nama: "",
    tanggalLahir: "",
    alamat: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Kirim data ke server (contoh: menggunakan axios)
      const response = await axios.post(
        "https://bekk.up.railway.app/tambahpasien",
        formData,
        {
          withCredentials: true,
        }
      );

      // Tampilkan pesan atau lakukan navigasi setelah sukses
      alert("Data pasien berhasil disimpan:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Gagal menyimpan data pasien:", error);
    }
  };

  const [noMedrek, setNoMedrek] = useState("");

  useEffect(() => {
    // Generate nomor medrek otomatis saat komponen dimount
    generateNoMedrek();
  }, []);

  const generateNoMedrek = () => {
    // Logika untuk menghasilkan nomor medrek otomatis (contoh: timestamp)
    const timestamp = Date.now();
    const newNoMedrek = `MED${timestamp}`;

    // Set state dengan nomor medrek yang baru dihasilkan
    setFormData((prevFormData) => ({
      ...prevFormData,
      noMedrek: newNoMedrek,
    }));
  };
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
        // Redirect to login page if not authenticated
        router.push("/");
      }
    };

    fetchUser();
  }, [router]);

  return (
    <div className="bg-slate-400 min-h-screen">
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Admin" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Pendaftaran</Breadcrumb.Item>
      </Breadcrumb>

      <div className="mt-4 mb-4 flex justify-end mr-4">
        <Link href="/Admin/List">
          <p className="text-white">List Pasien</p>
        </Link>
      </div>

      <div className="p-4">
        <h2 className="text-xl text-center font-semibold mb-4 text-white">
          Form Pendaftaran Pasien
        </h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label
              htmlFor="noMedrek"
              className="block text-sm font-medium text-gray-600"
            >
              Nomor Medrek
            </label>
            <input
              type="text"
              id="noMedrek"
              name="noMedrek"
              value={formData.noMedrek}
              readOnly
              className="bg-gray-100 border-2 border-gray-300 p-2 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="nama"
              className="block text-sm font-medium text-gray-600"
            >
              Nama Pasien
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              required
              className="border-2 border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="tanggalLahir"
              className="block text-sm font-medium text-gray-600"
            >
              Tanggal Lahir
            </label>
            <input
              type="date"
              id="tanggalLahir"
              name="tanggalLahir"
              value={formData.tanggalLahir}
              onChange={handleInputChange}
              required
              className="border-2 border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="alamat"
              className="block text-sm font-medium text-gray-600"
            >
              Alamat Pasien
            </label>
            <input
              type="text"
              id="alamat"
              name="alamat"
              value={formData.alamat}
              onChange={handleInputChange}
              required
              className="border-2 border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex">
            <button
              type="submit"
              className="bg-blue-800 p-3 rounded text-white btn btn-primary w-full"
            >
              Daftarkan Pasien
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
