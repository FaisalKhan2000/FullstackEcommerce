import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { createUserSchema, loginUserSchema } from "../db/user.schema.js";
import { validateData } from "../middleware/validationMiddleware.js";
const router = express.Router();

router.route("/register").post(validateData(createUserSchema), register);
router.route("/login").post(validateData(loginUserSchema), login);

export default router;
