import jwt, { sign } from "jsonwebtoken";
import { NextRequest } from "next/server";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "";
const MAX_AGE = 60 * 60 * 24 * 30; //30 days

export const generageAccessToken = async (username: string, email: string) => {
  return jwt.sign({ username: username, email: email }, accessTokenSecret, {
    expiresIn: 60 * 10,
  });
};

export const generageRefreshToken = async (username: string, email: string) => {
  return jwt.sign({ username: username, email: email }, refreshTokenSecret, {
    expiresIn: MAX_AGE,
  });
};

export async function verifyAccessToken(token: string) {
  try {
    return await jwt.verify(token, accessTokenSecret);
  } catch (error) {
    return null;
  }
}
