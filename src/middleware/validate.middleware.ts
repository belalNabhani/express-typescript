import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { IUserRequest } from "../types";

const validate =
  (schema: AnyZodObject) =>
  async (req: IUserRequest, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        user: req.user,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };

export default validate;
