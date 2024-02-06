"use client";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Button } from "flowbite-react";
import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FiPrinter } from "react-icons/fi";

export default function ApotekerObatRekap() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [obatList, setObatList] = useState([]);
  const [filterValue, setFilterValue] = useState("Semua");

  // Mengambil data obat
  useEffect(() => {
    // Fetch the list of drugs
    const fetchObatList = async () => {
      try {
        const response = await axios.get("https://bekk.up.railway.app/obat");
        console.log("Obat list:", response.data.obat);
        setObatList(response.data.obat);
      } catch (error) {
        console.error("Error fetching obat list:", error.message);
      }
    };

    fetchObatList();
  }, []);
  // Mengambil data obat end

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
  // Session end

  // Saran pembelian
  const handleSaranPembelian = (jumlahObat) => {
    if (jumlahObat < 3) {
      return "Beli Obat";
    } else {
      return "Obat Tersedia";
    }
  };
  // Saran pembelian end

  // Print
  const handlePrint = async () => {
    try {
      // Fetch the list of drugs based on the selected filter
      const response = await axios.get("https://bekk.up.railway.app/obat");
      const obatListForPrint = response.data.obat.filter((obat) => {
        if (filterValue === "Semua") {
          return true;
        } else {
          return handleSaranPembelian(obat.jumlah) === filterValue;
        }
      });

      // Open a new window for printing
      const printWindow = window.open("", "_blank");

      // Create a print document
      const printDocument = printWindow.document;

      // Add your table content to the print document with inline styles
      printDocument.write(`
      <html>
        <head>
          <title>Rekap Obat</title>
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
                    Nama
                  </th>
                  <th style="
                  border: 1px solid #ddd;
                  padding: 8px;
                  text-align: left;
                ">
                  Jenis
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
                    Saran Pembelian
                  </th>
                </tr>
              </thead>
              <tbody>
                ${obatListForPrint
                  .map(
                    (obat) => `
                      <tr style="
                        background-color: #fff;
                      ">
                        <td style="
                          border: 1px solid #ddd;
                          padding: 8px;
                          text-align: left;
                        ">${obat.nama_obat}</td>
                        <td style="
                          border: 1px solid #ddd;
                          padding: 8px;
                          text-align: left;
                        ">${obat.jenis}</td>
                        <td style="
                          border: 1px solid #ddd;
                          padding: 8px;
                          text-align: left;
                        ">${obat.jumlah}</td>
                        <td style="
                          border: 1px solid #ddd;
                          padding: 8px;
                          text-align: left;
                        ">${handleSaranPembelian(obat.jumlah)}</td>
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
      console.error("Error fetching obat list for printing:", error.message);
    }
  };
  // Print end

  return (
    <div className="min-h-screen bg-slate-400">
      {" "}
      {/* Breadcrumb */}
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Apoteker" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/Apoteker/Obat">Obat</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Rekap</Breadcrumb.Item>
      </Breadcrumb>
      {/* Breadcrumb end */}
      <div className="flex">
        {" "}
        {/* Cetak rekap Obat */}
        <Button className="mt-8 ml-4" color="blue" pill onClick={handlePrint}>
          <FiPrinter size="1.5em" style={{ marginRight: "0.5em" }} />
          Cetak
        </Button>
        {/* Cetak rekap Obat end */}
        {/* Filter */}
        <div className="mt-8 ml-4">
          <select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="text-black p-2 bg-yellow-300 rounded-xl text-center outline-none cursor-pointer border-none"
          >
            <option value="Semua">Semua</option>
            <option value="Beli Obat">Beli Obat</option>
            <option value="Obat Tersedia">Obat Tersedia</option>
          </select>
        </div>
        {/* Filter end */}
      </div>
      {/* Table rekap */}
      <div className="overflow-x-auto mt-8 mx-4">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell style={{ background: "darkBlue", color: "white" }}>
              Obat
            </Table.HeadCell>
            <Table.HeadCell style={{ background: "darkBlue", color: "white" }}>
              Jenis
            </Table.HeadCell>
            <Table.HeadCell style={{ background: "darkBlue", color: "white" }}>
              Jumlah
            </Table.HeadCell>
            <Table.HeadCell style={{ background: "darkBlue", color: "white" }}>
              Saran Pembelian
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {obatList
              .filter((obat) => {
                if (filterValue === "Semua") {
                  return true;
                } else {
                  return handleSaranPembelian(obat.jumlah) === filterValue;
                }
              })
              .map((obat) => (
                <Table.Row key={obat.id}>
                  <Table.Cell className="text-black bg-slate-300">
                    {obat.nama_obat}
                  </Table.Cell>
                  <Table.Cell className="text-black bg-slate-300">
                    {obat.jenis}
                  </Table.Cell>
                  <Table.Cell className="text-black bg-slate-300">
                    {obat.jumlah}
                  </Table.Cell>
                  <Table.Cell className="text-black bg-slate-300">
                    {handleSaranPembelian(obat.jumlah)}
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
      {/* Table rekap end */}
    </div>
  );
}
