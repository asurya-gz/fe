"use client";
import { Breadcrumb, Button, Label } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function PemilikProfile() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [pemilikData, setPemilikData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPemilikData, setEditedPemilikData] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://bekk.up.railway.app/user", {
          withCredentials: true,
        });
        setUser(response.data.user);

        const pemilikResponse = await axios.get(
          `https://bekk.up.railway.app/pemilik?username=${response.data.user.username}`,
          {
            withCredentials: true,
          }
        );
        setPemilikData(pemilikResponse.data.pemilik);
        setEditedPemilikData(pemilikResponse.data.pemilik);
      } catch (error) {
        console.error("Error fetching user or pemilik data:", error.message);
        router.push("/");
      }
    };

    fetchUser();
  }, [router]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        `https://bekk.up.railway.app/pemilik/${pemilikData.id}`,
        editedPemilikData,
        {
          withCredentials: true,
        }
      );

      setPemilikData(response.data.pemilik);

      setIsEditing(false);
      setError(null);

      const updatedPemilikResponse = await axios.get(
        `https://bekk.up.railway.app/pemilik?username=${user.username}`,
        {
          withCredentials: true,
        }
      );
      setPemilikData(updatedPemilikResponse.data.pemilik);
      setEditedPemilikData(updatedPemilikResponse.data.pemilik);
    } catch (error) {
      console.error("Error updating pemilik data:", error.message);
      setError("Error updating pemilik data. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPemilikData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleShowChangePasswordModal = () => {
    setShowChangePasswordModal(true);
  };

  const handleChangePassword = async () => {
    try {
      await axios.put(
        `https://bekk.up.railway.app/pemilik/change-password/${user.id}`,
        { newPassword },
        { withCredentials: true }
      );

      setShowChangePasswordModal(false);
      setNewPassword("");
      alert("Password berhasil diubah!");
    } catch (error) {
      console.error("Error changing password:", error.message);
      alert("Password gagal diubah!");
    }
  };

  return (
    <div className="bg-[#ffcccc] min-h-screen">
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Pemilik" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Profile</Breadcrumb.Item>
      </Breadcrumb>

      {pemilikData && (
        <div>
          <h2 className="text-3xl font-semibold mb-4">Pemilik Profile</h2>
          <div className="bg-white p-6 rounded-md shadow-md">
            {!isEditing ? (
              <div>
                <p className="mb-2 border-b pb-2">
                  <span className="font-semibold">Username:</span>{" "}
                  {pemilikData.username}
                </p>
                <p className="mb-2 border-b pb-2">
                  <span className="font-semibold">Nama:</span>{" "}
                  {pemilikData.nama || "N/A"}
                </p>
                <p className="mb-2 border-b pb-2">
                  <span className="font-semibold">Role:</span>{" "}
                  {pemilikData.role}
                </p>
                <p className="mb-2 border-b pb-2">
                  <span className="font-semibold">No. Telp:</span>{" "}
                  {pemilikData.no_telp || "N/A"}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Alamat:</span>{" "}
                  {pemilikData.alamat || "N/A"}
                </p>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex mt-4">
                  <Button onClick={handleEditClick} className="mr-2">
                    Edit
                  </Button>
                  <Button
                    onClick={handleShowChangePasswordModal}
                    className="bg-gray-500"
                  >
                    Change Password
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <Label>Nama:</Label>
                  <input
                    type="text"
                    name="nama"
                    value={editedPemilikData.nama || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <Label>No. Telp:</Label>
                  <input
                    type="text"
                    name="no_telp"
                    value={editedPemilikData.no_telp || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <Label>Alamat:</Label>
                  <input
                    type="text"
                    name="alamat"
                    value={editedPemilikData.alamat || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>

                {error && <p className="text-red-500">{error}</p>}
                <div className="flex mt-4">
                  <Button onClick={handleSaveClick} className="mr-2">
                    Save
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outlined"
                    className="bg-red-500 border border-gray-500"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {showChangePasswordModal && (
              <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-8 rounded-md">
                  <h2 className="text-xl font-semibold mb-4">
                    Change Password
                  </h2>
                  <div className="mb-4">
                    <Label>New Password:</Label>
                    <input
                      type="password"
                      name="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1 p-2 border rounded-md w-full"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleChangePassword} className="mr-2">
                      Save
                    </Button>
                    <Button
                      onClick={() => setShowChangePasswordModal(false)}
                      variant="outlined"
                      className="bg-red-500"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
