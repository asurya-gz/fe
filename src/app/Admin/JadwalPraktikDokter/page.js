import React from "react";
import InputJadwal from "./components/FormJadwalPraktikDokter";
import Link from "next/link";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export default function AdminJadwalPraktikDokter() {
  return (
    <div className="w-full min-h-screen bg-slate-400">
      {/* Breadcrumb */}
      <div className="pt-4 pl-4">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="/Admin" icon={HiHome}>
            Dashboard
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">Input Jadwal</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {/* Breadcrumb end */}
      {/* Button */}
      <div className="mt-4 mx-4">
        <Link href="/Admin/JadwalPraktikDokter/Jadwal">
          <button className="p-2 bg-blue-800 text-white font-bold rounded">
            Edit Jadwal
          </button>
        </Link>
        <Link href="/Admin/JadwalPraktikDokter/List">
          <button className="p-2 mx-4 bg-amber-400 text-black rounded">
            List Jadwal
          </button>
        </Link>
      </div>
      {/* Button end */}
      {/* Input jadwal  */}
      <div className="max-w-md mx-auto mt-4">
        <InputJadwal />
      </div>
      {/* Input jadwal end */}
    </div>
  );
}
