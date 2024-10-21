import { CREATED, OK } from "../constants/http";
import catchErrors from "../utils/catchErrors";

export const register = catchErrors(async (req, res, next) => {
  res.status(CREATED).json({
    success: true,
    message: "User Registered Successfully",
  });
});

export const login = catchErrors(async (req, res, next) => {
  res.status(OK).json({
    success: true,
    message: "User Login Successfully",
  });
});
