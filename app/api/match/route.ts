import dbConnect from "@/utils/db";
import Facility from "@/models/Facility";
import { NextResponse } from "next/server";

// Named export for POST request handler
export async function POST(req: Request) {
  await dbConnect();

  try {
    const { name, careType, zipCode } = await req.json();

    // If careType is day care, return a specific message
    if (careType.toLowerCase() === "day care") {
      return NextResponse.json({
        match: null,
        reason: "Day care is not supported.",
      });
    }

    // Find facilities based on care type and zip code range
    const facilities = await Facility.find({
      typeOfCare: { $in: [careType] },
      "zipRange.from": { $lte: zipCode },
      "zipRange.to": { $gte: zipCode },
    });

    // Debug: log the filtered facilities
    console.log("Filtered Facilities: ", facilities);

    // Filter available facilities
    const available = facilities.filter((f) => f.capacity === "Available");

    // Debug: log available facilities
    console.log("Available Facilities: ", available);

    const sorted = available.sort(
      (a, b) =>
        Math.abs(a.facilityZip - zipCode) - Math.abs(b.facilityZip - zipCode)
    );

    // Debug: log sorted available facilities
    console.log("Sorted Facilities: ", sorted);

    // Find the nearest facility within the 3000 zip code range
    const match = sorted.find((f) => Math.abs(f.facilityZip - zipCode) <= 3000);

    // Debug: log match result
    console.log("Match: ", match);

    // If no match found, return a message
    if (!match) {
      return NextResponse.json({
        match: null,
        reason: "No available facility nearby.",
      });
    }

    // Return the matched facility details
    return NextResponse.json({ match });
  } catch (error) {
    // Handle errors and send a 500 status
    console.error("Error: ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
