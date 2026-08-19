"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, Phone } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    mobile: "",
    password: "",
  });

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const newErrors = {
      username: "",
      mobile: "",
      password: "",
    };

    let isValid = true;

    // Username Validation
    if (username.trim() === "") {
      newErrors.username = "Please Enter Your Full Name";
      isValid = false;
    } else if (username.trim().length < 3) {
      newErrors.username =
        "Username should be at least 3 characters";
      isValid = false;
    }

    // Mobile Validation
    if (mobile.trim() === "") {
      newErrors.mobile = "Please Enter Your Valid Mobile Number";
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
      newErrors.mobile =
        "Mobile Number Length Should Be 10 Numbers";
      isValid = false;
    }

    // Password Validation
    if (password.trim() === "") {
      newErrors.password = "Please Enter Strong Password";
      isValid = false;
    } else if (password.trim().length < 6) {
      newErrors.password =
        "Password Length Should Be More Than 6 Characters";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          mobile: mobile.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      console.log("REGISTER RESPONSE:", data);

      if (data.message === "success") {
        alert("Account created successfully!");
        router.push("/auth/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col animated-gradient">
      <div className="text-center pt-20 animate-modern">
        <h1 className="text-5xl font-serif text-[#d89b52]">
          Hello Register!
        </h1>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md bg-[#f4efe9] rounded-3xl p-10 shadow-2xl animate-modern animate-float">
          <form onSubmit={handleRegister} className="space-y-8">
            {/* Username */}
            <div className="relative">
              <label className="block text-sm font-semibold text-[#3b2a21] mb-2">
                USERNAME
              </label>

              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);

                  if (errors.username) {
                    setErrors({
                      ...errors,
                      username: "",
                    });
                  }
                }}
                className={`w-full bg-transparent border-b py-2 pr-8 outline-none ${
                  errors.username
                    ? "border-red-500"
                    : "border-[#c9bfb6]"
                }`}
              />

              <User
                className="absolute right-0 bottom-3 text-[#6b3f23]"
                size={18}
              />

              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Mobile */}
            <div className="relative">
              <label className="block text-sm font-semibold text-[#3b2a21] mb-2">
                MOBILE (+91)
              </label>

              <input
                type="tel"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");

                  if (value.length <= 10) {
                    setMobile(value);

                    if (errors.mobile) {
                      setErrors({
                        ...errors,
                        mobile: "",
                      });
                    }
                  }
                }}
                className={`w-full bg-transparent border-b py-2 pr-8 outline-none ${
                  errors.mobile
                    ? "border-red-500"
                    : "border-[#c9bfb6]"
                }`}
              />

              <Phone
                className="absolute right-0 bottom-3 text-[#6b3f23]"
                size={18}
              />

              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobile}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-semibold text-[#3b2a21] mb-2">
                PASSWORD
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                  if (errors.password) {
                    setErrors({
                      ...errors,
                      password: "",
                    });
                  }
                }}
                className={`w-full bg-transparent border-b py-2 pr-8 outline-none ${
                  errors.password
                    ? "border-red-500"
                    : "border-[#c9bfb6]"
                }`}
              />

              <Lock
                className="absolute right-0 bottom-3 text-[#6b3f23]"
                size={18}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <p className="text-center text-sm text-[#6b3f23] mt-4">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/auth/login")}
                className="font-semibold cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>

            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-xl text-white font-medium shimmer-button hover:opacity-90 transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}