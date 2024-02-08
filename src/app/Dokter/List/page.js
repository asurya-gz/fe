"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useRouter } from "next/navigation";
import FormRm from "./components/FormRm";
import RiwayatRM from "./components/RiwayatRM";
import { format } from "date-fns";

// ListPasien Component
const ListPasien = () => {
  const [user, setUser] = useState(null);
  const [pasienList, setPasienList] = useState([]);
  const [selectedPasien, setSelectedPasien] = useState(null);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(""); // Add search query state
  const [filteredPasienList, setFilteredPasienList] = useState([]);
  const [showFormRm, setShowFormRm] = useState(false);
  const [showRiwayatRm, setShowRiwayatRm] = useState(false);
  const handleMulaiPeriksa = () => {
    setShowFormRm(true);
  };
  const handleRiwayat = () => {
    setShowRiwayatRm(true);
  };

  useEffect(() => {
    const fetchPasienList = async () => {
      try {
        const response = await axios.get(
          "https://bekk.up.railway.app/getallpasien"
        );
        console.log("Pasien data:", response.data);
        setPasienList(response.data.pasienList);
      } catch (error) {
        console.error("Error fetching pasien data:", error);
      }
    };
    fetchPasienList();
  }, []);

  const handleSearch = () => {
    // Filter the patient list based on the search query
    const filteredList = pasienList.filter((pasien) =>
      pasien.no_medrek.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPasienList(filteredList);
  };

  useEffect(() => {
    // Reset selected patient when search query changes
    setSelectedPasien(null);
  }, [searchQuery]);

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

  const handlePasienClick = (pasien) => {
    // Set the selectedPasien state when a box is clicked
    setSelectedPasien(pasien);
  };

  // Close the FormRm component when a different pasien is selected
  useEffect(() => {
    if (showFormRm && selectedPasien) {
      setShowFormRm(false);
    }
  }, [selectedPasien]);

  useEffect(() => {
    if (showRiwayatRm && selectedPasien) {
      setShowRiwayatRm(false);
    }
  }, [selectedPasien]);

  const formatTanggal = (tanggal) => {
    return format(new Date(tanggal), "dd MMMM yyyy");
  };

  return (
    <div className="bg-slate-400 min-h-screen">
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Dokter" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">List Pasien</Breadcrumb.Item>
      </Breadcrumb>

      {/* Search input */}
      <div className="p-4">
        <input
          className="rounded"
          type="text"
          placeholder="Search by No. Medrek"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="p-2 bg-blue-800 text-white hover:bg-blue-400 hover:text-black rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Display Pasien boxes */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-white">List Pasien</h2>
        {filteredPasienList.map((pasien) => (
          <div
            key={pasien.id}
            onClick={() => handlePasienClick(pasien)}
            className="bg-white border p-3 mb-4 cursor-pointer hover:shadow-md transition duration-300 rounded-md"
          >
            {/* Display pasien information in the box */}
            <div className="text-lg font-semibold mb-1">{pasien.no_medrek}</div>
            <div className="text-gray-600">
              <p className="mb-1">Id: {pasien.id}</p>
              <div>Nama: {pasien.nama}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Display detailed information when a pasien is selected */}
      {selectedPasien && (
        <div className="p-4 bg-white shadow-md rounded-md mx-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Detail Pasien
          </h2>
          <div className="mb-2">
            <strong className="text-blue-800">No. Medrek:</strong>{" "}
            {selectedPasien.no_medrek}
          </div>
          <div className="mb-2">
            <strong className="text-blue-800">Nama:</strong>{" "}
            {selectedPasien.nama}
          </div>
          <div className="mb-2">
            <strong className="text-blue-800">Tanggal Lahir:</strong>{" "}
            {formatTanggal(selectedPasien.tanggal_lahir)}
          </div>
          <div className="mb-2">
            <strong className="text-blue-800">Alamat:</strong>{" "}
            {selectedPasien.alamat}
          </div>

          <div className="flex mt-4">
            <button
              onClick={handleMulaiPeriksa}
              className="bg-blue-800 text-white p-3 rounded-md m-2 hover:bg-blue-600 transition duration-300"
            >
              Mulai Periksa
            </button>
            <button
              onClick={handleRiwayat}
              className="bg-yellow-300 text-black p-3 rounded-md m-2 hover:bg-yellow-200 transition duration-300"
            >
              Riwayat
            </button>
          </div>
        </div>
      )}

      {/* Display FormRm component conditionally based on showFormRm */}
      {showFormRm && selectedPasien && (
        <FormRm selectedPasien={selectedPasien} setShowFormRm={setShowFormRm} />
      )}

      {showRiwayatRm && selectedPasien && (
        <RiwayatRM
          selectedPasien={selectedPasien}
          setShowRiwayatRm={setShowRiwayatRm}
        />
      )}
    </div>
  );
};

export default ListPasien;
