"use client";
import { Breadcrumb, Button } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { FaListUl } from "react-icons/fa";
import { MdSummarize } from "react-icons/md";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FiPrinter } from "react-icons/fi";

export default function PemilikRekamMedis() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [rekamMedisList, setRekamMedisList] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [tindakanPasienList, setTindakanPasienList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter rekamMedisList based on no_medrek
  const filteredRekamMedisList = rekamMedisList.filter((record) =>
    record.no_medrek.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateTotalHarga = () => {
    const totalHarga = tindakanPasienList
      .filter((tindakan) => tindakan.id_rekam_medis === selectedRecord.id)
      .reduce((total, tindakan) => total + tindakan.harga * tindakan.jumlah, 0);

    return totalHarga;
  };

  const handlePrintRekamMedis = () => {
    // Open a new window for printing
    const printWindow = window.open("", "_blank");

    // Create a print document
    const printDocument = printWindow.document;

    const totalHarga = calculateTotalHarga();

    // Add your printable content to the print document with inline styles
    printDocument.write(`
    <html>
      <head>
        <title>Rekam Medis</title>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            overflow-x: auto;
          }
          table, th, td {
            border: 1px solid #ddd;
          }
          th, td {
            padding: 8px;
            text-align: left;
          }
          .signature-section {
            text-align: right; 
          }
          .signature-line {
            width: 50%;
            border-bottom: 1px solid #000;
            margin-top: 0.5em;
          }
          .letterhead-img {
            width: 100%;
            height: 110px;
            object-fit: cover;
            margin-bottom: 5px;
            page-break-inside: avoid; 
          }
        </style>
      </head>
      <body>
      <!-- Image for letterhead -->
        <img src="/kop.png" alt="Letterhead" class="letterhead-img">
        <br><br>
        <!-- Your printable content here -->
        <table>
          <tr>
            <th>ID Rekam Medis</th>
            <td>${selectedRecord.id}</td>
          </tr>
          <tr>
            <th>No. Medrek</th>
            <td>${selectedRecord.no_medrek}</td>
          </tr>
          <tr>
            <th>Nama Pasien</th>
            <td>${selectedRecord.nama_pasien}</td>
          </tr>
          <tr>
            <th>Alamat Pasien</th>
            <td>${selectedRecord.alamat_pasien}</td>
          </tr>
          <tr>
            <th>Tanggal Lahir</th>
            <td>${selectedRecord.tanggal_lahir}</td>
          </tr>
          <tr>
            <th>Subjective</th>
            <td>${selectedRecord.subjective}</td>
          </tr>
          <tr>
            <th>TD (Tensi Darah)</th>
            <td>${selectedRecord.td}</td>
          </tr>
          <tr>
            <th>N (Nadi)</th>
            <td>${selectedRecord.n}</td>
          </tr>
          <tr>
            <th>R (Respirasi)</th>
            <td>${selectedRecord.r}</td>
          </tr>
          <tr>
            <th>S (Suhu)</th>
            <td>${selectedRecord.s}</td>
          </tr>
          <tr>
            <th>BB (Berat Badan)</th>
            <td>${selectedRecord.bb}</td>
          </tr>
          <tr>
            <th>TB (Tinggi Badan)</th>
            <td>${selectedRecord.tb}</td>
          </tr>
          <tr>
            <th>LK (Lingkar Kepala)</th>
            <td>${selectedRecord.lk}</td>
          </tr>
          <tr>
            <th>Keterangan</th>
            <td>${selectedRecord.keterangan}</td>
          </tr>
          <tr>
            <th>Assessment</th>
            <td>${selectedRecord.assessment}</td>
          </tr>
          <tr>
            <th>Plan</th>
            <td>${selectedRecord.plan}</td>
          </tr>
        </table>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tindakan</th>
              <th>Harga</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            ${tindakanPasienList
              .filter(
                (tindakan) => tindakan.id_rekam_medis === selectedRecord.id
              )
              .map(
                (tindakan) => `
                  <tr>
                    <td>${tindakan.id}</td>
                    <td>${tindakan.tindakan_nama}</td>
                    <td>${tindakan.harga}</td>
                    <td>${tindakan.jumlah}</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
        <!-- Total Harga -->
        <div style="margin-top: 1em;">
          <strong>Total Harga: Rp. ${totalHarga.toLocaleString()}</strong>
        </div>

        <!-- Signature Section -->
        <div class="signature-section">
          <p>Penanggung Jawab Pasien:</p>
          <br><br><br>
          <p>........................</p>
        </div>
      </body>
    </html>
  `);

    // Close the document and initiate printing
    printDocument.close();
    printWindow.print();
  };
  const handlePrintBuktiRekamMedis = () => {
    // Open a new window for printing
    const printWindow = window.open("", "_blank");

    // Create a print document
    const printDocument = printWindow.document;

    const totalHarga = calculateTotalHarga();

    // Add your printable content to the print document with inline styles
    printDocument.write(`
    <html>
      <head>
        <title>Rekam Medis</title>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            overflow-x: auto;
          }
          table, th, td {
            border: 1px solid #ddd;
          }
          th, td {
            padding: 8px;
            text-align: left;
          }
          .signature-section {
            text-align: right; 
          }
          .signature-line {
            width: 50%;
            border-bottom: 1px solid #000;
            margin-top: 0.5em;
          }
          .letterhead-img {
            width: 100%;
            height: 110px;
            object-fit: cover;
            margin-bottom: 5px;
            page-break-inside: avoid; 
          }
        </style>
      </head>
      <body>
      <!-- Image for letterhead -->
        <img src="/kop.png" alt="Letterhead" class="letterhead-img">
        <br><br>
        <!-- Your printable content here -->
        <table>
          <tr>
            <th>ID Rekam Medis</th>
            <td>${selectedRecord.id}</td>
          </tr>
          <tr>
            <th>No. Medrek</th>
            <td>${selectedRecord.no_medrek}</td>
          </tr>
          <tr>
            <th>Nama Pasien</th>
            <td>${selectedRecord.nama_pasien}</td>
          </tr>
          <tr>
            <th>Alamat Pasien</th>
            <td>${selectedRecord.alamat_pasien}</td>
          </tr>
          <tr>
            <th>Tanggal Lahir</th>
            <td>${selectedRecord.tanggal_lahir}</td>
          </tr>

        </table>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tindakan</th>
              <th>Harga</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            ${tindakanPasienList
              .filter(
                (tindakan) => tindakan.id_rekam_medis === selectedRecord.id
              )
              .map(
                (tindakan) => `
                  <tr>
                    <td>${tindakan.id}</td>
                    <td>${tindakan.tindakan_nama}</td>
                    <td>${tindakan.harga}</td>
                    <td>${tindakan.jumlah}</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
        <!-- Total Harga -->
        <div style="margin-top: 1em;">
          <strong>Total Harga: Rp. ${totalHarga.toLocaleString()}</strong>
        </div>

        <!-- Signature Section -->
        <div class="signature-section">
          <p>Penanggung Jawab Pasien:</p>
          <br><br><br>
          <p>........................</p>
        </div>
      </body>
    </html>
  `);

    // Close the document and initiate printing
    printDocument.close();
    printWindow.print();
  };

  // Mengambil data rekam medis
  useEffect(() => {
    // Fetch the list of medical records
    const fetchRekamMedisList = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/rekam_medis"
        );
        console.log("Rekam Medis list:", response.data.rekam_medis);
        setRekamMedisList(response.data.rekam_medis);
      } catch (error) {
        console.error("Error fetching rekam medis list:", error.message);
      }
    };

    fetchRekamMedisList();
  }, []);

  // Mengambil data tindakan pasien
  useEffect(() => {
    const fetchTindakanPasienList = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/tindakan_pasien"
        );
        console.log("Tindakan Pasien list:", response.data.tindakan_pasien);
        setTindakanPasienList(response.data.tindakan_pasien);
      } catch (error) {
        console.error("Error fetching tindakan pasien list:", error.message);
      }
    };

    fetchTindakanPasienList();
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

  // Handle click on medical records box
  const handleRecordClick = (record) => {
    setSelectedRecord(record);
  };

  return (
    <div className="bg-[#ffcccc] h-screen">
      {/* Breadcrumb */}
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Pemilik" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Rekam Medis</Breadcrumb.Item>
      </Breadcrumb>
      {/* Breadcrumb end */}

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by No. Medrek"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 m-4 border rounded"
      />
      {/* Search Input end */}

      {/* Box Pilihan Rekam Medis */}
      <div className="flex flex-wrap justify-around p-4">
        {filteredRekamMedisList.map((record) => (
          <div
            key={record.id}
            className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-2"
            onClick={() => handleRecordClick(record)}
            style={{ cursor: "pointer" }}
          >
            <div className="bg-white p-4 rounded shadow-md">
              <p className="font-semibold text-lg mb-2">ID Rekam Medis</p>
              <p>{record.id}</p>
              <p className="font-semibold text-lg mt-4 mb-2">No. Medrek</p>
              <p>{record.no_medrek}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Box Pilihan Rekam Medis end */}

      {selectedRecord && (
        <div className="p-4 bg-white mt-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Detail Rekam Medis dan Tindakan Pasien
          </h2>

          {/* Table for Detail Rekam Medis */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border">
              <tbody>
                <tr>
                  <td className="border p-2 font-semibold">ID Rekam Medis:</td>
                  <td className="border p-2">{selectedRecord.id}</td>
                </tr>
                <tr>
                  <td className="border p-2">No. Medrek:</td>
                  <td className="border p-2">{selectedRecord.no_medrek}</td>
                </tr>
                <tr>
                  <td className="border p-2">Nama Pasien:</td>
                  <td className="border p-2">{selectedRecord.nama_pasien}</td>
                </tr>
                <tr>
                  <td className="border p-2">Alamat Pasien:</td>
                  <td className="border p-2">{selectedRecord.alamat_pasien}</td>
                </tr>
                <tr>
                  <td className="border p-2">Tanggal Lahir:</td>
                  <td className="border p-2">{selectedRecord.tanggal_lahir}</td>
                </tr>
                <tr>
                  <td className="border p-2">Subjective:</td>
                  <td className="border p-2">{selectedRecord.subjective}</td>
                </tr>
                <tr>
                  <td className="border p-2">TD:</td>
                  <td className="border p-2">{selectedRecord.td}</td>
                </tr>
                <tr>
                  <td className="border p-2">N:</td>
                  <td className="border p-2">{selectedRecord.n}</td>
                </tr>
                <tr>
                  <td className="border p-2">R:</td>
                  <td className="border p-2">{selectedRecord.r}</td>
                </tr>
                <tr>
                  <td className="border p-2">S:</td>
                  <td className="border p-2">{selectedRecord.s}</td>
                </tr>
                <tr>
                  <td className="border p-2">BB:</td>
                  <td className="border p-2">{selectedRecord.bb}</td>
                </tr>
                <tr>
                  <td className="border p-2">TB:</td>
                  <td className="border p-2">{selectedRecord.tb}</td>
                </tr>
                <tr>
                  <td className="border p-2">LK:</td>
                  <td className="border p-2">{selectedRecord.lk}</td>
                </tr>
                <tr>
                  <td className="border p-2">Keterangan:</td>
                  <td className="border p-2">{selectedRecord.keterangan}</td>
                </tr>
                <tr>
                  <td className="border p-2">Assessment:</td>
                  <td className="border p-2">{selectedRecord.assessment}</td>
                </tr>
                <tr>
                  <td className="border p-2">Plan:</td>
                  <td className="border p-2">{selectedRecord.plan}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table for Detail Tindakan Pasien */}
          <h3 className="text-lg font-semibold mt-4 mb-2">
            Detail Tindakan Pasien
          </h3>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border">
              <thead>
                <tr>
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Tindakan</th>
                  <th className="border p-2">Harga</th>
                  <th className="border p-2">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {tindakanPasienList
                  .filter(
                    (tindakan) => tindakan.id_rekam_medis === selectedRecord.id
                  )
                  .map((tindakan) => (
                    <tr key={tindakan.id}>
                      <td className="border p-2">{tindakan.id}</td>
                      <td className="border p-2">{tindakan.tindakan_nama}</td>
                      <td className="border p-2">{tindakan.harga}</td>
                      <td className="border p-2">{tindakan.jumlah}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <strong>
              Total Harga: Rp. {calculateTotalHarga().toLocaleString()}
            </strong>
          </div>
          <div className="flex">
            <Button
              className="mt-8 ml-4"
              color="dark"
              pill
              onClick={handlePrintRekamMedis}
            >
              <FiPrinter size="1.5em" style={{ marginRight: "0.5em" }} />
              Rekam Medis
            </Button>
            <Button
              className="mt-8 ml-4"
              color="blue"
              pill
              onClick={handlePrintBuktiRekamMedis}
            >
              <FiPrinter size="1.5em" style={{ marginRight: "0.5em" }} />
              Bukti
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
