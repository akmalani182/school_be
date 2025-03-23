const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const getTokens = async (data: { userId: string, role: string }): Promise<{}> => {
  const accessToken = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  const refreshToken = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME,
  });
  return { accessToken, refreshToken };
};

export const verifyToken = async (token: string): Promise<{}> => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};


export const generateSubdomain = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, "-");
};