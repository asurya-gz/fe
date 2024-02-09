// pages/apoteker.js
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { CiViewList } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { GrDocumentUser } from "react-icons/gr";
import Link from "next/link";
import TotalKunjungan from "./components/TotalKunjungan";

export default function Perawat() {
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
      icon: <GrDocumentUser size="2em" color="darkBlue" />,
      label: "Pendaftaran",
      link: "/Perawat/Pendaftaran",
    },
    {
      icon: <CiViewList size="2em" color="darkBlue" />,
      label: "Pasien (RM)",
      link: "/Perawat/List",
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
          >
            <Dropdown.Item href="/Perawat/Profile">Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown>
        </div>
      </Navbar>
      {/* Navbar end*/}

      {/* Breadcrumb */}
      <Breadcrumb className="mt-4 ml-4" aria-label="Default breadcrumb example">
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

      <div className="bg-white p-4 rounded-lg shadow-md mx-4">
        <h3 className="text-xl font-bold mb-2 text-blue-800">
          Total Pasien Hari Ini
        </h3>
        <TotalKunjungan />
      </div>

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
