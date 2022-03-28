import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../db/models";
dotenv.config();

export const generateJWT = (user: User) => {
  const { password, ...rest } = user;
  const token = jwt.sign(rest, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
    algorithm: "HS256",
    audience: user.id,
    issuer: "foo.com",
  });
  return token;
};
