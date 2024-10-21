import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import { createProductSchema } from "../db/products.schema";
import { z } from "zod";

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      // const data = _.pick(req.body, ["name", "price", "description"]);
      req.cleanBody = _.pick(req.body, Object.keys(schema.shape));
      next();
    } catch (error) {
      next(error);
    }
  };
}
