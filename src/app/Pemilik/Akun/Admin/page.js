"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

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

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Data Admin</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">No. Telepon</th>
            <th className="px-4 py-2">Alamat</th>
          </tr>
        </thead>
        <tbody>
          {adminList.map((admin) => (
            <tr key={admin.id}>
              <td className="border px-4 py-2">{admin.id}</td>
              <td className="border px-4 py-2">{admin.username}</td>
              <td className="border px-4 py-2">{admin.nama}</td>
              <td className="border px-4 py-2">{admin.role}</td>
              <td className="border px-4 py-2">{admin.no_telp}</td>
              <td className="border px-4 py-2">{admin.alamat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
