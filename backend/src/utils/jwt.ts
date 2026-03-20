import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";

type JwtPayload = {
  userId: string;
  email: string;
};

export const generateAccessToken = (payload: JwtPayload) => {
  return jwt.sign(payload, env.jwtAccessSecret, {
    expiresIn: env.accessTokenExpiresIn,
  } as SignOptions);
};

export const generateRefreshToken = (payload: JwtPayload) => {
  return jwt.sign(payload, env.jwtRefreshSecret, {
    expiresIn: env.refreshTokenExpiresIn,
  } as SignOptions);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.jwtAccessSecret) as JwtPayload;
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.jwtRefreshSecret) as JwtPayload;
};