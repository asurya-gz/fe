"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export default function PemilikAkunAdmin() {
  const [adminList, setAdminList] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/dataadmin"
        );
        console.log("Admin list:", response.data.admin);
        setAdminList(response.data.admin);
      } catch (error) {
        console.error("Error fetching admin data:", error.message);
      }
    };

    fetchAdminData();
  }, []);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const printDocument = printWindow.document;

    printDocument.write(`
      <html>
        <head>
          <title>Data Admin</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 20px;
            }
            h2 {
              color: #333;
              border-bottom: 2px solid #333;
              padding-bottom: 10px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: left;
            }
            th {
              background-color: #333;
              color: white;
            }
            tr:nth-child(even) {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h2>Data Admin</h2>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Nama</th>
                <th>Role</th>
                <th>No. Telepon</th>
                <th>Alamat</th>
              </tr>
            </thead>
            <tbody>
              ${adminList
                .map(
                  (admin) => `
                  <tr>
                    <td>${admin.username || " "}</td>
                    <td>${admin.nama || " "}</td>
                    <td>${admin.role || " "}</td>
                    <td>${admin.no_telp || " "}</td>
                    <td>${admin.alamat || " "}</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `);

    printDocument.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-slate-400">
      {/* Breadcrumb */}
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Admin" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/Admin/Akun">Akun</Breadcrumb.Item>
        <Breadcrumb.Item href="/Admin/Akun/AkunRole">Role</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Admin</Breadcrumb.Item>
      </Breadcrumb>
      {/* Breadcrumb end */}

      {/* Table */}
      <div className="mt-4 mx-4 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4 text-white mt-4">Data Admin</h2>
        <button onClick={handlePrint} className="p-2 bg-amber-400 rounded my-4">
          Cetak Data
        </button>
        <table className="min-w-full table-auto border-collapse border border-blue-800">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="px-6 py-3 border border-blue-800">Username</th>
              <th className="px-6 py-3 border border-blue-800">Nama</th>
              <th className="px-6 py-3 border border-blue-800">Role</th>
              <th className="px-6 py-3 border border-blue-800">No. Telepon</th>
              <th className="px-6 py-3 border border-blue-800">Alamat</th>
            </tr>
          </thead>
          <tbody>
            {adminList.map((admin) => (
              <tr
                key={admin.id}
                className="hover:bg-gray-100 text-black bg-white"
              >
                <td className="border px-6 py-4 border-black">
                  {admin.username}
                </td>
                <td className="border px-6 py-4 border-black">{admin.nama}</td>
                <td className="border px-6 py-4 border-black">{admin.role}</td>
                <td className="border px-6 py-4 border-black">
                  {admin.no_telp}
                </td>
                <td className="border px-6 py-4 border-black">
                  {admin.alamat}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Table end */}
    </div>
  );
}
