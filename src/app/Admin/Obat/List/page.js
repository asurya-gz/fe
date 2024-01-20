"use client";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Table } from "flowbite-react";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FiPrinter } from "react-icons/fi";

export default function AdminObatList() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [obatList, setObatList] = useState([]);

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
    <div className="min-h-screen bg-[#ffcccc]">
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
      {/* Button Cetak List Obat */}
      <Button className="mt-8 ml-4" color="light" pill onClick={handlePrint}>
        <FiPrinter size="1.5em" style={{ marginRight: "0.5em" }} />
        list
      </Button>
      {/* Button Cetak List Obat End*/}
      {/* Table */}
      <div className="overflow-x-auto mt-8">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell style={{ background: "#333", color: "white" }}>
              Nama Obat
            </Table.HeadCell>
            <Table.HeadCell style={{ background: "#333", color: "white" }}>
              Harga
            </Table.HeadCell>
            <Table.HeadCell style={{ background: "#333", color: "white" }}>
              Jenis
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {obatList.map((obat) => (
              <Table.Row key={obat.id}>
                <Table.Cell className="text-black">{obat.nama_obat}</Table.Cell>
                <Table.Cell className="text-black">Rp. {obat.harga}</Table.Cell>
                <Table.Cell className="text-black">{obat.jenis}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {/* Table end */}
    </div>
  );
}
