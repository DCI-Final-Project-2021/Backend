import mongoose from "mongoose";
import Order from "./Order.js";
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
dotenv.config();

const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    tel: {
      type: String, // Girilen bilginin telefon numarasi olup olmadigi kontrol edilecek.
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
    },
    // tip: {
    //   type: String,
    // },
  },
  { versionKey: false }
);

const User = mongoose.model("User", UserSchema);

export default {
  User,
  readAll: async function () {
    return await User.find();
  },
  readOne: async function (id) {
    return await User.findById(id);
  },
  login: async function ({ email, password }) {
    let user = await this.findByEmail(email);
    if (!user) throw new Error("user_not_found");

    user = user.toObject();
    if (!user.isAdmin) throw new Error("user_not_admin");
    // Mutfakci da daha sonra login olacak ????

    const isPasswordCorrect = await bcrypt.compare(password.toString() + process.env.SALT + process.env.PEPPER, user.password);
    if (!isPasswordCorrect) throw new Error("password_incorrect");

    return { userId: user._id, name: user.name };
  },
  findByEmail: async function (email) {
    let user = await User.find({email: email});
    if (user.length < 1) null;
    return user[0];
  },
  create: async function ({name, surname, email, password, tel, address, city, isAdmin}) {
    const user = new User({
      name,
      surname,
      email,
      password,
      tel,
      address,
      city,
      isAdmin,
    });
    return await user.save();
  },
  updateByID: async function (id, userObject) {
    return await User.findByIdAndUpdate(id, userObject, {
      new: true,
      runValidators: true,
    });
  },

  deleteByID: async function (id) {
    return await User.deleteOne({ _id: id });
  },
};
