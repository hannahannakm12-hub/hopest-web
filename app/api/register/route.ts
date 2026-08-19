import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("REGISTER DATA:", body);

    const response = await fetch(
      "http://hopest.in/hopestphp/registerregister.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          Fullname: body.username.trim(),
          Mob: body.mobile.trim(),
          Mailid: body.password.trim(),
        }),
      }
    );

    const text = await response.text();

    console.log("PHP REGISTER RAW:", text);

    return NextResponse.json(JSON.parse(text));
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}