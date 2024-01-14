"use client";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function ApotekerTransaksiRiwayatDetailTransaksi() {
  const [user, setUser] = useState(null);
  const [detailTransaksi, setDetailTransaksi] = useState([]);
  const router = useRouter();
  const [transaksiIdFilter, setTransaksiIdFilter] = useState("");

  // Handle perubahan filter Transaksi ID
  const handleTransaksiIdFilterChange = (value) => {
    setTransaksiIdFilter(value);
  };

  // Filter detailTransaksi berdasarkan Transaksi ID
  const filteredDetailTransaksi = detailTransaksi.filter((row) =>
    row.transaksi_id.toString().includes(transaksiIdFilter)
  );

  // Fetch data detail_transaksi
  useEffect(() => {
    const fetchDetailTransaksi = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/detail_transaksi",
          {
            withCredentials: true,
          }
        );
        console.log("Detail Transaksi data:", response.data);
        setDetailTransaksi(response.data.detail_transaksi);
      } catch (error) {
        console.error("Error fetching detail_transaksi:", error.message);
        // Handle error, misalnya menampilkan pesan error
      }
    };

    fetchDetailTransaksi();
  }, []); // Dependency array kosong memastikan efek ini hanya berjalan sekali saat komponen dipasang

  // Session
  useEffect(() => {
    // Mengambil detail pengguna atau memeriksa status sesi
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://bekk.up.railway.app/user", {
          withCredentials: true,
        });
        console.log("Data Pengguna:", response.data);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error.message);
        // Redirect ke halaman login jika tidak terotentikasi
        router.push("/");
      }
    };

    fetchUser();
  }, [router]);

  const handlePrintClick = async () => {
    try {
      // Fetch the list of detail transactions based on the filter
      const response = await axios.get(
        "https://bekk.up.railway.app/detail_transaksi"
      );
      const detailTransaksiListForPrint = response.data.detail_transaksi;

      // Filter the detail transactions based on the selected filter option
      const filteredDetailTransaksiList = detailTransaksiListForPrint.filter(
        (detailTransaksi) => {
          // Customize the filtering logic based on your requirements
          return detailTransaksi.transaksi_id
            .toString()
            .includes(transaksiIdFilter);
        }
      );

      // Open a new window for printing
      const printWindow = window.open("", "_blank");

      // Create a print document
      const printDocument = printWindow.document;

      // Add your table content to the print document with inline styles
      printDocument.write(`
        <html>
          <head>
            <title>Detail Transaksi</title>
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
                      Transaksi ID
                    </th>
                    <th style="
                      border: 1px solid #ddd;
                      padding: 8px;
                      text-align: left;
                    ">
                      Obat
                    </th>
                    <th style="
                      border: 1px solid #ddd;
                      padding: 8px;
                      text-align: left;
                    ">
                      Jumlah
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
                  ${filteredDetailTransaksiList
                    .map(
                      (detailTransaksi) => `
                        <tr style="
                          background-color: #fff;
                        ">
                          <td style="
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                          ">${detailTransaksi.transaksi_id}</td>
                          <td style="
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                          ">${detailTransaksi.nama_obat}</td>
                          <td style="
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                          ">${detailTransaksi.quantity}</td>
                          <td style="
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                          ">${detailTransaksi.harga}</td>
                        </tr>
                      `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          </body>
        </html>
      `);

      // Close the document and initiate printing
      printDocument.close();
      printWindow.print();
    } catch (error) {
      console.error(
        "Error fetching detail transaksi list for printing:",
        error.message
      );
    }
  };

  return (
    <div className="bg-[#ffcccc] min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Apoteker" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/Apoteker/Transaksi">Transaksi</Breadcrumb.Item>
        <Breadcrumb.Item href="/Apoteker/Transaksi/Riwayat">
          Riwayat
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Detail</Breadcrumb.Item>
      </Breadcrumb>
      {/* Breadcrumb end */}

      {/* Input filter Transaksi ID */}
      <div className="mt-8 ml-4">
        <input
          type="text"
          placeholder="Filter berdasarkan Transaksi ID"
          value={transaksiIdFilter}
          onChange={(e) => handleTransaksiIdFilterChange(e.target.value)}
          className="bg-white p-1 rounded-xl outline-none"
        />
      </div>
      {/* Input filter Transaksi ID end */}

      {/* Print button */}
      <div className="mt-4 ml-4">
        <Button
          onClick={handlePrintClick}
          color="light"
          pill
          className="mt-8 ml-4"
        >
          Cetak Data
        </Button>
      </div>
      {/* Print button end */}
      {/* Menampilkan data detail_transaksi yang telah diambil */}
      <div className="overflow-x-auto mt-8">
        <table className="border-collapse w-full">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="border border-slate-900 px-4 py-2">
                Transaksi ID
              </th>
              <th className="border border-slate-900 px-4 py-2">Obat</th>
              <th className="border border-slate-900 px-4 py-2">Jumlah</th>
              <th className="border border-slate-900 px-4 py-2">Harga</th>
            </tr>
          </thead>
          <tbody>
            {filteredDetailTransaksi.length > 0 ? (
              filteredDetailTransaksi.map((row) => (
                <tr key={row.id}>
                  <td className="border border-slate-900 px-4 py-2">
                    {row.transaksi_id}
                  </td>
                  <td className="border border-slate-900 px-4 py-2">
                    {row.nama_obat}
                  </td>
                  <td className="border border-slate-900 px-4 py-2">
                    {row.quantity}
                  </td>
                  <td className="border border-slate-900 px-4 py-2">
                    {row.harga}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="border border-slate-900 px-4 py-2 text-center"
                >
                  Tidak ada data yang tersedia
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
