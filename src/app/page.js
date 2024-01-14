"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, Card, Label, TextInput, Navbar } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { AiOutlineLogin } from "react-icons/ai";

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
    <div className="bg-[#ffcccc] min-h-screen">
      {/* Navbar */}
      <Navbar fluid rounded>
        <Navbar.Brand href="#">
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
      <div className="p-8 mx-auto mt-4 w-full text-center rounded-md">
        <img
          src="logo.png" // Replace with the path to your logo image
          alt="Klinik Kartika Logo"
          className="mx-auto mb-4"
          style={{ maxWidth: "150px" }} // Adjust the max width according to your needs
        />
        <h1 className="text-2xl font-semibold mb-4">KLINIK KARTIKA</h1>
        <p className="text-gray-600">
          Sistem Manajemen klinik Kartika. Silahkan Login Untuk Melanjutkan
        </p>
      </div>
      {/* Selamat Datang end*/}

      {/* Form Input Login */}
      <div className="flex items-center justify-center mt-[5%]">
        <Card
          style={{
            width: "400px",
            background: "none",
            boxShadow: "none",
            border: "none",
          }}
        >
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
              className="bg-pink-500 hover:bg-pink-600 text-white"
            >
              <AiOutlineLogin size="1.5em" style={{ marginRight: "0.5em" }} />
              Masuk
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
