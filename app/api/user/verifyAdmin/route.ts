import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const headers = req.headers.get("x-user");

    if (!headers) {
      console.log("No user found");
    } else {
      console.log({ userInHeader: headers });
    }

    return NextResponse.json(headers);
  } catch (error) {
    return NextResponse.json("error from server on /verifyAdmin");
  }
}
