import { NextResponse } from "next/server";
import { parse } from "cookie";
import jwt from "jsonwebtoken";
import { verifyAccessToken } from "./app/lib/jwtUtils";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "";
// const MAX_AGE = 60 * 60 * 24 * 30; //30 days

export async function middleware(req: Request) {
  const authCookie = req.headers.get("cookie");
  const cookies = authCookie ? parse(authCookie) : {};
  const token = cookies["OutSiteJwt"];
  // console.log({ token: token });

  if (token === undefined || token === "") {
    return new Response(JSON.stringify({ message: "Access token required" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  // const user = await verifyAccessToken(token);

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
    // console.log({ user: payload });
    // (req as any).user = payload;
    return NextResponse.next();
  } catch (error) {
    // console.log("Invalid access token", error);
    return new Response(
      JSON.stringify({
        message: "Invalid access token",
      }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }
  // const user = jwt.verify(token, accessTokenSecret);

  // console.log({ user: user });
  // return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/user/cart",
    "/api/user/favourates",
    "/api/user/profile",
    "/api/user/logout",
  ],
};
