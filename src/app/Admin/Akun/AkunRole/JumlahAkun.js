import axios from "axios";
import React, { useState, useEffect } from "react";
import { FiPrinter } from "react-icons/fi";

export default function JumlahAkunRole() {
  const [apotekerList, setApotekerList] = useState([]);
  const [dokterList, setDokterList] = useState([]);
  const [pemilikList, setPemilikList] = useState([]);
  const [perawatList, setPerawatList] = useState([]);
  const [adminList, setAdminList] = useState([]);

  useEffect(() => {
    const fetchPerawatData = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/dataperawat"
        );
        console.log("Perawat list:", response.data.perawat);
        setPerawatList(response.data.perawat);
      } catch (error) {
        console.error("Error fetching perawat data:", error.message);
      }
    };

    fetchPerawatData();
  }, []);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/dataadmin"
        );
        console.log("Admin list:", response.data.admin);
        setAdminList(response.data.admin);
      } catch (error) {
        console.error("Error fetching perawat data:", error.message);
      }
    };

    fetchAdminData();
  }, []);

  useEffect(() => {
    const fetchPemilikData = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/datapemilik"
        );
        console.log("Pemilik list:", response.data.pemilik);
        setPemilikList(response.data.pemilik);
      } catch (error) {
        console.error("Error fetching pemilik data:", error.message);
      }
    };

    fetchPemilikData();
  }, []);

  useEffect(() => {
    const fetchDokterData = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/datadokter"
        );
        console.log("Dokter list:", response.data.dokter);
        setDokterList(response.data.dokter);
      } catch (error) {
        console.error("Error fetching dokter data:", error.message);
      }
    };

    fetchDokterData();
  }, []);

  useEffect(() => {
    const fetchApotekerData = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/dataapoteker"
        );
        console.log("Apoteker list:", response.data.apoteker);
        setApotekerList(response.data.apoteker);
      } catch (error) {
        console.error("Error fetching apoteker data:", error.message);
      }
    };

    fetchApotekerData();
  }, []);

  const handlePrint = async () => {
    try {
      const printWindow = window.open("", "_blank");
      const printDocument = printWindow.document;

      printDocument.write(`
        <html>
          <head>
            <title>Data Role</title>
            <style>
              table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f2f2f2;
              }
            </style>
          </head>
          <body style="font-family: Arial, sans-serif;">
          <!-- Image for letterhead -->
              <img src="/kop.png" alt="Letterhead" style="width: 100%; max-height: 150px; object-fit: cover; margin-bottom: 5px;">
            <h1>Data Role:</h1>
            <h2>Apoteker</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Nama</th>
                  <th>Role</th>
                  <th>Nomor Telpon</th>
                </tr>
              </thead>
              <tbody>
                ${apotekerList
                  .map(
                    (apoteker) => `
                  <tr>
                    <td>${apoteker.id ?? ""}</td>
                    <td>${apoteker.username ?? ""}</td>
                    <td>${apoteker.nama ?? ""}</td>
                    <td>${apoteker.role ?? ""}</td>
                    <td>${apoteker.no_telp ?? ""}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
  
            <h2>Pemilik</h2>
            <table>
              <thead>
                <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Nama</th>
                <th>Role</th>
                <th>Nomor Telpon</th>
                </tr>
              </thead>
              <tbody>
                ${pemilikList
                  .map(
                    (pemilik) => `
                  <tr>
                  <td>${pemilik.id ?? ""}</td>
                  <td>${pemilik.username ?? ""}</td>
                  <td>${pemilik.nama ?? ""}</td>
                  <td>${pemilik.role ?? ""}</td>
                  <td>${pemilik.no_telp ?? ""}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>

            <h2>Perawat</h2>
            <table>
              <thead>
                <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Nama</th>
                <th>Role</th>
                <th>Nomor Telpon</th>
                </tr>
              </thead>
              <tbody>
                ${perawatList
                  .map(
                    (perawat) => `
                  <tr>
                  <td>${perawat.id ?? ""}</td>
                  <td>${perawat.username ?? ""}</td>
                  <td>${perawat.nama ?? ""}</td>
                  <td>${perawat.role ?? ""}</td>
                  <td>${perawat.no_telp ?? ""}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>

            <h2>Admin</h2>
            <table>
              <thead>
                <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Nama</th>
                <th>Role</th>
                <th>Nomor Telpon</th>
                </tr>
              </thead>
              <tbody>
                ${adminList
                  .map(
                    (admin) => `
                  <tr>
                  <td>${admin.id ?? ""}</td>
                  <td>${admin.username ?? ""}</td>
                  <td>${admin.nama ?? ""}</td>
                  <td>${admin.role ?? ""}</td>
                  <td>${admin.no_telp ?? ""}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>

            <h2>Dokter</h2>
            <table>
              <thead>
                <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Nama</th>
                <th>Role</th>
                <th>Nomor Telpon</th>
                </tr>
              </thead>
              <tbody>
                ${dokterList
                  .map(
                    (dokter) => `
                  <tr>
                  <td>${dokter.id ?? ""}</td>
                  <td>${dokter.username ?? ""}</td>
                  <td>${dokter.nama ?? ""}</td>
                  <td>${dokter.role ?? ""}</td>
                  <td>${dokter.no_telp ?? ""}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
  
            <!-- Tambahkan tabel untuk role lainnya seperti perawat, dokter, dll -->
  
          </body>
        </html>
      `);

      printDocument.close();
      printWindow.print();
    } catch (error) {
      console.error("Error printing data:", error.message);
    }
  };

  return (
    <div className="p-4">
      <p className="font-semibold">Jumlah Akun:</p>
      <div className="flex flex-wrap mt-2">
        <span className="mr-4">Apoteker: {apotekerList.length}</span>
        <span className="mr-4">Pemilik: {pemilikList.length}</span>
        <span className="mr-4">Perawat: {perawatList.length}</span>
        <span className="mr-4">Admin: {adminList.length}</span>
        <span>Dokter: {dokterList.length}</span>
      </div>
      <button
        onClick={handlePrint}
        className="bg-blue-800 rounded text-white font-bold p-2 mt-2"
      >
        <div className="flex">
          <FiPrinter size="1.5em" style={{ marginRight: "0.5em" }} />
          Cetak
        </div>
      </button>
    </div>
  );
}
