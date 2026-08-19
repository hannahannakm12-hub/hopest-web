"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MyCreations() {
  const router = useRouter();

  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const res = await axios.post("/api/mycreation", {
        uid: user.id,
      });

      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
      alert("Unable to load items");
    }
  };

  const handleDelete = async (id: number, type: string) => {
    try {
      const res = await axios.post("/api/delete", {
        itemId: id,
        type,
      });

      if (res.data.message === "success") {
        setItems((prev) => prev.filter((item) => item.id !== id));
        alert("Deleted successfully");
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen animated-gradient bg-[#e9e6e1]">

      {/* HEADER */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="animated-gradient text-white pb-24 pt-6 px-6 rounded-b-3xl"
      >
        <div className="flex items-center gap-4 mb-4">
          <ArrowLeft
            className="cursor-pointer text-[#d89b52]"
            size={24}
            onClick={() => router.back()}
          />
        </div>

        <h1 className="text-2xl text-[#d89b52] text-center font-serif font-semibold">
          My Creations
        </h1>

        <p className="text-center text-[#d89b52] mt-2">
          Manage your created items
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto px-6 pb-12 mt-6 space-y-6">

        {items.length === 0 ? (
          <p className="text-center text-lg text-[#d89b52]">
            No items found.
          </p>
        ) : (
          items.map((item: any, index) => (
            <motion.div
              key={`${item.type}-${item.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-white rounded-2xl p-5 shadow-md border-t-4 border-[#4b3425] relative"
            >

              <button
                onClick={() => handleDelete(item.id, item.type)}
                className="absolute top-3 right-3 text-red-500 font-bold text-sm px-2 py-1 rounded-lg border border-red-300 hover:bg-red-50"
              >
                Delete
              </button>

              <h2 className="text-xl font-semibold text-[#4b3425]">
                {item.itemname}
              </h2>

              <p className="text-sm mt-1 text-blue-600 font-semibold">
                {item.type}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-5">

                <div className="bg-gray-100 rounded-xl p-3">
                  <p className="text-xs text-gray-500 uppercase">
                    Place
                  </p>

                  <p>
                    {item.lostplace ||
                      item.foundplace ||
                      item.theftplace}
                  </p>
                </div>

                <div className="bg-gray-100 rounded-xl p-3">
                  <p className="text-xs text-gray-500 uppercase">
                    Date
                  </p>

                  <p>
                    {item.lostdate ||
                      item.founddate ||
                      item.theftdate}
                  </p>
                </div>

                <div className="bg-gray-100 rounded-xl p-3">
                  <p className="text-xs text-gray-500 uppercase">
                    Police
                  </p>

                  <p>{item.nearpolicestation}</p>
                </div>

                <div className="bg-gray-100 rounded-xl p-3">
                  <p className="text-xs text-gray-500 uppercase">
                    District
                  </p>

                  <p>{item.district}</p>
                </div>

                <div className="bg-gray-100 rounded-xl p-3">
                  <p className="text-xs text-gray-500 uppercase">
                    Town
                  </p>

                  <p>{item.town}</p>
                </div>

                <div className="bg-gray-100 rounded-xl p-3">
                  <p className="text-xs text-gray-500 uppercase">
                    PIN
                  </p>

                  <p>{item.pin}</p>
                </div>

              </div>

            </motion.div>
          ))
        )}

      </div>
    </div>
  );
}