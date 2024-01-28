// pages/apoteker.js
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Avatar, Dropdown, Navbar, Alert } from "flowbite-react";
import { AiOutlineTransaction } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GrDocumentUser } from "react-icons/gr";
import { FaLaptopMedical, FaBookOpen } from "react-icons/fa";
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

  const menuItems = [
    {
      icon: <FaBookOpen size="2em" color="green" />,
      label: "Pendaftaran",
      link: "Perawat/Pendaftaran",
    },
    {
      icon: <AiOutlineTransaction size="2em" color="blue" />,
      label: "Transaksi",
      link: "Perawat/Transaksi",
    },
    {
      icon: <GrDocumentUser size="2em" color="gray" />,
      label: "SOAP",
      link: "Perawat/Soap",
    },
    {
      icon: <FaLaptopMedical size="2em" color="red" />,
      label: "USG",
      link: "Perawat/Usg",
    },
  ];

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
            <Dropdown.Header>
              <span className="block text-sm">
                {user ? user.username : "Loading..."}
              </span>
            </Dropdown.Header>
            <Dropdown.Item href="#">Dashboard</Dropdown.Item>
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

      {/* info  */}
      <Alert className="mt-4" color="info">
        <span className="font-medium">Info!</span> Menu SOAP Sudah Tersedia !
      </Alert>
      {/* info  end */}

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
              <h3 className="text-xl font-bold mb-2">{user.username}</h3>
              <p className="text-gray-600">{user.role}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      {/* Box profile end */}

      {/* Box Menu */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {menuItems.map((menuItem, index) => (
          <Link href={menuItem.link} key={index}>
            <div className="bg-white backdrop-blur-md p-6 rounded-lg shadow-md text-center cursor-pointer">
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
