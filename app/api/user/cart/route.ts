import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/mongodb";

export async function GET(req: NextRequest) {
  try {
    dbConnect();
    try {
      return NextResponse.json({});
    } catch (error) {
      return NextResponse.json({ error: error });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Error connecting to db",
      error: error,
    });
  }
}
