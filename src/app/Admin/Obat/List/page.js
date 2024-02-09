"use client";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Table } from "flowbite-react";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FiPrinter } from "react-icons/fi";

export default function ApotekerObatList() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [obatList, setObatList] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch the list of drugs based on the selected filter
    const fetchObatList = async () => {
      try {
        const response = await axios.get(
          `https://bekk.up.railway.app/obat?jenis=${filter}`
        );
        console.log("Obat list:", response.data.obat);
        setObatList(response.data.obat);
      } catch (error) {
        console.error("Error fetching obat list:", error.message);
      }
    };

    fetchObatList();
  }, [filter]); // Update the data when the filter changes

  // Print
  const handlePrint = async () => {
    try {
      // Fetch the list of drugs before printing
      const response = await axios.get("https://bekk.up.railway.app/obat");
      const obatListForPrint = response.data.obat;

      // Open a new window for printing
      const printWindow = window.open("", "_blank");

      // Create a print document
      const printDocument = printWindow.document;

      // Add your table content to the print document with inline styles
      printDocument.write(`
        <html>
          <head>
            <title>List Obat</title>
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
                      Nama Obat
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
                          ">Rp. ${obat.harga}</td>
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

  // Filter the drug list based on search query
  const filteredObatList = obatList.filter((obat) =>
    obat.nama_obat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch Data Obat
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
  // Fetch Data Obat end

  return (
    <div className="min-h-screen bg-slate-400">
      {" "}
      {/* Breadcrumb */}
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Admin" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/Admin/Obat">Obat</Breadcrumb.Item>
        <Breadcrumb.Item href="#">List</Breadcrumb.Item>
      </Breadcrumb>
      {/* Breadcrumb end */}
      <div className="mt-8 ml-4">
        <input
          type="text"
          placeholder="Cari obat..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-2xl border-none bg-slate-300 px-4 py-2"
        />
      </div>
      <div className="flex">
        {" "}
        {/* Button Cetak List Obat */}
        <Button className="mt-8 ml-4" color="blue" pill onClick={handlePrint}>
          <FiPrinter size="1.5em" style={{ marginRight: "0.5em" }} />
          Cetak
        </Button>
        {/* Button Cetak List Obat End*/}
        {/* Dropdown Filter */}
        <div className="mt-8 ml-4">
          <select
            className="rounded-2xl border-none bg-yellow-300"
            id="jenisFilter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="INJEKSI">Injeksi</option>
            <option value="OBAT">Obat</option>
          </select>
        </div>
        {/* Dropdown Filter End */}
      </div>
      {/* Table */}
      <div className="overflow-x-auto mt-8 mx-4">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell style={{ background: "darkBlue", color: "white" }}>
              Nama Obat
            </Table.HeadCell>
            <Table.HeadCell style={{ background: "darkBlue", color: "white" }}>
              Harga
            </Table.HeadCell>
            <Table.HeadCell style={{ background: "darkBlue", color: "white" }}>
              Jenis
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {filteredObatList.map((obat) => (
              <Table.Row key={obat.id}>
                <Table.Cell className="text-black bg-slate-300">
                  {obat.nama_obat}
                </Table.Cell>
                <Table.Cell className="text-black bg-slate-300">
                  Rp. {obat.harga}
                </Table.Cell>
                <Table.Cell className="text-black bg-slate-300">
                  {obat.jenis}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {/* Table end */}
    </div>
  );
}
