"use client";
import { Breadcrumb, Button, Label } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ApotekerProfile() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [apotekerData, setApotekerData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedApotekerData, setEditedApotekerData] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://bekk.up.railway.app/user", {
          withCredentials: true,
        });
        setUser(response.data.user);

        const apotekerResponse = await axios.get(
          `https://bekk.up.railway.app/apoteker?username=${response.data.user.username}`,
          {
            withCredentials: true,
          }
        );
        setApotekerData(apotekerResponse.data.apoteker);
        setEditedApotekerData(apotekerResponse.data.apoteker);
      } catch (error) {
        console.error("Error fetching user or apoteker data:", error.message);
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
        `https://bekk.up.railway.app/apoteker/${apotekerData.id}`,
        editedApotekerData,
        {
          withCredentials: true,
        }
      );

      setApotekerData(response.data.apoteker);

      setIsEditing(false);
      setError(null);

      const updatedApotekerResponse = await axios.get(
        `https://bekk.up.railway.app/apoteker?username=${user.username}`,
        {
          withCredentials: true,
        }
      );
      setApotekerData(updatedApotekerResponse.data.apoteker);
      setEditedApotekerData(updatedApotekerResponse.data.apoteker);
    } catch (error) {
      console.error("Error updating apoteker data:", error.message);
      setError("Error updating apoteker data. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedApotekerData((prevData) => ({
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
        `https://bekk.up.railway.app/apoteker/change-password/${user.id}`,
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
        <Breadcrumb.Item href="/Apoteker" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Profile</Breadcrumb.Item>
      </Breadcrumb>

      {apotekerData && (
        <div>
          <h2 className="text-3xl font-semibold mb-4">Apoteker Profile</h2>
          <div className="bg-white p-6 rounded-md shadow-md">
            {!isEditing ? (
              <div>
                <p className="mb-2 border-b pb-2">
                  <span className="font-semibold">Username:</span>{" "}
                  {apotekerData.username}
                </p>
                <p className="mb-2 border-b pb-2">
                  <span className="font-semibold">Nama:</span>{" "}
                  {apotekerData.nama || "N/A"}
                </p>
                <p className="mb-2 border-b pb-2">
                  <span className="font-semibold">Role:</span>{" "}
                  {apotekerData.role}
                </p>
                <p className="mb-2 border-b pb-2">
                  <span className="font-semibold">No. Telp:</span>{" "}
                  {apotekerData.no_telp || "N/A"}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Alamat:</span>{" "}
                  {apotekerData.alamat || "N/A"}
                </p>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex mt-4">
                  <Button onClick={handleEditClick} className="mr-2">
                    Edit
                  </Button>
                  <Button
                    className="bg-gray-500"
                    onClick={handleShowChangePasswordModal}
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
                    value={editedApotekerData.nama || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <Label>No. Telp:</Label>
                  <input
                    type="text"
                    name="no_telp"
                    value={editedApotekerData.no_telp || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <Label>Alamat:</Label>
                  <input
                    type="text"
                    name="alamat"
                    value={editedApotekerData.alamat || ""}
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

            {/* Change Password Modal */}
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
