import mongoose from "mongoose";
import User from "./User.js";
import Order from "./Order.js";

const Schema = mongoose.Schema;

// const OrdersItemSchema = Schema({
//   orderID: {
//     type: Schema.Types.ObjectId,
//     ref: "Order",
//   },
// });

const CustomerSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  //   orders: [OrdersItemSchema],
  orders: {
    type: Array,
    required: true,
  },
});

const Customer = mongoose.model("Customer", CustomerSchema);

export default {
  Customer,
  readAll: async function () {
    return await Driver.find().populate("user");
  },
  create: async function (userID) {
    const customer = new Customer({
      user: userID,
      orders: [],
    });
    return await customer.save();
  },
  findByEmail: async function (email) {
    return await Customer.find({ email: email }).populate("user");
  },
};
