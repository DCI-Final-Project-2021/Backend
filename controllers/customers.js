import Customer from "../models/Customer.js";
import User from "../models/User.js";

export default {
  readAll: async function (req, res, next) {
    try {
      const result = await Customer.readAll();
      res.json({ result });
    } catch (error) {
      next(error);
    }
  },
  create: async function (req, res, next) {
    try {
      const user = await User.findByEmail(req.body.email);
      if (user) {
        const userID = user[0]._id;
        const result = await Customer.create(userID);
        return res.json({result});
      } else {
        const newUser = await User.create(req.body);
        const result = await Customer.create(newUser._id);
        res.json({result});
      }
    } catch (error) {
      next(error);
    }
  },
  findByEmail: async function (req, res, next) {
    try {
      const result = await Customer.findByEmail(req.params.customerEmail);

      next(result);
    } catch (error) {
      next(error);
    }
  },
};
