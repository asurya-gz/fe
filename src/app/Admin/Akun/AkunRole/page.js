"use client";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { FaUserCog, FaUserMd } from "react-icons/fa";
import { FaUserNurse, FaHospitalUser } from "react-icons/fa6";
import JumlahAkunRole from "./JumlahAkun";

export default function AdminAkunAkunRole() {
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
      icon: <FaHospitalUser size="2em" color="darkBlue" />,
      label: "Apoteker",
      link: "/Admin/Akun/AkunRole/Apoteker",
    },
    {
      icon: <FaUserCog size="2em" color="darkBlue" />,
      label: "Pemilik",
      link: "/Admin/Akun/AkunRole/Pemilik",
    },
    {
      icon: <FaUserNurse size="2em" color="darkBlue" />,
      label: "Perawat",
      link: "/Admin/Akun/AkunRole/Perawat",
    },
    {
      icon: <FaUserMd size="2em" color="darkBlue" />,
      label: "Dokter",
      link: "/Admin/Akun/AkunRole/Dokter",
    },
    {
      icon: <FaUserMd size="2em" color="darkBlue" />,
      label: "Admin",
      link: "/Admin/Akun/AkunRole/Admin",
    },
  ];

  return (
    <div className="bg-slate-400 min-h-screen">
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Admin" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/Admin/Akun">Akun</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Role</Breadcrumb.Item>
      </Breadcrumb>

      <div className="bg-white p-4 rounded-lg shadow-md mx-4 my-4">
        <h3 className="text-xl font-bold mb-2 text-blue-800">Data Akun</h3>
        <JumlahAkunRole />
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
