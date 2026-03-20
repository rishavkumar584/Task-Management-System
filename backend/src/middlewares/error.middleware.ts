import { NextFunction, Request, Response } from "express";

export const notFoundHandler = (_req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

export const globalErrorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const message =
    error instanceof Error ? error.message : "Internal server error";

  return res.status(500).json({
    success: false,
    message,
  });
};