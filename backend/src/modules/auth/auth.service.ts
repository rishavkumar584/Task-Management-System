import { prisma } from "../../config/prisma.js";
import { hashValue, compareValue } from "../../utils/hash.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.js";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

export const registerUser = async ({ name, email, password }: RegisterInput) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const passwordHash = await hashValue(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
  });

  const refreshToken = generateRefreshToken({
    userId: user.id,
    email: user.email,
  });

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};

export const loginUser = async ({ email, password }: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await compareValue(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
  });

  const refreshToken = generateRefreshToken({
    userId: user.id,
    email: user.email,
  });

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};

export const refreshUserToken = async (refreshToken: string) => {
  const storedToken = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
  });

  if (!storedToken || storedToken.isRevoked || storedToken.expiresAt < new Date()) {
    throw new Error("Invalid or expired refresh token");
  }

  const decoded = verifyRefreshToken(refreshToken);

  const accessToken = generateAccessToken({
    userId: decoded.userId,
    email: decoded.email,
  });

  return { accessToken };
};

export const logoutUser = async (refreshToken: string) => {
  const storedToken = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
  });

  if (storedToken) {
    await prisma.refreshToken.update({
      where: { token: refreshToken },
      data: { isRevoked: true },
    });
  }

  return { message: "Logged out successfully" };
};