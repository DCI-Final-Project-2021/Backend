import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const SALT_ROUNDS = 12;

const createHashedPassword = (password) => {
  return bcrypt.hashSync(
    password + process.env.SALT + process.env.PEPPER,
    SALT_ROUNDS
  );
};

export default {
  createHashedPassword,
};
