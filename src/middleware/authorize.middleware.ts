import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { db } from "../db";
import { User } from "../db/models";
import { IUserRequest } from "../types";

dotenv.config();

const authorize = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      throw new createHttpError.Unauthorized();
    }
    const [type, token] = authorization.split(" ");
    if (type !== "Bearer" || !token || token === "undefined") {
      throw new createHttpError.NotAcceptable();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as User;
    const user = await db.users.findById(decoded.id);
    if (!user) {
      throw new createHttpError.BadRequest("User not found");
    }
    if (!user.active) {
      throw new createHttpError.BadRequest("User is inactive");
    }
    req.user = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };
    next();
  } catch (error) {
    next(error);
  }
};

export default authorize;
