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
import { FaList, FaClipboard, FaHistory, FaSearch } from "react-icons/fa";

export default function PemilikApoteker() {
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

  const menuItems = [
    {
      icon: <FaList size="2em" />,
      label: "List Obat",
      link: "/Pemilik/Apoteker/List",
    },
    {
      icon: <FaClipboard size="2em" />,
      label: "Rekap Obat",
      link: "/Pemilik/Apoteker/Rekap",
    },
    {
      icon: <FaHistory size="2em" />,
      label: "Riwayat Transaksi",
      link: "/Pemilik/Apoteker/Riwayat",
    },
    {
      icon: <FaSearch size="2em" />,
      label: "Pencarian",
      link: "/Pemilik/Apoteker/Pencarian",
    },
  ];
  return (
    <div className="h-screen bg-[#f0f0f0] relative">
      {/* Breadcrumb */}
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Pemilik" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Apoteker</Breadcrumb.Item>
      </Breadcrumb>
      {/* Breadcrumb end */}
      {/* Box Menu */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {menuItems.map((menuItem, index) => (
          <Link href={menuItem.link} key={index}>
            <div className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer">
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
