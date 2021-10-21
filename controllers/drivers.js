import Driver from "../models/Driver.js";
import User from "../models/User.js";

export default {
  readAll: async function (req, res, next) {
    try {
      const result = await Driver.readAll();
      res.json({ result });
    } catch (error) {
      next(error);
    }
  },
  readOne: async function (req, res, next) {
    try {
      const result = await Driver.readOne(req.params.driverID);
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
        const driver = await Driver.findByUserID(userID);

        if (driver.length > 0) return res.json({ driver });
      } 
      else {
        const user = await User.create(req.body);
        const userID = user._id;
        console.log("burasi img", req.body.img);
        const result = await Driver.create(userID, req.body.img);
        return res.json({ result });
      }
    } catch (error) {
      next(error);
    }
  },
  update: async function (req, res, next) {
    try {
      const id = req.params.driverID;
      const updatedDriver = req.body;
      const result = await Driver.updateByID(id, updatedDriver);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  delete: async function (req, res, next) {
    try {
      const result = await Driver.deleteByID(req.params.orderID);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
};
