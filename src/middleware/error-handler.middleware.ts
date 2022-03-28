import { Request, Response, NextFunction } from "express";
import { CustomError } from "../helpers/custom-error";

function handleError(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("CATCH error: ", err);
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    },
  });
}

export default handleError;
