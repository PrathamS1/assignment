import { NextResponse } from "next/server";
import path from "path";
import { getConnection } from "@/db/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const image = formData.get("image") as File;

    if (!name || !email || !image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save image to disk
    const buffer = Buffer.from(await image.arrayBuffer());
    const imageDir = path.join(process.cwd(), "public", "schoolImages");
    const imagePath = path.join(imageDir, image.name);
    const fs = await import("fs/promises");
    await fs.mkdir(imageDir, { recursive: true });
    await fs.writeFile(imagePath, buffer);

    // Save school data to database
    try {
      const connect = await getConnection();
      const addQuery = `
      INSERT INTO school (name, email_id, address, city, state, contact, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
      await connect.execute(addQuery, [
        name.toString(),
        email.toString(),
        address?.toString() || "",
        city?.toString() || "",
        state?.toString() || "",
        contact || "",
        "/schoolImages/" + image.name,
      ]);
      return NextResponse.json(
        { message: "School added successfully" },
        { status: 200 }
      );
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json({ error: "Failed to add school" }, { status: 500 });
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}
