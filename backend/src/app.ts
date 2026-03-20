import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes.js";
import taskRoutes from "./modules/task/task.routes.js";
import { globalErrorHandler,notFoundHandler,} from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;