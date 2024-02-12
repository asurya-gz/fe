import React from "react";
import ListJadwalPraktikDokter from "./components/ListJadwalPraktikDokter";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export default function page() {
  return (
    <div className="bg-slate-400 min-h-screen">
      {/* Breadcrumb */}
      <div className="pt-4 pl-4">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="/Admin" icon={HiHome}>
            Dashboard
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/Admin/JadwalPraktikDokter">
            Input Jadwal
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">Jadwal Praktik</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {/* Breadcrumb end */}
      <div className="ml-4 mx-4">
        <ListJadwalPraktikDokter />
      </div>
    </div>
  );
}
