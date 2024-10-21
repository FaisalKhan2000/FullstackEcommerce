import jwt from "jsonwebtoken";

type payloadType = {
  userId: number;
  role: string;
};

export const createJwt = (payload: payloadType): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN!,
  });

  return token;
};

export const verifyJwt = (token: string): payloadType => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);

  return decoded as payloadType;
};
