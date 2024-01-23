"use client";
// Import
import { Breadcrumb, Button } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FiPrinter } from "react-icons/fi";

export default function PemilikUsg() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [pasienUsgData, setPasienUsgData] = useState([]);
  const [filterOption, setFilterOption] = useState("Semua");

  const handlePrintRiwayat = async () => {
    try {
      // Fetch the list of pasien USG data
      const response = await axios.get(
        "https://bekk.up.railway.app/datapasienusg"
      );
      const pasienUsgDataForPrint = response.data.pasien_usg;

      // Filter the pasien USG data based on the selected filter option
      const filteredPasienUsgData = filterDataByOption(pasienUsgDataForPrint);

      // Open a new window for printing
      const printWindow = window.open("", "_blank");

      // Create a print document
      const printDocument = printWindow.document;

      // Add your table content to the print document with inline styles
      printDocument.write(`
        <html>
          <head>
            <title>Riwayat Pasien USG</title>
          </head>
          <body style="
            font-family: Arial, sans-serif;
          ">
            <!-- Add any additional styling or headers as needed -->
            
            <!-- Table for displaying pasien USG data -->
            <table style="
              width: 100%;
              border-collapse: collapse;
            ">
              <thead>
                <tr style="
                  background-color: #333;
                  color: white;
                ">
                  <th style="
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                  ">
                    ID
                  </th>
                  <!-- Add additional headers for your data -->
                  <th style="
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                  ">
                    Nama Pasien
                  </th>
                  <th style="
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                  ">
                    Tanggal USG
                  </th>
                  <th style="
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                  ">
                    Tanggal Lahir
                  </th>
                  <th style="
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                  ">
                    Alamat
                  </th>
                  <th style="
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                  ">
                    Status
                  </th>
                  <!-- Add additional headers for your data -->
                </tr>
              </thead>
              <tbody>
                ${filteredPasienUsgData
                  .map(
                    (pasien) => `
                      <tr style="
                        background-color: #fff;
                      ">
                        <td style="
                          border: 1px solid #ddd;
                          padding: 8px;
                          text-align: left;
                        ">${pasien.id}</td>
                        <!-- Add additional columns for your data -->
                        <td style="
                          border: 1px solid #ddd;
                          padding: 8px;
                          text-align: left;
                        ">${pasien.nama_pasien}</td>
                        <td style="
                          border: 1px solid #ddd;
                          padding: 8px;
                          text-align: left;
                        ">${formatDate(pasien.tanggal_usg)}</td>
                        <td style="
                          border: 1px solid #ddd;
                          padding: 8px;
                          text-align: left;
                        ">${formatDate(pasien.tanggal_lahir)}</td>
                        <td style="
                          border: 1px solid #ddd;
                          padding: 8px;
                          text-align: left;
                        ">${pasien.alamat}</td>
                        <td style="
                          border: 1px solid #ddd;
                          padding: 8px;
                          text-align: left;
                        ">${pasien.status}</td>
                        <!-- Add additional columns for your data -->
                      </tr>
                    `
                  )
                  .join("")}
              </tbody>
            </table>
            <!-- Table end -->

          </body>
        </html>
      `);

      // Close the document and initiate printing
      printDocument.close();
      printWindow.print();
    } catch (error) {
      console.error(
        "Error fetching pasien USG data for printing:",
        error.message
      );
    }
  };

  const filterDataByOption = () => {
    // Filter data sesuai dengan opsi yang dipilih
    if (filterOption === "Hari Ini") {
      const today = new Date().toLocaleDateString();
      return pasienUsgData.filter(
        (pasien) => formatDate(pasien.tanggal_usg) === today
      );
    } else {
      return pasienUsgData; // Tampilkan semua data jika opsi "Semua" dipilih
    }
  };

  const fetchPasienUsgData = async () => {
    try {
      const response = await axios.get(
        "https://bekk.up.railway.app/datapasienusg"
      );
      console.log("Pasien USG data:", response.data);

      // Pastikan response.data.pasien_usg terdefinisi dan merupakan array
      if (Array.isArray(response.data.pasien_usg)) {
        // Ubah format tanggal atau lakukan manipulasi data lainnya jika diperlukan
        const pasienUsgFormatted = response.data.pasien_usg.map((pasien) => ({
          ...pasien,
          // Tambahkan manipulasi data lain jika diperlukan
        }));

        setPasienUsgData(pasienUsgFormatted);
      } else {
        console.error("Invalid pasien USG data:", response.data.pasien_usg);
      }
    } catch (error) {
      console.error("Error fetching pasien USG data:", error.message);
    }
  };

  useEffect(() => {
    fetchPasienUsgData();
  }, []);
  // Session
  useEffect(() => {
    // Fetch user details or check session status
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://bekk.up.railway.app/user", {
          withCredentials: true,
        });
        console.log("User data:", response.data);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error.message);
        // Redirect to login page if not authenticated
        router.push("/");
      }
    };

    fetchUser();
  }, [router]);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div className="bg-[#ffcccc] min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Pemilik" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">USG</Breadcrumb.Item>
      </Breadcrumb>
      {/* Breadcrumb end */}

      {/* Cetak rekap Obat */}
      <Button
        className="mt-8 ml-4"
        color="light"
        pill
        onClick={handlePrintRiwayat}
      >
        <FiPrinter size="1.5em" style={{ marginRight: "0.5em" }} />
        Cetak
      </Button>

      {/* UI untuk opsi filter */}
      <div className="flex items-center mt-4">
        <span className="mr-2">Filter:</span>
        <select
          className="border p-2"
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
        >
          <option value="Semua">Semua</option>
          <option value="Hari Ini">Hari Ini</option>
        </select>
      </div>

      {/* Tabel untuk menampilkan data pasien USG */}
      <div className="container mx-auto mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Nama Pasien</th>
              <th className="border border-gray-300 px-4 py-2">Tanggal USG</th>
              <th className="border border-gray-300 px-4 py-2">
                Tanggal Lahir
              </th>
              <th className="border border-gray-300 px-4 py-2">Alamat</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              {/* Tambahkan kolom lain sesuai kebutuhan */}
            </tr>
          </thead>
          <tbody>
            {filterDataByOption().map((pasien) => (
              <tr key={pasien.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {pasien.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {pasien.nama_pasien}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {formatDate(pasien.tanggal_usg)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {formatDate(pasien.tanggal_lahir)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {pasien.alamat}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {pasien.status}
                </td>
                {/* Tambahkan kolom lain sesuai kebutuhan */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Tabel end */}
    </div>
  );
}
