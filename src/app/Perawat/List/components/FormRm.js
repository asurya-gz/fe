"use client";
import { Button, Textarea, Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  AiOutlinePlusCircle,
  AiOutlineShoppingCart,
  AiOutlineClose,
} from "react-icons/ai";

export default function FormRm({ selectedPasien, setShowFormRm }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tindakanList, setTindakanList] = useState([]);
  const [selectedTindakan, setSelectedTindakan] = useState("");
  const [hargaTindakan, setHargaTindakan] = useState(0);
  const [tindakanEntries, setTindakanEntries] = useState([
    { tindakan: "", harga: 0, jumlah: 0 },
  ]);
  const [selectedTindakanEntries, setSelectedTindakanEntries] = useState(
    tindakanEntries.map(() => "")
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTindakanEntry = () => {
    setTindakanEntries([
      ...tindakanEntries,
      { tindakan: "", harga: 0, jumlah: 0 },
    ]);
  };
  const removeLastTindakanEntry = () => {
    if (tindakanEntries.length > 1) {
      const updatedEntries = [...tindakanEntries];
      updatedEntries.pop();
      setTindakanEntries(updatedEntries);
    }
  };

  const handleJumlahChange = (e, index) => {
    const jumlahValue = parseInt(e.target.value, 10);
    const updatedEntries = [...tindakanEntries];

    updatedEntries[index] = {
      tindakan: selectedTindakan,
      harga: hargaTindakan,
      jumlah: isNaN(jumlahValue) ? 0 : jumlahValue,
    };

    setTindakanEntries(updatedEntries);
  };

  // Calculate total harga for all tindakan entries
  const totalHargaTindakan = tindakanEntries.reduce((total, entry) => {
    return total + entry.jumlah * entry.harga;
  }, 0);

  const handleTindakanChange = (e, index) => {
    const selectedTindakanId = e.target.value;

    // Dapatkan harga tindakan sesuai dengan ID tindakan yang dipilih
    const selectedTindakanData = tindakanList.find(
      (tindakan) => tindakan.id === parseInt(selectedTindakanId, 10)
    );

    if (selectedTindakanData) {
      setHargaTindakan(selectedTindakanData.harga);
    } else {
      // Reset harga jika tindakan tidak ditemukan
      setHargaTindakan(0);
    }

    // Set selectedTindakanEntries sesuai dengan ID entri yang dipilih
    setSelectedTindakanEntries((prevSelected) =>
      prevSelected.map((value, i) => (i === index ? selectedTindakanId : value))
    );
  };

  // Mengambil data tindakan
  useEffect(() => {
    // Fetch the list of actions (tindakan)
    const fetchTindakanList = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/tindakan"
        );
        console.log("Tindakan list:", response.data.tindakan);
        setTindakanList(response.data.tindakan);
      } catch (error) {
        console.error("Error fetching tindakan list:", error.message);
      }
    };

    fetchTindakanList();
  }, []);
  // Mengambil data tindakan end

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ambil data dari formulir
      const formData = new FormData(e.target);
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      // Kirim data rekam medis ke server
      const responseRekamMedis = await axios.post(
        "https://bekk.up.railway.app/simpan-rekam-medis",
        {
          ...formDataObject,
        }
      );

      console.log("Rekam medis disimpan:", responseRekamMedis.data);

      // Dapatkan ID rekam medis yang baru saja disimpan
      const idRekamMedis = responseRekamMedis.data.id;

      // Kirim data tindakan pasien ke server
      const tindakanPromises = tindakanEntries.map(async (entry, index) => {
        const tindakanData = {
          id_rm_pasien: idRekamMedis,
          id_tindakan: formData.get(`tindakan_${index}`),
          harga: entry.harga,
          jumlah: formData.get(`jumlah_${index}`),
        };

        try {
          const responseTindakan = await axios.post(
            "https://bekk.up.railway.app/simpan-tindakan-pasien",
            tindakanData
          );
          console.log("Tindakan pasien disimpan:", responseTindakan.data);
        } catch (error) {
          console.error("Error saat menyimpan tindakan pasien:", error.message);
          // Optional: Handle or log the error accordingly
        }
      });

      // Tunggu semua pengiriman tindakan selesai sebelum melanjutkan
      await Promise.all(tindakanPromises);
      window.location.reload();
    } catch (error) {
      console.error("Error saat menyimpan rekam medis:", error.message);
      // Optional: Handle or log the error accordingly
    }
  };

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
        // Redirect to login page if not authenticated
        router.push("/");
      }
    };

    fetchUser();
  }, [router]);

  console.log("Terpilih:", selectedPasien);

  return (
    <form
      className="mx-auto mt-8 max-w-screen-lg w-full text-white p-5 rounded-md"
      onSubmit={handleSubmit}
    >
      <h2 className="font-bold text-xl text-white">Data Diri Pasien</h2>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="id_pasien" value="ID" />
        </div>
        <TextInput
          id="id_pasien"
          type="number"
          name="id_pasien"
          value={selectedPasien.id}
          readOnly
          shadow
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="tanggal_kunjungan" value="Tanggal Kunjungan" />
        </div>
        <TextInput
          id="tanggal_kunjungan"
          type="date"
          placeholder="Masukan Tanggal"
          name="tanggal_kunjungan"
          required
          shadow
        />
      </div>

      <h2 className="font-bold text-xl mb-2">Subjective</h2>
      <Textarea
        className="mb-2"
        id="subjective"
        placeholder=""
        rows={4}
        name="subjective" // Tambahkan atribut name
      />

      <h2 className="font-bold text-xl mb-2">Objective</h2>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="td" value="TD" />
        </div>
        <TextInput
          id="td"
          type="text"
          placeholder="-"
          shadow
          name="td" // Tambahkan atribut name
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="n" value="N" />
        </div>
        <TextInput
          id="n"
          type="text"
          placeholder="-"
          shadow
          name="n" // Tambahkan atribut name
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="r" value="R" />
        </div>
        <TextInput
          id="r"
          type="text"
          placeholder="-"
          shadow
          name="r" // Tambahkan atribut name
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="s" value="S" />
        </div>
        <TextInput
          id="s"
          type="text"
          placeholder="-"
          shadow
          name="s" // Tambahkan atribut name
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="bb" value="BB" />
        </div>
        <TextInput
          id="bb"
          type="text"
          placeholder="-"
          shadow
          name="bb" // Tambahkan atribut name
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="tb" value="TB" />
        </div>
        <TextInput
          id="tb"
          type="text"
          placeholder="-"
          shadow
          name="tb" // Tambahkan atribut name
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="lk" value="LK" />
        </div>
        <TextInput
          id="lk"
          type="text"
          placeholder="-"
          shadow
          name="lk" // Tambahkan atribut name
          className="mb-2"
        />
      </div>
      <Textarea
        className="mb-2"
        id="keterangan"
        placeholder="Keterangan"
        rows={4}
        name="keterangan" // Tambahkan atribut name
      />
      <h2 className="font-bold text-xl mb-2">Assessment</h2>
      <Textarea
        className="mb-2"
        id="assessment"
        placeholder=""
        rows={4}
        name="assessment" // Tambahkan atribut name
      />
      <h2 className="font-bold text-xl mb-2">Plan</h2>
      <Textarea
        className="mb-2"
        id="plan"
        placeholder=""
        rows={4}
        name="plan" // Tambahkan atribut name
      />

      <div>
        <h2 className="font-bold text-xl mb-2">Tindakan dan Harga</h2>
        {tindakanEntries.map((entry, index) => (
          <div key={index}>
            <div className="mb-2">
              <div className="mb-2 block">
                <label htmlFor={`tindakan-${index}`}>Tindakan</label>
              </div>
              <select
                className="w-full border-none rounded-xl text-black"
                id={`tindakan-${index}`}
                onChange={(e) => handleTindakanChange(e, index)}
                value={selectedTindakanEntries[index]}
                name={`tindakan_${index}`}
              >
                <option value="" disabled>
                  Pilih tindakan...
                </option>
                {tindakanList.map((tindakan) => (
                  <option key={tindakan.id} value={tindakan.id}>
                    {tindakan.nama} - {tindakan.harga}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <div className="mb-2 block">
                <Label htmlFor={`harga-${index}`} value="Harga" />
              </div>
              <TextInput
                id={`harga-${index}`}
                type="text"
                placeholder="-"
                value={entry.harga || ""}
                shadow
                name={`harga_${index}`}
              />
            </div>
            <div className="mb-2">
              <div className="mb-2 block">
                <Label htmlFor={`jumlah-${index}`} value="Jumlah" />
              </div>
              <TextInput
                id={`jumlah-${index}`}
                type="text"
                value={entry.jumlah || ""}
                onChange={(e) => handleJumlahChange(e, index)}
                shadow
                name={`jumlah_${index}`}
              />
            </div>
          </div>
        ))}

        <div className="flex items-center gap-2 mt-8">
          <Button color="blue" pill onClick={addTindakanEntry}>
            <AiOutlinePlusCircle
              size="1.5em"
              style={{ marginRight: "0.5em" }}
            />
            Tambah Tindakan
          </Button>
          <Button color="failure" pill onClick={removeLastTindakanEntry}>
            Batal
          </Button>
        </div>
        <p className="mt-4">
          Total Harga Semua Tindakan: Rp. {totalHargaTindakan}
        </p>
      </div>

      <div className="flex">
        <Button color="dark" className="m-2" type="submit">
          Kirim
        </Button>
      </div>
    </form>
  );
}
