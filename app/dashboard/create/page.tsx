"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const TYPES = ["LOST", "FOUND", "THEFT", "MISSING"] as const;

export default function CreatePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultType = (searchParams.get("type") || "LOST").toUpperCase();
  const [errors, setErrors] = useState<any>({});

  const [type] = useState(defaultType as typeof TYPES[number]);
  const [form, setForm] = useState({
    name: "",
    place: "",
    date: "",
    police: "",
    mob: "",
    town: "",
    district: "",
    pin: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors: any = {};
  
    if (!form.name.trim()) newErrors.name = "Item name is required";
  
    if (!form.place.trim()) newErrors.place = "Place is required";
  
    if (!form.date) newErrors.date = "Date is required";
  
    if (!form.police.trim()) {
      newErrors.police = "Please Enter Nearest Police Station"; // ✅ ADD THIS
    }
  
    if (!form.mob) {
      newErrors.mob = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(form.mob)) {
      newErrors.mob = "Enter valid 10-digit mobile number";
    }
  
    if (!form.pin) {
      newErrors.pin = "Pin code is required";
    } else if (!/^[0-9]{6}$/.test(form.pin)) {
      newErrors.pin = "Please Enter Six Pin Code";
    }
  
    if (!form.town.trim()) newErrors.town = "Town is required";
  
    if (!form.district.trim()) newErrors.district = "District is required";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validate()) return;

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user.id) {
    alert("Please login again.");
    router.push("/auth/login");
    return;
  }

  let api = "";
  let body: any = {
    Uid: user.id,
    Itemname: form.name,
    Nearpolicestation: form.police,
    Mob: form.mob,
    Town: form.town,
    District: form.district,
    Pin: form.pin,
  };

  switch (type) {
    case "LOST":
      api = "/api/create/lost";
      body.Lostplace = form.place;
      body.Lostdate = form.date;
      break;

    case "FOUND":
      api = "/api/create/found";
      body.Foundplace = form.place;
      body.Founddate = form.date;
      break;

    case "THEFT":
      api = "/api/create/theft";
      body.Theftplace = form.place;
      body.Theftdate = form.date;
      break;

    case "MISSING":
      alert("Missing records can only be created by Admin.");
      return;
  }

  try {
    const res = await axios.post(api, body);

    console.log(res.data);

    if (
      res.data.message === "success" ||
      res.data.status === "success" ||
      res.data.success === true
    ) {
      alert(`${type} created successfully.`);

      setForm({
        name: "",
        place: "",
        date: "",
        police: "",
        mob: "",
        town: "",
        district: "",
        pin: "",
      });

      router.push("/dashboard");
    } else {
      alert(res.data.message || "Unable to create record.");
    }
  } catch (err: any) {
    console.log(err);
    alert("Server Error");
  }
};

  const capitalized = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

  return (
    <div className="min-h-screen bg-[#e9e6e2] animated-gradient">
      {/* HEADER */}
      <div className="flex items-center px-6 pt-8">
        
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-[#4b3425] hover:scale-105 transition"
        >
          <ArrowLeft size={30} className="text-[#d89b52]" />
        </button>
      </div>

      <h1 className="text-center  text-2xl text-[#d89b52]  font-serif font-semibold">{type} CREATION</h1>


      <div className="max-w-2xl mx-auto px-6 py-10">
        <h2 className="text-center text-2xl font-serif  text-[#d89b52] mb-10 tracking-wide">
          {type} ITEM DETAILS
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <FormInput
            name="name"
            placeholder="Item Name :"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />

          <FormInput
            name="place"
            placeholder={`${capitalized(type)} Place :`}
            value={form.place}
            onChange={handleChange}
            error={errors.place}
          />

          <FormInput
            name="date"
            type="date"
            placeholder={`${capitalized(type)} Date :`}
            value={form.date}
            onChange={handleChange}
            error={errors.date}
          />

          <FormInput
            name="police"
            placeholder="Near Police Station :"
            value={form.police}
            onChange={handleChange}
            error={errors.police}   // optional validation
          />

          <FormInput
            name="mob"
            placeholder="Mob (+91) :"
            value={form.mob}
            onChange={handleChange}
            error={errors.mob}
          />

          <FormInput
            name="town"
            placeholder="Town :"
            value={form.town}
            onChange={handleChange}
            error={errors.town}
          />

          <FormInput
            name="district"
            placeholder="District :"
            value={form.district}
            onChange={handleChange}
            error={errors.district}
          />

          <FormInput
            name="pin"
            placeholder="Pin :"
            value={form.pin}
            onChange={handleChange}
            error={errors.pin}   // 🔥 THIS shows "Please Enter Six Pin Code"
          />
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              className="bg-[#7b4e3a] animated-gradient  text-[#d89b52] px-12 py-3 rounded-full text-xl shadow-lg hover:scale-105 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormInput({
  placeholder,
  name,
  value,
  onChange,
  type = "text",
  error,
}: any) {
  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-[#efebe7] border-2 rounded-2xl px-6 py-4 text-gray-700 focus:outline-none
          ${error ? "border-red-500" : "border-[#4b3425]"}`}
      />
      {error && (
        <p className="text-[#c62828]  text-[14px] mt-1">{error}</p>
      )}
    </div>
  );
}