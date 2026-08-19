import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { uid } = await req.json();

    const urls = [
      {
        type: "LOST",
        url: `http://hopest.in/hopestphp/lostview2.php?uid=${uid}`,
      },
      {
        type: "FOUND",
        url: `http://hopest.in/hopestphp/foundview2.php?uid=${uid}`,
      },
      {
        type: "THEFT",
        url: `http://hopest.in/hopestphp/theftview2.php?uid=${uid}`,
      },
    ];

    let allItems: any[] = [];

    for (const api of urls) {
      try {
        const response = await fetch(api.url, {
          method: "GET",
          cache: "no-store",
        });

        const text = await response.text();

        try {
          const data = JSON.parse(text);

          if (Array.isArray(data)) {
            const formatted = data.map((item: any) => ({
              ...item,
              type: api.type,
            }));

            allItems.push(...formatted);
          }
        } catch {
          // ignore if PHP returns "failed"
        }
      } catch {
        // ignore API failure
      }
    }

    return NextResponse.json(allItems);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}