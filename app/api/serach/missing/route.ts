import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "http://hopest.in/hopestphp/missingview.php",
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const text = await response.text();

    return new NextResponse(text, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching missing records:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}
