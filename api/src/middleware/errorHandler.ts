import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod";
import AppError from "../utils/AppError";

const handleZodError = (res: Response, error: z.ZodError) => {
  // const errors = error.issues.map((err) => ({
  //   path: err.path.join("."),
  //   message: err.message,
  // }));

  const errors = error.issues.map((issue: any) => ({
    message: `${issue.path.join(".")} is ${issue.message}`,
  }));

  return res.status(BAD_REQUEST).json({
    // error: error,
    // message: error.message,
    errors,
  });
};

const handleAppError = (res: Response, error: AppError) => {
  return res.status(error.statusCode).json({
    message: error.message,
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH: ${req.path}`, error);

  // zod error
  if (error instanceof z.ZodError) {
    handleZodError(res, error);
  }

  // App Error
  if (error instanceof AppError) {
    handleAppError(res, error);
  } else {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

export default errorHandler;
