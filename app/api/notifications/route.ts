import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid") || "";

    // 1. Check if a dedicated PHP notification endpoint exists
    try {
      const phpNotifRes = await fetch(
        `http://hopest.in/hopestphp/get_notifications.php${uid ? `?uid=${uid}` : ""}`,
        { cache: "no-store", signal: AbortSignal.timeout(3000) }
      );
      if (phpNotifRes.ok) {
        const phpData = await phpNotifRes.json();
        if (Array.isArray(phpData) && phpData.length > 0) {
          return NextResponse.json({
            success: true,
            source: "php_backend",
            notifications: phpData.map((n: any, idx: number) => ({
              id: n.id ? String(n.id) : `notif-${idx}`,
              title: n.title || "Community Update",
              message: n.message || n.desc || "",
              category: n.category || "system",
              timestamp: n.created_at || "Recent",
              link: n.link || (n.category === "missing" ? "/missing" : "/dashboard/search"),
            })),
          });
        }
      }
    } catch {
      // PHP notifications table/script not yet deployed, fallback seamlessly to live feeds
    }

    // 2. Seamlessly aggregate notifications from live community feeds (lost, found, missing, theft)
    // WITHOUT modifying or breaking any existing PHP scripts or endpoints
    const [missingRes, foundRes, lostRes] = await Promise.all([
      fetch("http://hopest.in/hopestphp/missingview.php", { cache: "no-store" })
        .then((r) => r.json())
        .catch(() => []),
      fetch("http://hopest.in/hopestphp/foundview.php", { cache: "no-store" })
        .then((r) => r.json())
        .catch(() => []),
      fetch("http://hopest.in/hopestphp/lostview.php", { cache: "no-store" })
        .then((r) => r.json())
        .catch(() => []),
    ]);

    const notifications: Array<{
      id: string;
      title: string;
      message: string;
      category: "missing" | "lost" | "found" | "theft" | "system";
      timestamp: string;
      link: string;
    }> = [];

    // Add recent Missing reports (highest priority)
    if (Array.isArray(missingRes)) {
      const latestMissing = missingRes.slice(-3).reverse();
      latestMissing.forEach((item: any) => {
        if (item && item.itemname) {
          const loc = item.lostplace || item.district || item.town || "Community";
          notifications.push({
            id: `missing-${item.id || Math.random()}`,
            title: `🚨 Urgent: Missing Alert - ${item.itemname}`,
            message: `Reported missing at ${loc}. Please review photo & report any sightings.`,
            category: "missing",
            timestamp: item.lostdate || "Recent Alert",
            link: "/missing",
          });
        }
      });
    }

    // Add recent Found items
    if (Array.isArray(foundRes)) {
      const latestFound = foundRes.slice(-3).reverse();
      latestFound.forEach((item: any) => {
        if (item && item.itemname) {
          const loc = item.foundplace || item.district || item.town || "Nearby";
          notifications.push({
            id: `found-${item.id || Math.random()}`,
            title: `📦 Item Found: ${item.itemname}`,
            message: `Found at ${loc}. Check description to claim if it belongs to you.`,
            category: "found",
            timestamp: item.founddate || "Recently",
            link: "/dashboard/search?tab=found",
          });
        }
      });
    }

    // Add recent Lost items
    if (Array.isArray(lostRes)) {
      const latestLost = lostRes.slice(-2).reverse();
      latestLost.forEach((item: any) => {
        if (item && item.itemname) {
          const loc = item.lostplace || item.district || "Nearby";
          notifications.push({
            id: `lost-${item.id || Math.random()}`,
            title: `🔍 Lost Belonging: ${item.itemname}`,
            message: `Reported lost in ${loc}. Please contact if found.`,
            category: "lost",
            timestamp: item.lostdate || "Recently",
            link: "/dashboard/search?tab=lost",
          });
        }
      });
    }

    return NextResponse.json({
      success: true,
      source: "live_feeds",
      notifications,
    });
  } catch (error: any) {
    console.error("Notifications API error:", error);
    return NextResponse.json(
      { success: false, notifications: [] },
      { status: 500 }
    );
  }
}
