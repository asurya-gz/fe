// pages/apoteker.js
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import {
  AiOutlineMedicineBox,
  AiOutlineTransaction,
  AiOutlineAppstore,
  AiOutlineSearch,
} from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Alert } from "flowbite-react";

export default function Apoteker() {
  const router = useRouter();
  const [user, setUser] = useState(null);

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
        // Redirect to login page if not authenticated
        router.push("/");
      }
    };

    fetchUser();
  }, [router]);

  // Log out
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

  return (
    <div className="min-h-screen bg-[#ffcccc] relative">
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
            <Dropdown.Item href="/Apoteker/Profile">Profile</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/Apoteker/Obat">
              <AiOutlineMedicineBox className="mr-1 text-blue-800" />
              Obat
            </Dropdown.Item>
            <Dropdown.Item href="/Apoteker/Transaksi">
              <AiOutlineTransaction className="mr-1 text-blue-800" />
              Transaksi
            </Dropdown.Item>
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
    </div>
  );
}
