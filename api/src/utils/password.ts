import bcrypt from "bcryptjs";

export const hashPassword = async (
  password: string,
  salt: number
): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  hashedPassword: string,
  password: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
