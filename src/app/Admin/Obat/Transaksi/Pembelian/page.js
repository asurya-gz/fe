"use client";
import { Breadcrumb, Button, Label, TextInput } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Select from "react-select";
import { AiOutlinePlusCircle, AiOutlineShoppingCart } from "react-icons/ai";

export default function AdminObatTransaksiPembelian() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [obatList, setObatList] = useState([]);
  const [selectedObat, setSelectedObat] = useState(null);
  const [hargaObat, setHargaObat] = useState(0);
  const [jumlahObat, setJumlahObat] = useState(0);
  const [namaPembeli, setNamaPembeli] = useState("");
  const [drugEntries, setDrugEntries] = useState([
    { obat: null, jumlah: 0, harga: 0 },
  ]);

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

  useEffect(() => {
    // Fetch the list of drugs
    const fetchObatList = async () => {
      try {
        const response = await axios.get("https://bekk.up.railway.app/obat");
        console.log("Obat list:", response.data.obat);

        // Make sure response.data.obat is defined and is an array
        if (Array.isArray(response.data.obat)) {
          setObatList(response.data.obat);
        } else {
          console.error("Invalid obat data:", response.data.obat);
        }
      } catch (error) {
        console.error("Error fetching obat list:", error.message);
      }
    };

    fetchObatList();
  }, []);

  const addDrugEntry = () => {
    setDrugEntries([...drugEntries, { obat: null, jumlah: 0, harga: 0 }]);
  };

  const removeLastDrugEntry = () => {
    if (drugEntries.length > 1) {
      const updatedEntries = [...drugEntries];
      updatedEntries.pop();
      setDrugEntries(updatedEntries);
    }
  };

  // Calculate total harga for all entries
  const totalHarga = drugEntries.reduce((total, entry) => {
    return total + entry.jumlah * entry.harga;
  }, 0);

  const beliObat = async () => {
    try {
      // Buat transaksi baru
      const responseTransaksi = await axios.post(
        "https://bekk.up.railway.app/transaksi",
        {
          nama_pembeli: namaPembeli,
          total_harga: totalHarga, // Ubah sesuai kebutuhan
        }
      );

      // Ambil ID transaksi yang baru dibuat
      const transaksiId = responseTransaksi.data.id;

      // Proses setiap entri obat
      await Promise.all(
        drugEntries.map(async (entry) => {
          let selectedObat = entry.obat;

          // Jika obat tidak ada, coba cari berdasarkan nama
          if (!selectedObat && entry.obatName) {
            selectedObat = findObatByName(entry.obatName);
          }

          // Pastikan obat yang dipilih valid
          if (!selectedObat) {
            console.error(`Obat not found: ${entry.obatName}`);
            return;
          }

          // Buat detail transaksi
          await axios.post("https://bekk.up.railway.app/detail_transaksi", {
            transaksi_id: transaksiId,
            obat_id: selectedObat.id,
            quantity: entry.jumlah,
            harga: entry.harga,
          });

          // Update jumlah obat di tabel obat
          await axios.patch(
            `https://bekk.up.railway.app/transaksiobat/${selectedObat.id}`,
            {
              jumlah: selectedObat.jumlah - entry.jumlah,
            }
          );
        })
      );

      window.location.reload();
      // Tambahkan logika lain yang diperlukan
    } catch (error) {
      window.location.reload();
      // Handle error, tampilkan pesan kesalahan, dll.
    }
  };

  // Di luar komponen
  const findObatByName = (namaObat) => {
    return obatList.find((obat) => obat.nama_obat === namaObat) || null;
  };

  const handleObatChange = (e, index) => {
    const namaObat = e.target.value;
    const selectedObat = findObatByName(namaObat);
    const updatedEntries = [...drugEntries];
    updatedEntries[index] = {
      obat: selectedObat,
      jumlah: updatedEntries[index].jumlah,
      harga: selectedObat ? selectedObat.harga : 0,
    };
    setDrugEntries(updatedEntries);
  };

  return (
    <div className="bg-slate-400 min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Admin" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/Admin/Obat">Obat</Breadcrumb.Item>
        <Breadcrumb.Item href="/Admin/Obat/Transaksi">
          Transaksi
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/Admin/Obat/Transaksi/Pembelian">
          Pembelian
        </Breadcrumb.Item>
      </Breadcrumb>
      {/* Breadcrumb end */}

      {/* form Pembelian  */}
      <div className="flex justify-center items-center">
        {" "}
        <form className="flex mt-8 w-[75%] flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="np" value="Nama Pembeli" />
            </div>
            <TextInput
              id="np"
              type="text"
              placeholder="Nama Pembeli"
              value={namaPembeli}
              onChange={(e) => setNamaPembeli(e.target.value)}
              required
            />
          </div>
          {drugEntries.map((entry, index) => (
            <div key={index}>
              <label htmlFor={`obat-${index}`} className="mb-2 block">
                Pilih Obat {index + 1}
              </label>
              <Select
                id={`obat-${index}`}
                options={obatList.map((obat) => ({
                  value: obat.id,
                  label: obat.nama_obat,
                }))}
                onChange={(selectedOption) => {
                  const selectedObat = obatList.find(
                    (obat) => obat.id === selectedOption.value
                  );
                  const updatedEntries = [...drugEntries];
                  updatedEntries[index] = {
                    obat: selectedObat,
                    jumlah: updatedEntries[index].jumlah,
                    harga: selectedObat ? selectedObat.harga : 0,
                  };
                  setDrugEntries(updatedEntries);
                }}
                isSearchable={true}
                placeholder="Cari dan Pilih Obat"
                noOptionsMessage={() => "Obat tidak ditemukan"}
              />

              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor={`jumlah-${index}`}
                    value={`Jumlah Obat ${index + 1}`}
                  />
                </div>
                <TextInput
                  id={`jumlah-${index}`}
                  type="number"
                  placeholder={`Ex : 3`}
                  value={entry.jumlah}
                  onChange={(e) => {
                    const updatedEntries = [...drugEntries];
                    updatedEntries[index] = {
                      obat: updatedEntries[index].obat,
                      jumlah: parseInt(e.target.value, 10),
                      harga: updatedEntries[index].harga,
                    };
                    setDrugEntries(updatedEntries);
                  }}
                  required
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor={`harga-${index}`}
                    value={`Harga Satuan Obat ${index + 1}`}
                  />
                </div>
                <TextInput
                  id={`harga-${index}`}
                  type="number"
                  value={entry.harga || ""}
                  onChange={(e) => {
                    const hargaValue = parseInt(e.target.value, 10);
                    const updatedEntries = [...drugEntries];
                    updatedEntries[index] = {
                      obat: updatedEntries[index].obat,
                      jumlah: updatedEntries[index].jumlah,
                      harga: isNaN(hargaValue) ? 0 : hargaValue,
                    };
                    setDrugEntries(updatedEntries);
                  }}
                  required
                />
              </div>
              <p className="text-white font-bold mt-4">
                Total Harga: Rp. {entry.jumlah * entry.harga}
              </p>
            </div>
          ))}

          <div className="flex items-center gap-2 mt-8">
            <Button color="blue" pill onClick={addDrugEntry}>
              <AiOutlinePlusCircle
                size="1.5em"
                style={{ marginRight: "0.5em" }}
              />
              Tambah Obat
            </Button>
            <Button color="failure" pill onClick={removeLastDrugEntry}>
              Batal
            </Button>
          </div>
          {/* Display total harga for all entries */}
          <p className="mt-4 text-white font-bold">
            Total Harga Semua Obat: Rp. {totalHarga}
          </p>
          <Button className="bg-blue-800" onClick={beliObat} type="button">
            <AiOutlineShoppingCart
              size="1.5em"
              style={{ marginRight: "0.5em" }}
            />
            Beli Obat
          </Button>
        </form>
      </div>
      {/* form Pembelian end */}
    </div>
  );
}
