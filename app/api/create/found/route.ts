import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const formData = new FormData();

    formData.append("Uid", body.Uid);
    formData.append("Itemname", body.Itemname);
    formData.append("Foundplace", body.Foundplace);
    formData.append("Founddate", body.Founddate);
    formData.append("Nearpolicestation", body.Nearpolicestation);
    formData.append("Mob", body.Mob);
    formData.append("Town", body.Town);
    formData.append("District", body.District);
    formData.append("Pin", body.Pin);

    const response = await fetch(
      "http://hopest.in/hopestphp/registerfound.php",
      {
        method: "POST",
        body: formData,
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