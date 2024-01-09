"use client";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Table } from "flowbite-react";
import { Button } from "flowbite-react";

export default function AdminObatTransaksiRiwayat() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [transaksiData, setTransaksiData] = useState([]);
  const [filterOption, setFilterOption] = useState("Semua");

  useEffect(() => {
    const fetchTransaksiData = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/datatransaksi"
        );
        console.log("Transaksi data:", response.data);

        // Make sure response.data.transaksi is defined and is an array
        if (Array.isArray(response.data.transaksi)) {
          setTransaksiData(response.data.transaksi);
        } else {
          console.error("Invalid transaksi data:", response.data.transaksi);
        }
      } catch (error) {
        console.error("Error fetching transaksi data:", error.message);
      }
    };

    fetchTransaksiData();
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

  // Handle filter change
  const handleFilterChange = (value) => {
    setFilterOption(value);
  };

  // Apply filter
  const filteredTransaksiData = transaksiData.filter((transaksi) => {
    if (filterOption === "Hari Ini") {
      const today = new Date();
      const transaksiDate = new Date(transaksi.tanggal);
      return (
        transaksiDate.getDate() === today.getDate() &&
        transaksiDate.getMonth() === today.getMonth() &&
        transaksiDate.getFullYear() === today.getFullYear()
      );
    } else {
      return true;
    }
  });

  const handlePrintRiwayat = async () => {
    try {
      // Fetch the list of transactions based on the filter
      const response = await axios.get(
        "https://bekk.up.railway.app/datatransaksi"
      );
      const transaksiListForPrint = response.data.transaksi;

      // Filter the transactions based on the selected filter option
      const filteredTransaksiList = transaksiListForPrint.filter(
        (transaksi) => {
          if (filterOption === "Hari Ini") {
            const today = new Date();
            const transaksiDate = new Date(transaksi.tanggal);
            return (
              transaksiDate.getDate() === today.getDate() &&
              transaksiDate.getMonth() === today.getMonth() &&
              transaksiDate.getFullYear() === today.getFullYear()
            );
          } else {
            return true;
          }
        }
      );

      // Hitung total pemasukan berdasarkan filter
      const totalPemasukan = filteredTransaksiList.reduce(
        (total, transaksi) => total + parseFloat(transaksi.total_harga),
        0
      );

      // Open a new window for printing
      const printWindow = window.open("", "_blank");

      // Create a print document
      const printDocument = printWindow.document;

      // Add your table content to the print document with inline styles
      printDocument.write(`
        <html>
          <head>
            <title>Riwayat Transaksi</title>
          </head>
          <body style="
            font-family: Arial, sans-serif;
          ">
            <div style="
              width: 100%;
              border-collapse: collapse;
              margin-top: 1em;
              overflow-x: auto;
            ">
              <!-- Image for letterhead -->
              <img src="/kop.png" alt="Letterhead" style="width: 100%; max-height: 150px; object-fit: cover; margin-bottom: 5px;">
  
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
                    <th style="
                      border: 1px solid #ddd;
                      padding: 8px;
                      text-align: left;
                    ">
                      Tanggal
                    </th>
                    <th style="
                      border: 1px solid #ddd;
                      padding: 8px;
                      text-align: left;
                    ">
                      Nama 
                    </th>
                    <th style="
                      border: 1px solid #ddd;
                      padding: 8px;
                      text-align: left;
                    ">
                      Harga
                    </th>
                  </tr>
                </thead>
                <tbody>
                  ${filteredTransaksiList
                    .map(
                      (transaksi) => `
                        <tr style="
                          background-color: #fff;
                        ">
                          <td style="
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                          ">${transaksi.id}</td>
                          <td style="
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                          ">${transaksi.tanggal}</td>
                          <td style="
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                          ">${transaksi.nama_pembeli}</td>
                          <td style="
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                          ">Rp. ${transaksi.total_harga}</td>
                        </tr>
                      `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
  
            <!-- Total Pemasukan -->
            <div style="
              margin-top: 1em;
            ">
              <strong>Total Pemasukan: Rp. ${totalPemasukan.toLocaleString()}</strong>
            </div>
            <!-- Total Pemasukan end -->
          </body>
        </html>
      `);

      // Close the document and initiate printing
      printDocument.close();
      printWindow.print();
    } catch (error) {
      console.error(
        "Error fetching transaksi list for printing:",
        error.message
      );
    }
  };

  // Hitung total pemasukan berdasarkan filter
  const totalPemasukan = filteredTransaksiData.reduce(
    (total, transaksi) => total + parseFloat(transaksi.total_harga),
    0
  );

  return (
    <div className="bg-[#ffcccc] min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Admin" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/Admin/Obat">Obat</Breadcrumb.Item>
        <Breadcrumb.Item href="/Admin/Obat/Transaksi">
          Transaksi
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Riwayat</Breadcrumb.Item>
      </Breadcrumb>
      {/* Breadcrumb end */}

      {/* Dropdown filter */}
      <div className="mt-8 ml-4">
        <select
          className="bg-[#333] text-white p-1 rounded-xl text-center outline-none cursor-pointer"
          value={filterOption}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="Semua">Semua</option>
          <option value="Hari Ini">Hari Ini</option>
        </select>
      </div>
      {/* Dropdown filter end */}

      {/* Cetak */}
      {/* Cetak rekap Obat */}
      <Button
        className="mt-8 ml-4"
        color="light"
        pill
        onClick={handlePrintRiwayat}
      >
        Cetak Riwayat Transaksi
      </Button>

      {/* Cetak rekap Obat end */}
      {/* Cetak end */}

      {/* Table Riwayat */}
      <div className="overflow-x-auto mt-8">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell style={{ background: "#333", color: "white" }}>
              ID
            </Table.HeadCell>
            <Table.HeadCell style={{ background: "#333", color: "white" }}>
              Tanggal
            </Table.HeadCell>
            <Table.HeadCell style={{ background: "#333", color: "white" }}>
              Nama
            </Table.HeadCell>
            <Table.HeadCell style={{ background: "#333", color: "white" }}>
              Harga
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {filteredTransaksiData.map((transaksi) => (
              <Table.Row key={transaksi.id}>
                <Table.Cell>{transaksi.id}</Table.Cell>
                <Table.Cell>{transaksi.tanggal}</Table.Cell>
                <Table.Cell>{transaksi.nama_pembeli}</Table.Cell>
                <Table.Cell>Rp. {transaksi.total_harga}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {/* Table Riwayat end */}

      {/* Total Pemasukan */}
      <div className="mt-4 ml-4">
        <strong>Total Pemasukan: Rp. {totalPemasukan.toLocaleString()}</strong>
      </div>
      {/* Total Pemasukan end */}
    </div>
  );
}
