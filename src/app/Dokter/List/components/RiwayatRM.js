import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { FiPrinter } from "react-icons/fi";

export default function RiwayatRM({ selectedPasien }) {
  const [riwayatData, setRiwayatData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [tindakanData, setTindakanData] = useState([]);

  const formatTanggal = (tanggal) => {
    return format(new Date(tanggal), "dd MMMM yyyy");
  };

  useEffect(() => {
    const fetchTindakanData = async () => {
      try {
        if (selectedRecord) {
          const response = await axios.get(
            `https://bekk.up.railway.app/tndpasien/${selectedRecord.id}`
          );
          setTindakanData(response.data.tindakan);
        }
      } catch (error) {
        console.error("Error fetching tindakan data:", error);
      }
    };

    fetchTindakanData();
  }, [selectedRecord]);

  useEffect(() => {
    const fetchRiwayatData = async () => {
      try {
        const response = await axios.get(
          `https://bekk.up.railway.app/rmpasien`
        );
        const filteredData = response.data.rekam_medis.filter(
          (item) => item.id_pasien === selectedPasien.id
        );

        setRiwayatData(filteredData);
      } catch (error) {
        console.error("Error fetching riwayat data:", error);
      }
    };

    fetchRiwayatData();
  }, [selectedPasien.id]);

  const handleDateClick = async (recordId) => {
    try {
      const response = await axios.get(
        `https://bekk.up.railway.app/rmpasien/${recordId}`
      );
      setSelectedRecord(response.data.record);
    } catch (error) {
      console.error("Error fetching selected record:", error);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <title>Cetak Rekam Medis</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 20px;
            }
  
            h2 {
              font-size: 24px;
              margin-bottom: 10px;
            }
  
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
  
            table, th, td {
              border: 1px solid #ddd;
            }
  
            th, td {
              padding: 10px;
              text-align: left;
            }
  
            th {
              background-color: #f2f2f2;
            }
  
            img {
              width: 100%;
              height: auto;
              margin-bottom: 20px;
            }
  
            p {
              margin-bottom: 10px;
            }
          </style>
        </head>
        <body>
          <img src="/kop.png" alt="Letterhead">
          <h2>Riwayat Rekam Medis</h2>
          <!-- Patient Details -->
        <h3>Detail Pasien</h3>
        <table>
          <tr>
            <th>No. Medrek</th>
            <th>Nama Pasien</th>
            <th>Tanggal Lahir</th>
            <th>Alamat</th>
          </tr>
          <tr>
            <td>${selectedPasien.no_medrek}</td>
            <td>${selectedPasien.nama}</td>
            <td>${formatTanggal(selectedPasien.tanggal_lahir)}</td>
            <td>${selectedPasien.alamat}</td>
          </tr>
        </table>
          <table>
            <tr>
              <th>Tanggal Kunjungan</th>
              <th>Subjective</th>
              <th>TD</th>
              <th>N</th>
              <th>R</th>
              <th>S</th>
              <th>BB</th>
              <th>TB</th>
              <th>LK</th>
              <th>Keterangan</th>
              <th>Assessment</th>
              <th>Plan</th>
            </tr>
            <tr>
              <td>${formatTanggal(selectedRecord.tanggal_kunjungan)}</td>
              <td>${selectedRecord.subjective}</td>
              <td>${selectedRecord.td}</td>
              <td>${selectedRecord.n}</td>
              <td>${selectedRecord.r}</td>
              <td>${selectedRecord.s}</td>
              <td>${selectedRecord.bb}</td>
              <td>${selectedRecord.tb}</td>
              <td>${selectedRecord.lk}</td>
              <td>${selectedRecord.keterangan}</td>
              <td>${selectedRecord.assessment}</td>
              <td>${selectedRecord.plan}</td>
            </tr>
          </table>
  
          <h3>Tindakan</h3>
          <table>
            <tr>
              <th>Tindakan</th>
              <th>Harga</th>
            </tr>
            ${tindakanData
              .map(
                (tindakan) => `<tr>
                  <td>${tindakan.nama_tindakan}</td>
                  <td>${tindakan.harga}</td>
                </tr>`
              )
              .join("")}
          </table>
  
          <p>Total Harga: ${tindakanData.reduce(
            (total, tindakan) => total + parseInt(tindakan.harga, 10),
            0
          )}</p>

          <!-- Signature Section -->
        <div style="margin-top: 20px;">
          <p style="margin-bottom: 10px;">Tanda Tangan Penanggung Jawab:</p>
          <br><br><br>
          <p>__________________________</p>
        </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  const handleBukti = () => {
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <title>Cetak Rekam Medis</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 20px;
            }
  
            h2 {
              font-size: 24px;
              margin-bottom: 10px;
            }
  
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
  
            table, th, td {
              border: 1px solid #ddd;
            }
  
            th, td {
              padding: 10px;
              text-align: left;
            }
  
            th {
              background-color: #f2f2f2;
            }
  
            img {
              width: 100%;
              height: auto;
              margin-bottom: 20px;
            }
  
            p {
              margin-bottom: 10px;
            }
          </style>
        </head>
        <body>
          <img src="/kop.png" alt="Letterhead">
          <h2>Riwayat Rekam Medis</h2>
          <!-- Patient Details -->
        <h3>Detail Pasien</h3>
        <table>
          <tr>
            <th>No. Medrek</th>
            <th>Nama Pasien</th>
            <th>Tanggal Lahir</th>
            <th>Alamat</th>
          </tr>
          <tr>
            <td>${selectedPasien.no_medrek}</td>
            <td>${selectedPasien.nama}</td>
            <td>${formatTanggal(selectedPasien.tanggal_lahir)}</td>
            <td>${selectedPasien.alamat}</td>
          </tr>
        </table>
  
          <h3>Tindakan</h3>
          <table>
            <tr>
              <th>Tindakan</th>
              <th>Harga</th>
            </tr>
            ${tindakanData
              .map(
                (tindakan) => `<tr>
                  <td>${tindakan.nama_tindakan}</td>
                  <td>${tindakan.harga}</td>
                </tr>`
              )
              .join("")}
          </table>
  
          <p>Total Harga: ${tindakanData.reduce(
            (total, tindakan) => total + parseInt(tindakan.harga, 10),
            0
          )}</p>

          <!-- Signature Section -->
        <div style="margin-top: 20px;">
          <p style="margin-bottom: 10px;">Tanda Tangan Penanggung Jawab:</p>
          <br><br><br>
          <p>__________________________</p>
        </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">
        Riwayat Rekam Medis
      </h2>
      <ul className="space-y-4">
        {riwayatData.map((item) => (
          <li
            key={item.id}
            onClick={() => handleDateClick(item.id)}
            className="cursor-pointer bg-gray-100 p-4 rounded-md transition hover:bg-gray-200"
          >
            <p className="text-lg font-semibold">
              Tanggal Kunjungan: {formatTanggal(item.tanggal_kunjungan)}
            </p>
          </li>
        ))}
      </ul>

      {selectedRecord && (
        <div className="mt-4 p-4 bg-white rounded-md">
          <h3 className="text-xl font-bold mb-2 text-blue-800">
            Detail Rekam Medis
          </h3>
          <p>
            <span className="font-semibold">ID:</span> {selectedRecord.id}
          </p>
          <p>
            <span className="font-semibold">Tanggal Kunjungan:</span>{" "}
            {formatTanggal(selectedRecord.tanggal_kunjungan)}
          </p>
          <p>
            <span className="font-semibold">Subjective:</span>{" "}
            {selectedRecord.subjective}
          </p>
          <p>
            <span className="font-semibold">TD:</span> {selectedRecord.td}
          </p>
          <p>
            <span className="font-semibold">N:</span> {selectedRecord.n}
          </p>
          <p>
            <span className="font-semibold">R:</span> {selectedRecord.r}
          </p>
          <p>
            <span className="font-semibold">S:</span> {selectedRecord.s}
          </p>
          <p>
            <span className="font-semibold">BB:</span> {selectedRecord.bb}
          </p>
          <p>
            <span className="font-semibold">TB:</span> {selectedRecord.tb}
          </p>
          <p>
            <span className="font-semibold">LK:</span> {selectedRecord.lk}
          </p>
          <p>
            <span className="font-semibold">Keterangan:</span>{" "}
            {selectedRecord.keterangan}
          </p>
          <p>
            <span className="font-semibold">Assessment:</span>{" "}
            {selectedRecord.assessment}
          </p>
          <p>
            <span className="font-semibold">Plan:</span> {selectedRecord.plan}
          </p>
          {/* Render other details here */}
          <h1 className="font-bold text-xl mt-2 text-blue-800">Tindakan</h1>
          <ul>
            {tindakanData.map((tindakan) => (
              <li key={tindakan.id}>
                <div className="flex">
                  {" "}
                  <p>
                    <span className="font-semibold">Tindakan:</span>{" "}
                    {tindakan.nama_tindakan}
                  </p>
                  <p className="ml-3">
                    <span className="font-semibold">Harga:</span>{" "}
                    {tindakan.harga}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p>
            Total Harga:{" "}
            {tindakanData.reduce(
              (total, tindakan) => total + parseInt(tindakan.harga, 10),
              0
            )}
          </p>
          {/* Cetak */}
          <button
            onClick={handlePrint}
            className="p-2 bg-blue-950 text-white font-bold mt-4 rounded"
          >
            <div className="flex">
              <FiPrinter size="1.5em" style={{ marginRight: "0.5em" }} />
              Rekam Medis
            </div>
          </button>
          <button
            onClick={handleBukti}
            className="ml-4 p-2 bg-amber-400 text-white font-bold mt-4 rounded"
          >
            <div className="flex">
              <FiPrinter size="1.5em" style={{ marginRight: "0.5em" }} />
              Tindakan
            </div>
          </button>
          {/* Cetak end */}
        </div>
      )}
    </div>
  );
}
