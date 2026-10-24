"use client";

import { MapPin, Clock } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Lost Golden Retriever – Responds to 'Buddy'",
    category: "Lost",
    description:
      "My dog went missing near the park on Sunday evening. He's 3 years old, friendly, wearing a red collar.",
    location: "Central Park, NY",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Found: Black Leather Wallet",
    category: "Found",
    description:
      "Found a black leather wallet near the bus stop on Main St. Contains some cards. Please contact to claim.",
    location: "Main Street, Brooklyn",
    time: "5 hours ago",
  },
  {
    id: 3,
    title: "Stolen: Blue Trek Mountain Bike",
    category: "Theft",
    description:
      "My blue Trek bicycle was stolen from the bike rack outside the library.",
    location: "Public Library, Chicago",
    time: "1 day ago",
  },
  {
    id: 4,
    title: "Homemade Jams – Free to Take!",
    category: "Share",
    description:
      "I've made extra strawberry and mango jams this season. Completely free, come pick up from my doorstep.",
    location: "Maple Ave, Seattle",
    time: "3 hours ago",
  },
  {
    id: 5,
    title: "Lost: Silver iPhone 15 Pro",
    category: "Lost",
    description:
      "Lost my phone at the downtown café yesterday. Has a clear case with a small crack on the corner.",
    location: "Downtown Café, Austin",
    time: "6 hours ago",
  },
  {
    id: 6,
    title: "Free Coding Lessons for Kids",
    category: "Share",
    description:
      "I'm a software developer offering free weekend coding sessions for kids aged 8–14.",
    location: "Community Center, Denver",
    time: "1 day ago",
  },
];

export default function RecentPostsSection() {
  return (
    <section className="py-16 px-6 bg-[#fcfaf7] border-t border-[#ede5db]">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#2b1f18]">
              Recent Posts
            </h2>
            <p className="text-[#7a6252] mt-2">
              Latest from your community
            </p>
          </div>

          <button className="text-[#8b5e3c] font-semibold hover:text-[#4a2c17] hover:underline transition-colors cursor-pointer">
            View All
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-[#ede5db] rounded-2xl p-6 hover:shadow-lg hover:border-[#8b5e3c]/50 transition duration-300 bg-white"
            >
              {/* Category Badge */}
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f4efe9] text-[#6b3f23] border border-[#e5dcd3]">
                {post.category}
              </span>

              {/* Title */}
              <h3 className="text-lg font-serif font-bold mt-4 text-[#2b1f18]">
                {post.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#7a6252] mt-2 line-clamp-3">
                {post.description}
              </p>

              {/* Location + Time */}
              <div className="flex items-center justify-between mt-4 text-xs text-[#8c7565]">
                <div className="flex items-center gap-1">
                  <MapPin size={14} className="text-[#8b5e3c]" />
                  {post.location}
                </div>

                <div className="flex items-center gap-1">
                  <Clock size={14} className="text-[#8b5e3c]" />
                  {post.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
