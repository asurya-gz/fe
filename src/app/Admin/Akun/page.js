"use client";
import { Breadcrumb, Button } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { FaUserDoctor, FaUserNurse } from "react-icons/fa6";
import { GrUserManager, GrUserAdmin } from "react-icons/gr";
import { LiaUserNurseSolid } from "react-icons/lia";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminAkun() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newRole, setNewRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserUsername, setNewUserUsername] = useState("");
  const [newUserRole, setNewUserRole] = useState("");

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

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://bekk.up.railway.app/users", {
        withCredentials: true,
      });
      console.log("Users data:", response.data.users);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error.message);
      router.push("/");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [router]);

  const handleDeleteUser = async (userId) => {
    try {
      // Call the backend API to delete the user
      await axios.delete(`https://bekk.up.railway.app/users/${userId}`, {
        withCredentials: true,
      });

      // Update the state to reflect the changes
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
      alert("Pengguna Berhasil Di Hapus");
    } catch (error) {
      alert("Pengguna Gagal Di Hapus");
      console.error("Error deleting user:", error.message);
    }
  };

  const handleResetPassword = async (userId) => {
    try {
      // Call the backend API to reset the password
      await axios.put(
        `https://bekk.up.railway.app/users/reset-password/${userId}`,
        {
          withCredentials: true,
        }
      );

      // Update the state to reflect the changes
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === userId ? { ...u, password: "password" } : u
        )
      );

      alert("Password Berhasil di reset");
    } catch (error) {
      console.error("Error resetting password:", error.message);
    }
  };

  // untuk membuka modal update / edit
  const handleEditUser = (userId) => {
    const userToEdit = users.find((u) => u.id === userId);
    setEditingUser(userToEdit);
    setNewUsername(userToEdit.username);
    setNewRole(userToEdit.role);
    setShowModal(true);
  };

  // Handle save untuk edit data
  const handleSaveUser = async () => {
    try {
      // Call the backend API to update the user
      await axios.put(
        `https://bekk.up.railway.app/users/${editingUser.id}`,
        {
          username: newUsername,
          role: newRole,
        },
        {
          withCredentials: true,
        }
      );

      // Update the state to reflect the changes
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === editingUser.id
            ? { ...u, username: newUsername, role: newRole }
            : u
        )
      );

      // Close the modal
      setEditingUser(null);
      setNewUsername("");
      setNewRole("");
      setShowModal(false);

      alert("Pengguna Berhasil Di Update");
    } catch (error) {
      alert("Pengguna Gagal Di Update");
      console.error("Error updating user:", error.message);
    }
  };

  // Modal Untuk Edit Data
  const renderModal = () => {
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-6 rounded-lg z-20">
          <label className="block mb-2">Username:</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <label className="block mb-2">Role:</label>
          <input
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <div className="flex justify-end">
            <button
              onClick={handleSaveUser}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderAddUserModal = () => {
    return (
      <div
        className={`fixed inset-0 z-10 ${
          showAddUserModal ? "flex" : "hidden"
        } items-center justify-center overflow-x-hidden overflow-y-auto`}
      >
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-6 rounded-lg z-20">
          <label className="block mb-2">Username:</label>
          <input
            type="text"
            value={newUserUsername}
            onChange={(e) => setNewUserUsername(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <label className="block mb-2">Role:</label>
          <input
            type="text"
            value={newUserRole}
            onChange={(e) => setNewUserRole(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <div className="flex justify-end">
            <button
              onClick={handleAddUser}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add User
            </button>
            <button
              onClick={() => setShowAddUserModal(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleAddUser = async () => {
    try {
      // Call the backend API to add a new user
      await axios.post(
        "https://bekk.up.railway.app/tambahuser",
        {
          username: newUserUsername,
          role: newUserRole,
        },
        {
          withCredentials: true,
        }
      );

      // Fetch the updated list of users
      await fetchUsers();

      // Close the modal
      setNewUserUsername("");
      setNewUserRole("");
      setShowAddUserModal(false);

      alert("Pengguna Berhasil Ditambahkan");
    } catch (error) {
      alert("Pengguna Gagal Ditambahkan");
      console.error("Error adding user:", error.message);
    }
  };

  return (
    <div className="bg-[#ffcccc] min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb className="pt-4 pl-4" aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="../Admin" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Akun</Breadcrumb.Item>
      </Breadcrumb>
      {/* Breadcrumb end */}

      {/* Tambah user */}
      <Button
        className="ml-4 mt-4"
        color="dark"
        pill
        onClick={() => setShowAddUserModal(true)}
      >
        Tambah User
      </Button>

      {/* User Table */}
      <div className="overflow-x-auto mx-4 mt-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="border border-slate-900 px-4 py-2 bg-slate-900 text-white">
                Username
              </th>
              <th className="border border-slate-900 px-4 py-2 bg-slate-900 text-white">
                Role
              </th>
              <th className="border border-slate-900 px-4 py-2 bg-slate-900 text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-slate-900 px-4 py-2">
                  {user.username}
                </td>
                <td className="border border-slate-900 px-4 py-2">
                  {user.role}
                </td>
                <td className="border border-slate-900 px-4 py-2">
                  <div className="flex flex-wrap justify-center">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 m-1"
                      onClick={() => handleEditUser(user.id)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 m-1"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 m-1"
                      onClick={() => handleResetPassword(user.id)}
                    >
                      Reset Password
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* User Table end */}

      {/* Render the modal */}
      {editingUser && renderModal()}

      {/* Render the modal for adding a new user */}
      {renderAddUserModal()}
    </div>
  );
}
