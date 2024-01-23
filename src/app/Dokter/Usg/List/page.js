"use client";
// Import
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DokterUsgRiwayat() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [pasienUsgData, setPasienUsgData] = useState([]);
  const [filterType, setFilterType] = useState("all"); // "all" or "today"

  const isToday = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleFilterButtonClick = (type) => {
    setFilterType(type);
  };

  const fetchPasienUsgData = async () => {
    try {
      const response = await axios.get(
        "https://bekk.up.railway.app/datapasienusg"
      );
      console.log("Pasien USG data:", response.data);

      if (Array.isArray(response.data.pasien_usg)) {
        const pasienUsgFormatted = response.data.pasien_usg.map((pasien) => ({
          ...pasien,
        }));
        setPasienUsgData(pasienUsgFormatted);
      } else {
        console.error("Invalid pasien USG data:", response.data.pasien_usg);
      }
    } catch (error) {
      console.error("Error fetching pasien USG data:", error.message);
    }
  };

  useEffect(() => {
    fetchPasienUsgData();
  }, []);

  // Session
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://bekk.up.railway.app/user", {
          withCredentials: true,
        });
        console.log("User data:", response.data);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error.message);
        router.push("/");
      }
    };

    fetchUser();
  }, [router]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSelesaiButtonClick = async (id) => {
    try {
      await axios.put(
        `https://bekk.up.railway.app/datapasienusg/updatestatus/${id}`
      );
      fetchPasienUsgData();
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  return (
    <div className="bg-[#ffcccc] min-h-screen">
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Dokter" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/Dokter/Usg">USG</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Riwayat</Breadcrumb.Item>
      </Breadcrumb>

      <div className="container mx-auto mt-8 overflow-x-auto">
        <div className="mb-4">
          <button
            onClick={() => handleFilterButtonClick("all")}
            className={`p-2 mx-2 ${
              filterType === "all" ? "bg-slate-600 text-white" : ""
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => handleFilterButtonClick("today")}
            className={`p-2 mx-2 ${
              filterType === "today" ? "bg-slate-600 text-white" : ""
            }`}
          >
            Hari Ini
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray-300 shadow">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Nama Pasien</th>
              <th className="border border-gray-300 px-4 py-2">Tanggal USG</th>
              <th className="border border-gray-300 px-4 py-2">
                Tanggal Lahir
              </th>
              <th className="border border-gray-300 px-4 py-2">Alamat</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {pasienUsgData
              .filter((pasien) => {
                if (filterType === "today") {
                  return (
                    pasien.status === "belum" && isToday(pasien.tanggal_usg)
                  );
                }
                return pasien.status === "belum";
              })
              .map((pasien) => (
                <tr key={pasien.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {pasien.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {pasien.nama_pasien}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formatDate(pasien.tanggal_usg)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formatDate(pasien.tanggal_lahir)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {pasien.alamat}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {pasien.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleSelesaiButtonClick(pasien.id)}
                      className="p-2 bg-slate-600 text-white"
                    >
                      Selesai
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
