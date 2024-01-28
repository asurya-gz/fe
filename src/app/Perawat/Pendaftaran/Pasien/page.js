"use client";
import React from "react";
import { HiHome } from "react-icons/hi";
import { Button, Label, TextInput, Breadcrumb } from "flowbite-react";

export default function PerawatPendaftaranPasien() {
  return (
    <div className="bg-[#ffcccc] h-screen w-full flex flex-col items-center justify-center relative">
      {/* Breadcrumb */}
      <Breadcrumb
        className="pt-4 pl-4 absolute top-0 left-0 z-10"
        aria-label="Default breadcrumb example"
      >
        <Breadcrumb.Item href="/Perawat" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/Perawat/Pendaftaran">
          Pendaftaran
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Pasien</Breadcrumb.Item>
      </Breadcrumb>
      {/* Breadcrumb end */}
      <form className="flex max-w-md flex-col gap-4 w-full">
        <h1 className="font-bold">Pendaftaran Pasien</h1>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="nomor_pendaftaran" value="Nomor pendaftaran" />
          </div>
          <TextInput
            id="nomor_pendaftaran"
            type="text"
            placeholder="....."
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="nama_pasien" value="Nama Pasien" />
          </div>
          <TextInput
            id="nama_pasien"
            type="text"
            placeholder="......"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="keluhan" value="Keluhan" />
          </div>
          <TextInput id="keluhan" type="text" placeholder="....." required />
        </div>
        <Button type="submit">Daftarkan</Button>
      </form>
    </div>
  );
}
