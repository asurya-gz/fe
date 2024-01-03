"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, Card, Label, TextInput, Navbar } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

export default function MyPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://bekk.up.railway.app/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true, // Send session cookie with the request
        }
      );

      console.log(response.data);

      const redirectPage = response.data.redirectPage;

      if (redirectPage) {
        router.push(redirectPage);
      } else {
        console.warn("Halaman redirect tidak ditemukan");
      }
    } catch (error) {
      console.error("Login failed:", error.message);

      if (error.response) {
        console.error("Response status:", error.response.status);
        if (error.response.status === 401) {
          setErrorMessage("Username or password is incorrect");
        } else {
          setErrorMessage("Login failed. Please try again later.");
        }
      } else {
        setErrorMessage("Login failed. Please try again later.");
      }

      setShowAlert(true);
    }
  };

  return (
    <div className="bg-[#f0f0f0] h-screen">
      {/* Navbar */}
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <img
            src="/logo.png"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Klinik Kartika
          </span>
        </Navbar.Brand>
      </Navbar>
      {/* Navbar end*/}

      {/* Selamat Datang */}
      <div className="bg-[#f0f0f0] p-8 mx-auto mt-4 w-full text-center rounded-md">
        <h1 className="text-2xl font-semibold mb-4">
          Selamat datang di Sistem Manajemen Klinik Kartika
        </h1>
        <p className="text-gray-600">
          Silahkan login untuk melanjutkan. Gunakan username dan password Anda
          untuk masuk ke akun.
        </p>
      </div>
      {/* Selamat Datang end*/}

      {/* Form Input Login */}
      <div className="flex items-center justify-center mt-[5%]">
        <Card style={{ width: "400px" }}>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Username" />
              </div>
              <TextInput
                id="username"
                type="text"
                placeholder="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Login
            </Button>
          </form>
          {showAlert && (
            <Alert color="failure" icon={HiInformationCircle}>
              <span className="font-medium">{errorMessage}</span>
            </Alert>
          )}
        </Card>
      </div>
      {/* Form Input Login End*/}
    </div>
  );
}
