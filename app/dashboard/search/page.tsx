"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, HelpCircle, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = (searchParams.get("type") || "LOST").toUpperCase();

  const [query, setQuery] = useState("");
  const [items, setItems] = useState<any[]>([]);


  useEffect(() => {
    console.log("Search Page Mounted");
    console.log("USER =", localStorage.getItem("user"));
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let url = "";

        switch (type) {
          case "LOST":
            url = "/api/serach/lost";
            break;

          case "FOUND":
            url = "/api/serach/found";
            break;

          case "THEFT":
            url = "/api/serach/theft";
            break;

          case "MISSING":
            url = "/api/serach/missing";
            break;

          default:
            url = "/api/serach/lost";
        }

        const res = await axios.get(url);
        console.log("TYPE =", type);
        console.log("API DATA =", res.data);
        // PHP returns array directly
        const list = Array.isArray(res.data) ? res.data : [];

        const filtered = list.filter((item: any) => {
          const itemName =
            item.Itemname ||
            item.itemname ||
            item.name ||
            "";

          return itemName
            .toLowerCase()
            .includes(query.toLowerCase());
        });

        setItems(filtered);
      } catch (err) {
        console.log(err);
        alert("Unable to load data.");
      }
    };

    fetchItems();
  }, [query, type]);

  return (
    <div className="min-h-screen animated-gradient bg-[#e9e6e1]">

      {/* HEADER */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="animated-gradient text-white pb-24 pt-6 px-6 rounded-b-3xl"
      >
        <div className="flex justify-between items-center mb-6">
          <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
          <span className="text-xL tracking-widest font-serif opacity-80">
            SEARCH
          </span>
          <HelpCircle className="cursor-pointer opacity-80" />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-semibold font-serif">
            {type.charAt(0) + type.slice(1).toLowerCase()} Items
          </h1>
          <p className="text-sm opacity-80 mt-2 font-serif">
            Browse and search through reported items
          </p>
        </div>
      </motion.div>

      {/* SEARCH BOX */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-2xl mx-auto px-6 -mt-12"
      >
        <div className="bg-white rounded-2xl shadow-lg border p-4">
          <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-3 py-2">
            <Search size={18} className="text-gray-500" />

            <input
              type="text"
              placeholder={`Search ${type.toLowerCase()} items`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
            />

            {query && (
              <button onClick={() => setQuery("")}>✕</button>
            )}
          </div>

          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>{items.length} results found</span>
            <span>Latest first</span>
          </div>
        </div>
      </motion.div>

      {/* RESULTS */}
      <div className="max-w-2xl mx-auto px-6 pb-12 space-y-6 mt-6">
        {items.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No items found.
          </p>
        ) : (
          items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >

              {/* ✅ ONLY FOR MISSING */}
              {type === "MISSING" ? (
                <div className="bg-white rounded-2xl p-5 shadow-md border">
                  <h2 className="text-lg font-semibold mb-2">
                    {item.Itemname}
                  </h2>

                  <p className="text-sm text-gray-500 mb-4">
                    {item.district} • {item.police}
                  </p>

                  <button
                    onClick={() => router.push(`/missing/${item.id}`)}
                    className="w-full bg-[#4b3425] text-white py-2 rounded-xl"
                  >
                    View
                  </button>
                </div>
              ) : (

                /* ✅ NORMAL CARD (UNCHANGED) */
                <div className="bg-white rounded-2xl  font-serif p-5 shadow-md border-t-4 border-[#4b3425]">
                  <h2 className="text-gray-800 font-semibold">
                    {item.itemname}
                  </h2>

                  <div className="grid grid-cols-2 gap-3 text-sm mt-4">
                    <div className="bg-gray-100 rounded-xl p-3">
                      <p className="text-xs text-gray-500 uppercase">
                        {type} Place
                      </p>
                      <p>
                        {type === "LOST"
                          ? item.lostplace
                          : type === "FOUND"
                            ? item.foundplace
                            : type === "THEFT"
                              ? item.theftplace
                              : item.missingplace}
                      </p>
                    </div>

                    <div className="bg-gray-100 rounded-xl p-3">
                      <p className="text-xs text-gray-500 uppercase">
                        {type} Date
                      </p>
                      <p>
                        {type === "LOST"
                          ? item.lostdate
                          : type === "FOUND"
                            ? item.founddate
                            : type === "THEFT"
                              ? item.theftdate
                              : item.missingdate}
                      </p>
                    </div>

                    <div className="bg-gray-100 rounded-xl p-3">
                      <p className="text-xs text-gray-500 uppercase">
                        Police
                      </p>
                      <p>{item.nearpolicestation}</p>                    </div>

                    <div className="bg-gray-100 rounded-xl p-3">
                      <p className="text-xs text-gray-500 uppercase">
                        District
                      </p>
                      <p>{item.district}</p>                    </div>
                    <div className="bg-gray-100 rounded-xl p-3">
                      <p className="text-xs text-gray-500 uppercase">Town</p>
                      <p>{item.town}</p>                    </div>
                    <div className="bg-gray-100 rounded-xl p-3">
                      <p className="text-xs text-gray-500 uppercase">PIN</p>
                      <p>{item.pin}</p>                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}