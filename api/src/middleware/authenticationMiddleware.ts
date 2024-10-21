import { NextFunction, Request, Response } from "express";
import { FORBIDDEN, UNAUTHORIZED } from "../constants/http.js";
import AppError from "../utils/AppError.js";
import { verifyJwt } from "../utils/token.js";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");

  if (!token) {
    return next(new AppError(UNAUTHORIZED, "Access denied"));
  }

  try {
    // decode jwt token
    const decoded = verifyJwt(token);

    if (typeof decoded !== "object" || !decoded?.userId) {
      return next(new AppError(UNAUTHORIZED, "Access denied"));
    }
    // console.log(decoded);
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    return next(error);
  }
};

export const verifyRole = (allowedRoles: Array<string>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.role;

    try {
      if (!userRole || !allowedRoles.includes(userRole)) {
        return next(
          new AppError(
            FORBIDDEN,
            "You do not have permission to access this resource"
          )
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
