import { db } from "../db/db";
import { CREATED, NOT_FOUND, OK, UNAUTHORIZED } from "../constants/http";
import catchErrors from "../utils/catchErrors";
import { usersTable } from "../db/user.schema";
import { comparePassword, hashPassword } from "../utils/password";
import { eq } from "drizzle-orm";
import AppError from "../utils/AppError";
import { createJwt } from "../utils/token";

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
