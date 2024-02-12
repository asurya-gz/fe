import React from "react";
import LihatJadwalPraktikDokter from "./components/LihatJadwalPraktikDokter";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export default function AdminJadwalPraktikDokterJadwal() {
  return (
    <div className="min-h-screen bg-slate-400">
      {/* Breadcrumb */}
      <div className="pt-4 pl-4">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#" icon={HiHome}>
            Dashboard
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/Admin/JadwalPraktikDokter">
            Input Jadwal
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">Edit</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {/* Breadcrumb end */}
      <div className="mx-4 mt-4">
        <LihatJadwalPraktikDokter />
      </div>
    </div>
  );
}
