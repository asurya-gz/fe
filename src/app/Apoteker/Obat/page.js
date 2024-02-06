"use client";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { FaListUl } from "react-icons/fa";
import { MdSummarize } from "react-icons/md";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ApotekerObat() {
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
        console.error("Error fetching user:", error.message);
        // Redirect to login page if not authenticated
        router.push("/");
      }
    };

    fetchUser();
  }, [router]);

  // Menu
  const menuItems = [
    {
      icon: <FaListUl size="2em" color="darkBlue" />,
      label: "List",
      link: "/Apoteker/Obat/List",
    },
    {
      icon: <MdSummarize size="2em" color="darkBlue" />,
      label: "Rekap",
      link: "/Apoteker/Obat/Rekap",
    },
  ];
  return (
    <div className="bg-slate-400 min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="../Apoteker" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Obat</Breadcrumb.Item>
      </Breadcrumb>
      {/* Breadcrumb end */}

      {/* Box Menu */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 ml-4">
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
