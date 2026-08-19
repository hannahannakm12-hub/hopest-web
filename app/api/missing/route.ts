import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "http://hopest.in/hopestphp/missingview.php",
    {
      cache: "no-store",
    }
  );

  console.log("Status:", response.status);
  console.log("Content-Type:", response.headers.get("content-type"));

  const text = await response.text();
  console.log(text);

  return new NextResponse(text, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}