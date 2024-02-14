// pages/apoteker.js
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import BarChart from "../components/Pemilik/BarChart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaUserNurse,
  FaUser,
  FaFileMedicalAlt,
  FaLaptopMedical,
} from "react-icons/fa";
import { Alert } from "flowbite-react";
import LineChart from "../components/Pemilik/LineChart";
import CountingAnimation from "../components/Pemilik/Counting";
import TotalKunjungan from "../Perawat/components/TotalKunjungan";
import HasilPenjualanObat from "../Apoteker/Transaksi/components/HasilPenjualanObat";
import { FaRegBuilding } from "react-icons/fa6";

export default function Pemilik() {
  const router = useRouter();
  const [user, setUser] = useState(null);

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

  const handleLogout = async () => {
    try {
      // Menghapus sesi (session) dari server
      await axios.post("https://bekk.up.railway.app/logout", null, {
        withCredentials: true,
      });

      // Menghapus data pengguna dari state dan mengarahkan kembali ke halaman login
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  // Menu
  const menuItems = [
    {
      icon: <FaUser size="2em" color="darkBlue" />,
      label: "Akun",
      link: "/Pemilik/Akun",
    },
    {
      icon: <FaUserNurse size="2em" color="darkBlue" />,
      label: "Obat",
      link: "/Pemilik/Apoteker",
    },
    {
      icon: <FaRegBuilding size="2em" color="darkBlue" />,
      label: "Ruangan",
      link: "/Pemilik/Ruangan",
    },
    {
      icon: <FaRegBuilding size="2em" color="darkBlue" />,
      label: "Riwayat Rekam Medis",
      link: "/Pemilik/List",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-400 relative">
      {/* Navbar */}
      <Navbar fluid rounded>
        <Navbar.Brand href="#">
          <img
            src="/logo.png"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Klinik Kartika
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2 items-center">
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img="/perawat.jpg" rounded />}
            // Add the 'w' class to set the width of the dropdown
            menuClass="w-48"
          >
            <Dropdown.Item href="/Pemilik/Profile">Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown>
        </div>
      </Navbar>
      {/* Navbar end*/}
      {/* Breadcrumb */}
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="#" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
      </Breadcrumb>
      {/* Breadcrumb end */}

      {/* Box profile */}
      <div className="mt-4 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <img
            src="/logo.png"
            className="mx-auto w-20 h-20 rounded-full mb-4"
            alt="Profile Avatar"
          />
          {user ? (
            <>
              <h3 className="text-xl font-bold mb-2 text-blue-800">
                {user.username}
              </h3>
              <p className="text-gray-600">{user.role}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      {/* Box profile end */}
      <div className="bg-white p-4 rounded-lg shadow-md mx-4 mb-4">
        <h3 className="text-xl font-bold mb-2 text-blue-800">
          Pendapatan Obat Hari Ini
        </h3>
        <HasilPenjualanObat />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mx-4">
        <h3 className="text-xl font-bold mb-2 text-blue-800">
          Total Pasien Hari Ini
        </h3>
        <TotalKunjungan />
      </div>

      {/* Responsive Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {/* Card 1 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2 text-blue-800">
            Pendapatan Obat
          </h3>
          <BarChart />
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2 text-blue-800">
            Kunjungan Pasien
          </h3>
          <LineChart />
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2 text-blue-800">
            Pasien Terdaftar
          </h3>
          <CountingAnimation />
        </div>
      </div>
      {/* Responsive Cards end */}

      {/* Box Menu */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mx-4">
        {menuItems.map((menuItem, index) => (
          <Link href={menuItem.link} key={index}>
            <div className="bg-white backdrop-blur-md p-6 rounded-lg shadow-md text-center cursor-pointer text-black">
              <div className="flex flex-col items-center">
                {menuItem.icon}
                <p className="mt-2">{menuItem.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Box Menu End */}
    </div>
  );
}
