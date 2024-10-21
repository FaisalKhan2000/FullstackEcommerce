import { eq } from "drizzle-orm";
import { CREATED, OK, UNAUTHORIZED } from "../constants/http.js";
import { db } from "../db/db.js";
import { usersTable } from "../db/user.schema.js";
import AppError from "../utils/AppError.js";
import catchErrors from "../utils/catchErrors.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { createJwt } from "../utils/token.js";

export const register = catchErrors(async (req, res, next) => {
  const data = req.cleanBody;

  const hashedPassword = await hashPassword(data.password, 10);

  const [user] = await db
    .insert(usersTable)
    .values({ ...data, password: hashedPassword })
    .returning();

  user.password = "";

  res.status(CREATED).json({
    success: true,
    message: "User Registered Successfully",
    user,
  });
});

export const login = catchErrors(async (req, res, next) => {
  const data = req.cleanBody;

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, data.email));

  if (!user) {
    return next(new AppError(UNAUTHORIZED, `Incorrect email or password`));
  }

  const validUser = await comparePassword(user.password, data.password);

  if (!validUser) {
    return next(new AppError(UNAUTHORIZED, `Incorrect email or password`));
  }

  const payload = { userId: user.id, role: user.role as string };

  // create jwt
  const token = createJwt(payload);

  user.password = "";

  res.status(OK).json({
    success: true,
    message: "User Login Successfully",
    token,
    user,
  });
});
