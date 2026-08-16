import { NextRequest, NextResponse } from "next/server";
import { getMetOfficeWeather } from "@/lib/services/weatherService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get("lat") || "54.23");
    const lng = parseFloat(searchParams.get("lng") || "-1.34");
    const locationName = searchParams.get("location") || "Holding Area";

    const weatherData = await getMetOfficeWeather(lat, lng, locationName);

    return NextResponse.json(weatherData);
  } catch (error: any) {
    console.error("Met Office weather API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Met Office spot forecast", details: error?.message },
      { status: 500 }
    );
  }
}
