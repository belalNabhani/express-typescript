import { Request } from "express";
import { User } from "../db/models";

export interface LoginParamsType {
  email: string;
  password: string;
}
export interface createPostParamsType {
  title: string;
  description: string;
  published: boolean;
}

export interface IUserRequest extends Request {
  user?: User;
}
