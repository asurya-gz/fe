"use client";
import { Breadcrumb } from "flowbite-react";
import { HiHome, HiSearch } from "react-icons/hi";
import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function PemilikApotekerPencarian() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [obatList, setObatList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter the obatList based on the search term
  const filteredObatList = obatList.filter((obat) =>
    obat.nama_obat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch mengambil data obat
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

  // Mengambil session
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
  return (
    <div className="bg-[#ffcccc] h-screen">
      {/* Breadcrumb */}
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Pemilik" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/Pemilik/Apoteker">Apoteker</Breadcrumb.Item>
        <Breadcrumb.Item href="/Pemilik/Apoteker/Pencarian">
          Pencarian
        </Breadcrumb.Item>
      </Breadcrumb>
      {/* Breadcrumb end */}

      {/* Search Bar */}
      <form className="pt-4 pl-4 flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded-l-md w-64 h-full" // Add h-full for consistent height
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="bg-[#333] text-white p-3 rounded-r-md h-full" // Add h-full for consistent height
        >
          <HiSearch />
        </button>
      </form>
      {/* Search Bar end */}

      {/* Table Pencarian */}
      <div className="overflow-x-auto mt-8">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell style={{ background: "#333", color: "white" }}>
              Jenis
            </Table.HeadCell>
            <Table.HeadCell style={{ background: "#333", color: "white" }}>
              Obat
            </Table.HeadCell>
            <Table.HeadCell style={{ background: "#333", color: "white" }}>
              Jumlah
            </Table.HeadCell>
            <Table.HeadCell style={{ background: "#333", color: "white" }}>
              Harga
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {filteredObatList.map((obat) => (
              <Table.Row key={obat.id}>
                <Table.Cell className="text-black">{obat.jenis}</Table.Cell>
                <Table.Cell className="text-black">{obat.nama_obat}</Table.Cell>
                <Table.Cell className="text-black">{obat.jumlah}</Table.Cell>
                <Table.Cell className="text-black">Rp. {obat.harga}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {/* Table rekap Pencarian */}
    </div>
  );
}
