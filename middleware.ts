import { NextResponse } from "next/server";
import { parse } from "cookie";
import { jwtVerify } from "jose";
// import { headers } from "next/headers";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "";
const MAX_AGE = 60 * 60 * 24 * 30; //30 days

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

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(accessTokenSecret)
    );

    if (!payload) {
      // console.log("No user found");
      return new Response(
        JSON.stringify({
          message: "Invalid access token",
        }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    const newHeaders = new Headers(req.headers);
    newHeaders.set("x-user", JSON.stringify(payload));
    return NextResponse.next({ request: { headers: newHeaders } });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

export const config = {
  matcher: [
    "/api/user/cart",
    "/api/user/favourates",
    "/api/user/profile",
    "/api/user/logout",
    "/api/user/cart/addToCart",
    "/api/user/cart/removeFromCart",
    "/api/user/liked/addToLiked",
    "/api/user/liked/removeFromLiked",
    "/api/user/info",
    "/api/postProduct",
    "/api/user/verifyAdmin",
    "/api/user/update",
    "/api/user/profile",
  ],
};
