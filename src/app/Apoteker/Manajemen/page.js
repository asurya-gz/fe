"use client";
// Import
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Button } from "flowbite-react";
import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BsPencil, BsTrash } from "react-icons/bs";
// Import end

// Utama
export default function ApotekerManajemen() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [obatList, setObatList] = useState([]);
  const [newObat, setNewObat] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedObat, setEditedObat] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // fetch update obat
  const updateObat = async () => {
    try {
      // Send the updated obat data to the server
      await axios.put(
        `https://bekk.up.railway.app/obat/${editedObat.id}`,
        editedObat
      );

      // Fetch the updated obat list after a successful update
      const response = await axios.get("https://bekk.up.railway.app/obat");
      setObatList(response.data.obat);

      // Reset the editedObat state
      setEditedObat({});

      // Close the "Edit Obat" modal on successful update
      closeEditModal();
    } catch (error) {
      console.error("Error updating obat:", error);

      // Log detailed error information
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received. Request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  const openEditModal = (obat) => {
    setEditedObat(obat);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditedObat({});
    setIsEditModalOpen(false);
  };

  // Mengambil data obat
  useEffect(() => {
    // Fetch the list of drugs
    const fetchObatList = async () => {
      try {
        const response = await axios.get("https://bekk.up.railway.app/obat");
        console.log("Obat list:", response.data.obat);

        // Pastikan response.data.obat terdefinisi dan merupakan array
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

  // Handle  delete
  const handleDelete = async (obatId) => {
    try {
      const response = await axios.delete(
        `https://bekk.up.railway.app/obat/${obatId}`
      );
      console.log(response.data);

      // Update the obatList state after successful deletion
      setObatList((prevObatList) =>
        prevObatList.filter((obat) => obat.id !== obatId)
      );
    } catch (error) {
      console.error("Error deleting obat:", error.message);
    }
  };

  const addObat = async () => {
    try {
      await axios.post("https://bekk.up.railway.app/tambahobat", newObat);
      // Ambil data obat setelah berhasil menambahkan obat baru
      const response = await axios.get("https://bekk.up.railway.app/obat");
      setObatList(response.data.obat);
      closeModal();
    } catch (error) {
      console.error("Error adding obat:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#f0f0f0] min-h-screen">
      {" "}
      {/* Breadcrumb */}
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Apoteker" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Manajemen</Breadcrumb.Item>
      </Breadcrumb>
      {/* Breadcrumb end */}
      {/* Button Tambah Obat */}
      <Button className="mt-8 ml-4" color="light" pill onClick={openModal}>
        Tambah Obat
      </Button>
      {/* Button Tambah Obat end */}
      {/* Table */}
      <div className="overflow-x-auto mt-8">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell style={{ background: "#333", color: "white" }}>
              Nama Obat
            </Table.HeadCell>
            <Table.HeadCell style={{ background: "#333", color: "white" }}>
              Jumlah
            </Table.HeadCell>
            <Table.HeadCell style={{ background: "#333", color: "white" }}>
              Harga
            </Table.HeadCell>
            <Table.HeadCell style={{ background: "#333", color: "white" }}>
              Action
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {obatList.map((obat) => (
              <Table.Row key={obat.id}>
                <Table.Cell>{obat.nama_obat}</Table.Cell>
                <Table.Cell>{obat.jumlah}</Table.Cell>
                <Table.Cell>Rp. {obat.harga}</Table.Cell>
                <Table.Cell className="flex items-center">
                  {/* Edit icon */}
                  <BsPencil
                    className="cursor-pointer text-blue-500 mr-7"
                    onClick={() => openEditModal(obat)}
                  />
                  {/* Delete icon */}
                  <BsTrash
                    className="cursor-pointer text-red-500"
                    onClick={() => handleDelete(obat.id)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {/* Edit Obat */}
        {editedObat.id && (
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
              isEditModalOpen ? "flex" : "hidden"
            }`}
          >
            <div className="bg-white p-8 shadow-md">
              <h2 className="text-xl font-semibold mb-4">Edit Obat</h2>
              <input
                type="text"
                placeholder="Nama Obat"
                value={editedObat.nama_obat}
                onChange={(e) =>
                  setEditedObat({ ...editedObat, nama_obat: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
              <input
                type="number"
                placeholder="Jumlah"
                value={editedObat.jumlah}
                onChange={(e) =>
                  setEditedObat({ ...editedObat, jumlah: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
              <input
                type="number"
                placeholder="Harga"
                value={editedObat.harga}
                onChange={(e) =>
                  setEditedObat({ ...editedObat, harga: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
              <div className="flex justify-end">
                <button
                  className="bg-green-500 text-white px-4 py-2"
                  onClick={updateObat}
                >
                  Simpan Perubahan
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2"
                  onClick={closeEditModal}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tambah Obat */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 shadow-md">
              <h2 className="text-xl font-semibold mb-4">Tambah Obat Baru</h2>
              <input
                type="text"
                placeholder="Nama Obat"
                value={newObat.nama_obat}
                onChange={(e) =>
                  setNewObat({ ...newObat, nama_obat: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
              <input
                type="number"
                placeholder="Jumlah"
                value={newObat.jumlah}
                onChange={(e) =>
                  setNewObat({ ...newObat, jumlah: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
              <input
                type="number"
                placeholder="Harga"
                value={newObat.harga}
                onChange={(e) =>
                  setNewObat({ ...newObat, harga: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
              <div className="flex justify-end">
                <button
                  className="bg-green-500 text-white px-4 py-2 mr-2"
                  onClick={addObat}
                >
                  Tambah
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2"
                  onClick={closeModal}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Table end */}
    </div>
  );
}
// Utama end
