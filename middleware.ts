import { NextResponse } from "next/server";
import { parse } from "cookie";
import jwt from "jsonwebtoken";
import { verifyAccessToken } from "./app/lib/jwtUtils";

// const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";
// const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "";
// const MAX_AGE = 60 * 60 * 24 * 30; //30 days

export async function middleware(req: Request) {
  const authCookie = req.headers.get("cookie");
  const cookies = authCookie ? parse(authCookie) : {};
  const token = cookies["OutSiteJwt"];

  if (token === undefined || token === "") {
    return new Response(JSON.stringify({ message: "Access token required" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (token === undefined || token === "") {
    console.log("No user found");
    return new Response(
      JSON.stringify({
        message: "Invalid access token",
      }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    return NextResponse.next();
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Invalid access token",
      }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }
}

export const config = {
  matcher: [
    "/api/user/cart",
    "/api/user/favourates",
    "/api/user/profile",
    "/api/user/logout",
    "/api/user/cart/addToCart",
    "/api/user/info",
  ],
};
