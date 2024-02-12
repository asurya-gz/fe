import React from "react";
import ListJadwalPraktikDokter from "@/app/Admin/JadwalPraktikDokter/List/components/ListJadwalPraktikDokter";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export default function PerawatJadwalPraktikDokter() {
  return (
    <div className="bg-slate-400 min-h-screen w-full">
      {/* Breadcrumb */}
      <div className="pt-4 pl-4">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="/Perawat" icon={HiHome}>
            Dashboard
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">Jadwal Praktik</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {/* Breadcrumb end */}
      <div className="mx-4">
        <ListJadwalPraktikDokter />
      </div>
    </div>
  );
}
