import { getConnection } from "@/db/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const connect = await getConnection();
    const getQuery = "Select id, name, address, city, image from school";
    const [fetchedRows] = await connect.execute(getQuery);
    if (
      !fetchedRows ||
      (Array.isArray(fetchedRows) && fetchedRows.length === 0)
    ) {
      return NextResponse.json(
        { message: "No schools found" },
        { status: 404 }
      );
    }
    return NextResponse.json([fetchedRows], { status: 200 });
  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json(
      { message: "Failed to retrieve schools data" },
      { status: 500 }
    );
  }
}
