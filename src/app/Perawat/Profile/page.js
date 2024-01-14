"use client";
import { Breadcrumb, Button, Label } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function PerawatProfile() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [perawatData, setPerawatData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPerawatData, setEditedPerawatData] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://bekk.up.railway.app/user", {
          withCredentials: true,
        });
        setUser(response.data.user);

        const perawatResponse = await axios.get(
          `https://bekk.up.railway.app/perawat?username=${response.data.user.username}`,
          {
            withCredentials: true,
          }
        );
        setPerawatData(perawatResponse.data.perawat);
        setEditedPerawatData(perawatResponse.data.perawat);
      } catch (error) {
        console.error("Error fetching user or perawat data:", error.message);
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
        `https://bekk.up.railway.app/perawat/${perawatData.id}`,
        editedPerawatData,
        {
          withCredentials: true,
        }
      );

      setPerawatData(response.data.perawat);

      setIsEditing(false);
      setError(null);

      const updatedPerawatResponse = await axios.get(
        `https://bekk.up.railway.app/perawat?username=${user.username}`,
        {
          withCredentials: true,
        }
      );
      setPerawatData(updatedPerawatResponse.data.perawat);
      setEditedPerawatData(updatedPerawatResponse.data.perawat);
    } catch (error) {
      console.error("Error updating perawat data:", error.message);
      setError("Error updating perawat data. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPerawatData((prevData) => ({
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
        `https://bekk.up.railway.app/perawat/change-password/${user.id}`,
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

      {perawatData && (
        <div>
          <h2 className="text-3xl font-semibold mb-4">Perawat Profile</h2>
          <div className="bg-white p-6 rounded-md shadow-md">
            {!isEditing ? (
              <div>
                <p className="mb-2 border-b pb-2">
                  <span className="font-semibold">Username:</span>{" "}
                  {perawatData.username}
                </p>
                <p className="mb-2 border-b pb-2">
                  <span className="font-semibold">Nama:</span>{" "}
                  {perawatData.nama || "N/A"}
                </p>
                <p className="mb-2 border-b pb-2">
                  <span className="font-semibold">Role:</span>{" "}
                  {perawatData.role}
                </p>
                <p className="mb-2 border-b pb-2">
                  <span className="font-semibold">No. Telp:</span>{" "}
                  {perawatData.no_telp || "N/A"}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Alamat:</span>{" "}
                  {perawatData.alamat || "N/A"}
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
                    value={editedPerawatData.nama || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <Label>No. Telp:</Label>
                  <input
                    type="text"
                    name="no_telp"
                    value={editedPerawatData.no_telp || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <Label>Alamat:</Label>
                  <input
                    type="text"
                    name="alamat"
                    value={editedPerawatData.alamat || ""}
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
          </div>

          {/* Change Password Modal */}
          {showChangePasswordModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div className="bg-white p-8 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                <div className="mb-4">
                  <Label>New Password:</Label>
                  <input
                    type="password"
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
                    className="bg-red-500 border border-gray-500"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
