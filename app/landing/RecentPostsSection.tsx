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
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#4b2e1e]">
              Recent Posts
            </h2>
            <p className="text-gray-600 mt-2">
              Latest from your community
            </p>
          </div>

          <button className="text-blue-600 font-medium hover:underline">
            View All
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border rounded-2xl p-6 hover:shadow-lg transition duration-300 bg-white"
            >
              {/* Category Badge */}
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                {post.category}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold mt-4 text-gray-800">
                {post.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {post.description}
              </p>

              {/* Location + Time */}
              <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  {post.location}
                </div>

                <div className="flex items-center gap-1">
                  <Clock size={14} />
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
