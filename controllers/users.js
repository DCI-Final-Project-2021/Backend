import User from "../models/User.js";
import tokenHandler from "../lib/token.js";
import passwordHandler from "../lib/password.js";
import dotenv from "dotenv";
dotenv.config();

export default {
  readAll: async function (req, res, next) {
    try {
      const result = await User.readAll();
      res.json({ result });
    } catch (error) {
      next(error);
    }
  },
  readOne: async function (req, res, next) {
    try {
      const result = await User.readOne(req.params.userID);
      res.json({ result });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const user = await User.login(req.body);
      const token = tokenHandler.createToken(user);
      res.cookie("token", token, {
        maxAge: process.env.TOKEN_EXP * 1000,
        httpOnly: true,
        sameSite: "Strict",
      });
      // res.json({ user });
      res.json({token});
    } catch (error) {
      res.status(401).send();
      next(error);
    }
  },
  create: async function (req, res, next) {
    try {
      let user = await User.findByEmail(req.body.email);
      if (user) throw new Error("this user already exists");
      res.json({ user });
    } catch (error) {
      next(error);
    }
  },
  update: async function (req, res, next) {
    try {
      const id = req.params.userID;
      // const user = await User.readOne(id);
      // user found oder not found

      // const driver = await Driver.readByUserID(id);
      // console.log("Read By User ID", driver);
      const updatedUser = req.body;

      const result = await User.updateByID(id, updatedUser);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
  createAdmin: async function (req, res, next) {
    try {
      let user = await User.findByEmail(req.body.email);
      if (!user) {
        user = await User.create(req.body);
      }
      if (!user.password) throw new Error("user_has_not_password");

      var _user = user.toObject();
      const id = _user._id;

      const newBcrypt = passwordHandler.createHashedPassword(req.body.password);
      const updatedUser = { isAdmin: true, password: newBcrypt };

      const result = await User.updateByID(id, updatedUser);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
  register: async function (req, res, next) {
    try {
      let user = await User.findByEmail(req.body.email);
      if (!user) {
        user = await User.create(req.body);
      }

      user = user.toObject();
      const id = user._id;

      const newBcrypt = passwordHandler.createHashedPassword(req.body.password);
      const updatedUser = { password: newBcrypt };

      const result = await User.updateByID(id, updatedUser);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
};
