import mongoose from "mongoose";
import User from "./User.js";
import Order from "./Order.js";

const Schema = mongoose.Schema;

const DeliveriesItemSchema = Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
});

const DriverSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  deliveries: [DeliveriesItemSchema],
  status: {
    type: String,
    required: true,
  },
  isWorking: {
    type: Boolean,
    required: true,
  },
  img: {
    type: String,
    required: true
  }
});

const Driver = mongoose.model("Driver", DriverSchema);

export default {
  Driver,
  readAll: async function () {
    return await Driver.find()
      .populate("user")
      .populate({ path: "deliveries._id", populate: { path: "customerId" } })
      .populate({ path: "deliveries._id", populate: { path: "customerId", populate: { path: "user" } } });
  },

  readOne: async function (id) {
    return await Driver.findById(id).populate("user");
  },

  readByUserID: async function (id) {
    return await Driver.find({ userId: id });
  },

  create: async function (userID, imgUrl) {
    const driver = new Driver({
      user: userID,
      deliveries: [],
      status: "free",
      isWorking: false,
      img: imgUrl,
    });
    return await driver.save();
  },

  findByEmail: async function (email) {
    return await Driver.find({ email: email }).populate("user");
  },

  findByUserID: async function (id) {
    return await Driver.find({ user: id }).populate("user");
  },

  updateByID: async function (id, orderObject) {
    return await Driver.findByIdAndUpdate(id, orderObject, {
      new: true,
      runValidators: true,
    });
  },

  deleteByID: async function (id) {
    return await Driver.deleteOne({ _id: id });
  },
  // addOrderToDriver: async function (id, orderID) {
  //   const driver = await Driver.findById(id);
  //   if (!driver) throw new Error("driver not found");

  //   driver.deliveries.push(orderID);
  //   return await driver.save();
  // },
};
