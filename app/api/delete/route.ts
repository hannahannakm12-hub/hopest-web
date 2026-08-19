import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { itemId, type } = await req.json();

    let phpUrl = "";

    switch (type) {
      case "LOST":
        phpUrl = "http://hopest.in/hopestphp/deletelost.php";
        break;

      case "FOUND":
        phpUrl = "http://hopest.in/hopestphp/deletefound.php";
        break;

      case "THEFT":
        phpUrl = "http://hopest.in/hopestphp/deletetheft.php";
        break;

      default:
        return NextResponse.json(
          { message: "Invalid Type" },
          { status: 400 }
        );
    }

    const response = await fetch(phpUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `itemId=${itemId}`,
    });

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}