import dbConnect from "@/utils/db";
import Facility from "@/models/Facility";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { name, careType, zipCode } = await req.json();

    // If careType is "day care", skip and return
    if (careType.toLowerCase() === "day care") {
      return NextResponse.json({
        match: null,
        reason: "Day care is not supported.",
      });
    }

    // Get all AVAILABLE facilities that support the care type
    const facilities = await Facility.find({
      capacity: "Available",
      typeOfCare: { $in: [careType] },
    });

    // Filter facilities whose zip range contains the user's zip
    const inRange = facilities.filter(
      (f) => f.zipRange?.from <= zipCode && f.zipRange?.to >= zipCode
    );

    // If any facilities are in-range, return the nearest one
    if (inRange.length > 0) {
      const nearestInRange = inRange.sort(
        (a, b) =>
          Math.abs(a.facilityZip - zipCode) - Math.abs(b.facilityZip - zipCode)
      )[0];

      return NextResponse.json({ match: nearestInRange });
    }

    // Otherwise, check for closest available one within 3000 zip codes
    const nearby = facilities
      .map((f) => ({
        facility: f,
        distance: Math.abs(f.facilityZip - zipCode),
      }))
      .filter((f) => f.distance <= 3000)
      .sort((a, b) => a.distance - b.distance);

    if (nearby.length > 0) {
      return NextResponse.json({ match: nearby[0].facility });
    }

    // If no match found at all
    return NextResponse.json({
      match: null,
      reason: "No available facility nearby.",
    });
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
