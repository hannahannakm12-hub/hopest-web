"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Search,
  MapPin,
  CalendarDays,
  Phone,
  Building2,
  Landmark,
  Map,
} from "lucide-react";

export default function MissingPage() {
  const router = useRouter();

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissing = async () => {
      try {
        const response = await fetch("/api/missing");
        const data = await response.json();

        console.log("Missing Data:", data);

        setItems(data);
      } catch (error) {
        console.error("Error fetching missing persons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMissing();
  }, []);

  const InfoRow = ({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value?: string;
  }) => (
    <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
      <div className="text-[#4b3425] mt-1">{icon}</div>

      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500">
          {label}
        </p>

        <p className="font-medium text-gray-800">
          {value?.trim() ? value : "Not Available"}
        </p>
      </div>
    </div>
  );

  return (

<div className="min-h-screen animated-gradient bg-[#F6F3EE]">

{/* HERO */}

<div className="bg-[#5B3A29] animated-gradient text-white rounded-b-[50px] pb-16">

<div className="max-w-5xl mx-auto px-6 pt-6">

<div className="flex items-center">

<ArrowLeft
className="cursor-pointer"
onClick={()=>router.back()}
/>

<div className="flex-1 text-center tracking-[8px] text-sm">
MISSING
</div>

<div className="w-6"></div>

</div>

<div className="text-center mt-10">

<div className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm mb-5">
Verified Public Reports
</div>

<h1 className="text-5xl font-bold font-serif">
Missing Persons
</h1>

<p className="mt-4 text-white/80 text-lg">
Help find and report missing individuals.
</p>

</div>

<div className="mt-10">

<div className="bg-white rounded-full flex items-center px-5 py-4">

<Search className="text-gray-400"/>

<input
placeholder="Search by name, district or place"
className="flex-1 outline-none ml-4 text-gray-700 bg-transparent"
/>

</div>

</div>

</div>

</div>

<div className="max-w-5xl mx-auto px-5 py-10">

{loading && (
<p className="text-center text-gray-500">
Loading...
</p>
)}

{!loading && items.length===0 && (
<p className="text-center">
No Missing Persons Found
</p>
)}

{items.map((item:any,index:number)=>(

<motion.div
  key={item.id}
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.1 }}
  className="
    bg-white
    rounded-[10px]
    shadow-xl
    border
    border-[#e3d4c6]
    border-t-[6px]
    border-t-[#6B4423]
    overflow-hidden
    mb-10
    hover:shadow-2xl
    transition-all
    duration-300
  "
>

<div className="md:flex">

{/* IMAGE */}

<div className="md:w-72 flex justify-center p-8">

<img
src={`http://hopest.in/hopestphp/uploads/${item.itemimage}`}
alt={item.itemname}
className="w-60 h-72 rounded-3xl object-cover shadow-lg"
onError={(e)=>{
e.currentTarget.src="";
}}
/>

</div>

{/* DETAILS */}

<div className="flex-1 p-8">

<div className="inline-block bg-red-100 text-red-700 px-4 py-1 rounded-full text-xs font-semibold">
MISSING
</div>

<h2 className="text-4xl font-bold mt-3 font-serif">
{item.itemname || "Unknown"}
</h2>

<div className="mt-4 space-y-2 text-gray-600">

<div className="flex items-center gap-2">

<MapPin size={18}/>

<span>
{item.town || "-"},
{" "}
{item.district || "-"}
</span>

</div>

<div className="flex items-center gap-2">

<CalendarDays size={18}/>

<span>
{item.lostdate || "Not Available"}
</span>

</div>

</div>

</div>

</div>

<hr/>

<div className="grid md:grid-cols-2 gap-5 p-8">

<Card
icon={<Building2 size={18}/>}
title="District"
value={item.district}
/>

<Card
icon={<Landmark size={18}/>}
title="Police Station"
value={item.nearpolicestation}
/>

<Card
icon={<CalendarDays size={18}/>}
title="Date of Occurrence"
value={item.lostdate}
/>

<Card
icon={<MapPin size={18}/>}
title="Place of Occurrence"
value={item.lostplace}
/>

<Card
icon={<Map size={18}/>}
title="Town"
value={item.town}
/>

<Card
icon={<Map size={18}/>}
title="PIN"
value={item.pin}
/>

<Card
icon={<Phone size={18}/>}
title="Contact Number"
value={item.mob}
/>

</div>

<div className="grid md:grid-cols-2 gap-4 p-8 pt-0">

<a
href={`tel:${item.mob}`}
className="bg-[#5B3A29] text-white py-4 rounded-xl text-center font-semibold hover:opacity-90"
>
Call
</a>

<a
href={`https://wa.me/91${item.mob}`}
target="_blank"
className="bg-green-600 text-white py-4 rounded-xl text-center font-semibold hover:bg-green-700"
>
WhatsApp
</a>

</div>

</motion.div>

))}

</div>

</div>
)
}

function Card({
icon,
title,
value,
}:{
icon:React.ReactNode;
title:string;
value:string;
}){

return(

<div className="bg-[#F7F4EF] border rounded-2xl p-5 flex items-start gap-4">

<div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow">

{icon}

</div>

<div>

<p className="text-xs uppercase tracking-widest text-gray-500">
{title}
</p>

<p className="mt-1 text-lg font-semibold text-gray-800">
{value || "Not Available"}
</p>

</div>

</div>

)

}