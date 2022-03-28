import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import createError from "http-errors";
import errorHandler from "./middleware/error-handler.middleware";
import userRoutes from "./routes/users.routes";
import authRoutes from "./routes/auth.routes";
import postsRoutes from "./routes/posts.routes";

dotenv.config();

const app = express();

// Config
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.enable("trust proxy");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postsRoutes);

app.use((_, __, next) => {
  next(new createError.NotFound());
});

app.use(errorHandler);

app.listen(process.env.PORT).on("listening", () => {
  console.log(`Server is live on ${process.env.PORT}`);
  console.log(`http://localhost:${process.env.PORT}`);
});
