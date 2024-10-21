import express from "express";
import { register, login } from "../controllers/auth.controller";
import { validateData } from "../middleware/validationMiddleware";
import { createUserSchema, loginUserSchema } from "../db/user.schema";
const router = express.Router();

router.route("/register").post(validateData(createUserSchema), register);
router.route("/login").post(validateData(loginUserSchema), login);

export default router;
