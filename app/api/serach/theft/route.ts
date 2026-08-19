import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "http://hopest.in/hopestphp/theftview.php",
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}