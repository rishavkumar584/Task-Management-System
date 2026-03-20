import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const hashValue = async (value: string) => {
  return bcrypt.hash(value, SALT_ROUNDS);
};

export const compareValue = async (value: string, hashedValue: string) => {
  return bcrypt.compare(value, hashedValue);
};