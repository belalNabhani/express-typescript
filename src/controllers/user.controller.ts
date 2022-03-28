import { Response, NextFunction, Request } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { db } from "../db";
import { User } from "../db/models";
import { LoginParamsType } from "../types";
import { generateJWT } from "../helpers/generateJWT";
import { IUserRequest } from "../types";

export const init = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  await db.users.init();
  return res.sendStatus(200);
};
export const findAll = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const users: User[] = await db.users.all();
    if (!users) {
      throw new createHttpError.BadRequest("table not found");
    }
    return res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};
export const findByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password }: LoginParamsType = req.body;
    if (!email || !password) {
      throw new createHttpError.BadRequest("No params");
    }
    const user: User | null = await db.users.findByEmail(email);
    if (!user) {
      throw new createHttpError.BadRequest("User not found!");
    }
    const passwordMatch = await bcrypt.compare(password, user.password!);
    if (!passwordMatch) {
      throw new createHttpError.Unauthorized(
        "Email or password is not correct"
      );
    }
    const jwt = generateJWT(user);
    return res.status(200).send({ accessToken: jwt });
  } catch (error) {
    next(error);
  }
};
export const findById = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;

    const user: User | null = await db.users.findById(userId);
    if (!user) {
      throw new createHttpError.BadRequest("User not found!");
    }
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
export const findByName = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userName = req.params.name;

    const user: User | null = await db.users.findByName(userName);
    if (!user) {
      throw new createHttpError.BadRequest("User not found!");
    }
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
