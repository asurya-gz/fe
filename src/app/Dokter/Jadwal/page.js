import React from "react";
import ListJadwalPraktikDokter from "@/app/Admin/JadwalPraktikDokter/List/components/ListJadwalPraktikDokter";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export default function DokterJadwal() {
  return (
    <div className="bg-slate-400 min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Dokter" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/Dokter/Jadwal">Jadwal</Breadcrumb.Item>
      </Breadcrumb>
      {/* Breadcrumb end */}
      <div className="mx-4">
        <ListJadwalPraktikDokter />
      </div>
    </div>
  );
}
