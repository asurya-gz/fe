"use client";
import React from "react";
import { Breadcrumb, Table } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export default function DokterPendaftaran() {
  return (
    <div className="bg-[#ffcccc] h-screen w-full flex flex-col items-center justify-center">
      {/* Breadcrumb */}
      <Breadcrumb
        className="pt-4 pl-4 absolute top-0 left-0 z-10"
        aria-label="Default breadcrumb example"
      >
        <Breadcrumb.Item href="/Dokter" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Pendaftaran</Breadcrumb.Item>
      </Breadcrumb>
      {/* Breadcrumb end */}

      {/* Table  */}
      <div className="overflow-x-auto w-full">
        <Table>
          <Table.Head>
            <Table.HeadCell>Nomor Pendaftaran</Table.HeadCell>
            <Table.HeadCell>Nama pasien</Table.HeadCell>
            <Table.HeadCell>Keluhan</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {'Apple MacBook Pro 17"'}
              </Table.Cell>
              <Table.Cell>Sliver</Table.Cell>
              <Table.Cell>Laptop</Table.Cell>
              <Table.Cell>
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
      {/* Table end */}
    </div>
  );
}
