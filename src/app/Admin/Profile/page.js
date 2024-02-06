"use client";
import { Breadcrumb, Button, Label } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminProfile() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAdminData, setEditedAdminData] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handleShowChangePasswordModal = () => {
    setShowChangePasswordModal(true);
  };

  const handleChangePassword = async () => {
    try {
      await axios.put(
        `https://bekk.up.railway.app/admin/change-password/${user.id}`,
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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://bekk.up.railway.app/user", {
          withCredentials: true,
        });
        setUser(response.data.user);

        const adminResponse = await axios.get(
          `https://bekk.up.railway.app/admin?username=${response.data.user.username}`,
          {
            withCredentials: true,
          }
        );
        setAdminData(adminResponse.data.admin);
        setEditedAdminData(adminResponse.data.admin);
      } catch (error) {
        console.error("Error fetching user or admin data:", error.message);
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
        `https://bekk.up.railway.app/admin/${adminData.id}`,
        editedAdminData,
        {
          withCredentials: true,
        }
      );

      const updatedAdminResponse = await axios.get(
        `https://bekk.up.railway.app/admin?username=${user.username}`,
        {
          withCredentials: true,
        }
      );

      setAdminData(updatedAdminResponse.data.admin);

      setIsEditing(false);
      setError(null);
    } catch (error) {
      console.error("Error updating admin data:", error.message);
      setError("Error updating admin data. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!isEditing && adminData) {
      setEditedAdminData(adminData);
    }
  }, [isEditing, adminData]);

  return (
    <div className="bg-[#ffcccc] min-h-screen p-8">
      <Breadcrumb className="mb-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/Admin" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Profile</Breadcrumb.Item>
      </Breadcrumb>

      {adminData && (
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-blue-800">
            Admin Profile
          </h2>
          <div className="bg-white p-6 rounded-md shadow-md">
            {!isEditing ? (
              <div>
                <p className="mb-2 border-b pb-2">
                  <span className="font-semibold">Username:</span>{" "}
                  {adminData.username}
                </p>
                <p className="mb-2 border-b pb-2">
                  <span className="font-semibold">Nama:</span>{" "}
                  {adminData.nama || "N/A"}
                </p>
                <p className="mb-2 border-b pb-2">
                  <span className="font-semibold">Role:</span> {adminData.role}
                </p>
                <p className="mb-2 border-b pb-2">
                  <span className="font-semibold">No. Telp:</span>{" "}
                  {adminData.no_telp || "N/A"}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Alamat:</span>{" "}
                  {adminData.alamat || "N/A"}
                </p>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex mt-4">
                  <Button
                    onClick={handleEditClick}
                    className="bg-blue-800 text-white mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={handleShowChangePasswordModal}
                    className="bg-amber-400 text-black"
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
                    value={editedAdminData.nama || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <Label>No. Telp:</Label>
                  <input
                    type="text"
                    name="no_telp"
                    value={editedAdminData.no_telp || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <Label>Alamat:</Label>
                  <input
                    type="text"
                    name="alamat"
                    value={editedAdminData.alamat || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>

                {error && <p className="text-red-500">{error}</p>}
                <div className="flex mt-4">
                  <Button
                    onClick={handleSaveClick}
                    className="mr-2 bg-blue-800"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outlined"
                    className="bg-red-500 hover:bg-yellow-400 text-black"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showChangePasswordModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
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
              <Button
                onClick={handleChangePassword}
                className="mr-2 bg-blue-800"
              >
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
  );
}
