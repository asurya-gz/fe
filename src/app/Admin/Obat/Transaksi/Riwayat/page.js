"use client";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Table } from "flowbite-react";
import { Button } from "flowbite-react";
import { FiPrinter } from "react-icons/fi";
import Link from "next/link";

export default function ApotekerTransaksiRiwayat() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [transaksiData, setTransaksiData] = useState([]);
  const [filterOption, setFilterOption] = useState("Semua");
  const [searchInput, setSearchInput] = useState("");
  const [selectedTransaksiId, setSelectedTransaksiId] = useState(null);
  const [detailTransaksi, setDetailTransaksi] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [obatInfo, setObatInfo] = useState({});
  const [selectedTransactionDetails, setSelectedTransactionDetails] =
    useState(null);

  const closeModal = () => {
    // Tutup modal dan reset state
    setIsModalOpen(false);
    setDetailTransaksi(null);
  };

  // Function to calculate total harga from detailTransaksi
  const calculateTotalHarga = (detailTransaksi) => {
    const totalHarga = detailTransaksi.reduce(
      (total, item) => total + parseFloat(item.harga),
      0
    );
    return totalHarga.toLocaleString();
  };

  // Fungsi handleDetailClick untuk menanggapi klik pada kolom ID
  const handleDetailClick = async (transaksiId) => {
    try {
      // Ambil informasi dari tabel transaksi
      const transaksiResponse = await axios.get(
        `https://bekk.up.railway.app/transaksi/${transaksiId}`
      );
      const transaksi = transaksiResponse.data.transaksi;

      // Simpan informasi yang diperlukan
      const selectedDetail = {
        nama_pembeli: transaksi?.nama_pembeli,
        tanggal: transaksi?.tanggal,
      };
      setSelectedTransactionDetails(selectedDetail);
      const response = await axios.get(
        `https://bekk.up.railway.app/detailtransaksi/${transaksiId}`
      );
      const detailTransaksi = response.data.detailTransaksi;

      // Set detailTransaksi ke state dan buka modal
      setDetailTransaksi(detailTransaksi);
      setIsModalOpen(true);

      // Lakukan sesuatu dengan detailTransaksi, misalnya tampilkan dalam modal atau komponen lainnya
      console.log(detailTransaksi);
    } catch (error) {
      console.error("Error fetching detail transaksi:", error.message);
    }
  };

  const handleSearchChange = (value) => {
    setSearchInput(value);
  };

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
      return (
        transaksi.nama_pembeli
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        transaksi.id.toString().includes(searchInput.toLowerCase()) ||
        transaksi.tanggal.toLowerCase().includes(searchInput.toLowerCase()) ||
        transaksi.total_harga.toString().includes(searchInput.toLowerCase())
      );
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

  const handlePrint = async () => {
    try {
      const { nama_pembeli, tanggal } = selectedTransactionDetails;

      // Ubah format tanggal
      const formattedTanggal = new Date(tanggal).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      // Open a new window for printing
      const printWindow = window.open("", "_blank");

      // Create a print document
      const printDocument = printWindow.document;

      // Add your table content to the print document with improved styles
      printDocument.write(`
        <html>
          <head>
            <title>Detail Transaksi Obat</title>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                margin: 20px;
              }
              .container {
                width: 100%;
                max-width: 800px;
                margin: 0 auto;
              }
              img {
                width: 100%;
                max-height: 150px;
                object-fit: cover;
                margin-bottom: 10px;
              }
              h2 {
                text-align: center;
                margin-bottom: 20px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 12px;
                text-align: left;
              }
              tbody tr:nth-child(even) {
                background-color: #f2f2f2;
              }
              .total {
                margin-top: 20px;
                text-align: right;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <!-- Image for letterhead -->
              <img src="/kop.png" alt="Letterhead">
    
              <h2>Detail Transaksi Obat</h2><br><br>
  
              <!-- Nama Pembeli dan Tanggal -->
              <div class="info">
                <strong>Nama Pembeli:</strong> ${nama_pembeli} <br><br>
                <strong>Tanggal:</strong> ${formattedTanggal}
              </div>
    
              <table>
                <thead>
                  <tr>
                    <th>Obat ID</th>
                    <th>Nama Obat</th>
                    <th>Quantity</th>
                    <th>Harga</th>
                  </tr>
                </thead>
                <tbody>
                  ${detailTransaksi
                    .map(
                      (item) => `
                        <tr>
                          <td>${item.obat_id}</td>
                          <td>${item.nama_obat}</td>
                          <td>${item.quantity}</td>
                          <td>${item.harga}</td>
                        </tr>
                      `
                    )
                    .join("")}
                </tbody>
              </table>
    
              <!-- Total Harga -->
              <div class="total">
                <strong>Total Harga: Rp. ${calculateTotalHarga(
                  detailTransaksi
                )}</strong>
              </div>
            </div>
          </body>
        </html>
      `);

      // Close the document and initiate printing
      printDocument.close();
      printWindow.print();
    } catch (error) {
      console.error("Error printing detail transaksi:", error.message);
    }
  };

  // Hitung total pemasukan berdasarkan filter
  const totalPemasukan = filteredTransaksiData.reduce(
    (total, transaksi) => total + parseFloat(transaksi.total_harga),
    0
  );

  return (
    <div className="bg-slate-400 min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Admin" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/Admin/Obat/Transaksi">
          Transaksi
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Riwayat</Breadcrumb.Item>
      </Breadcrumb>
      {/* Breadcrumb end */}

      {/* Search input */}
      <div className="mt-8 ml-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="bg-white p-1 rounded-xl outline-none"
        />
      </div>
      {/* Search input end */}
      <div className="flex">
        {" "}
        {/* Cetak rekap Obat */}
        <Button
          className="mt-8 ml-4"
          color="blue"
          pill
          onClick={handlePrintRiwayat}
        >
          <FiPrinter size="1.5em" style={{ marginRight: "0.5em" }} />
          Riwayat
        </Button>
        {/* Cetak rekap Obat end */}
        {/* Dropdown filter */}
        <div className="mt-8 ml-4">
          <select
            className="bg-amber-400 text-black p-2 rounded-xl text-center outline-none cursor-pointer"
            value={filterOption}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="Semua">Semua</option>
            <option value="Hari Ini">Hari Ini</option>
          </select>
        </div>
        {/* Dropdown filter end */}
      </div>
      {/* Cetak end */}

      {/* Table Riwayat */}
      <div className="overflow-x-auto mt-8 mx-4">
        <table className="min-w-full">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Tanggal</th>
              <th className="py-2 px-4">Nama</th>
              <th className="py-2 px-4">Harga</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransaksiData.map((transaksi) => (
              <tr
                key={transaksi.id}
                className="border-t border-gray-300 cursor-pointer"
                onClick={() => handleDetailClick(transaksi.id)}
              >
                <td className="py-2 px-4 bg-slate-300">{transaksi.id}</td>
                <td className="py-2 px-4 bg-slate-300">{transaksi.tanggal}</td>
                <td className="py-2 px-4 bg-slate-300">
                  {transaksi.nama_pembeli}
                </td>
                <td className="py-2 px-4 bg-slate-300">
                  Rp. {transaksi.total_harga}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Table Riwayat end */}
      {/* Modal Detail Transaksi */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
              <div className="text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Detail Transaksi #{detailTransaksi[0].transaksi_id}
                </h3>
              </div>
              <button
                onClick={handlePrint}
                className="border mb-4 border-blue-800 rounded ml-4 p-2 text-black"
              >
                Cetak Pembelian Obat
              </button>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead>
                    <tr className="bg-gray-800 text-white">
                      <th className="py-2 px-4 border border-black">Obat ID</th>
                      <th className="py-2 px-4 border border-black">
                        Nama Obat
                      </th>
                      <th className="py-2 px-4 border border-black">
                        Quantity
                      </th>
                      <th className="py-2 px-4 border border-black">Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailTransaksi.map((item) => (
                      <tr key={item.id} className="border-t border-gray-300">
                        <td className="py-2 px-4 border border-black">
                          {item.obat_id}
                        </td>
                        <td className="py-2 px-4 border border-black">
                          {item.nama_obat}
                        </td>
                        <td className="py-2 px-4 border border-black">
                          {item.quantity}
                        </td>
                        <td className="py-2 px-4 border border-black">
                          {item.harga}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-5">
                <strong>
                  Total Harga: Rp. {calculateTotalHarga(detailTransaksi)}
                </strong>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeModal}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal Detail Transaksi end */}

      {/* Total Pemasukan */}
      <div className="mt-4 ml-4 text-white font-bold">
        <strong>Total Pemasukan: Rp. {totalPemasukan.toLocaleString()}</strong>
      </div>
      {/* Total Pemasukan end */}
    </div>
  );
}
