import type { Request, Response } from "express";
import {
  loginUser,
  logoutUser,
  refreshUserToken,
  registerUser,
} from "./auth.service.js";
import {
  loginSchema,
  refreshSchema,
  registerSchema,
} from "./auth.validation.js";

export const register = async (req: Request, res: Response) => {
  try {
    const parsedData = registerSchema.parse(req.body);
    const result = await registerUser(parsedData);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Registration failed";

    return res.status(message === "Email already registered" ? 409 : 400).json({
      success: false,
      message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsedData = loginSchema.parse(req.body);
    const result = await loginUser(parsedData);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";

    return res
      .status(message === "Invalid email or password" ? 401 : 400)
      .json({
        success: false,
        message,
      });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const parsedData = refreshSchema.parse(req.body);
    const result = await refreshUserToken(parsedData.refreshToken);

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Token refresh failed";

    return res.status(401).json({
      success: false,
      message,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const parsedData = refreshSchema.parse(req.body);
    const result = await logoutUser(parsedData.refreshToken);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Logout failed";

    return res.status(400).json({
      success: false,
      message,
    });
  }
};