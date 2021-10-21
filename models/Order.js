import mongoose from "mongoose";
import Driver from "./Driver.js";
import Customer from "./Customer.js";
import date from "../lib/date.js";

const Schema = mongoose.Schema;

const OrderSchema = Schema({
	foods: {
		type: Array,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	customerId: {
		type: Schema.Types.ObjectId,
		ref: "Customer",
	},
	total: {
		type: String,
		required: true,
	},
	driver: {
		type: Schema.Types.ObjectId,
		ref: "Driver",
	},
	isDelivered: {
		type: Boolean,
		required: true,
	}
}, { versionKey: false });

const Order = mongoose.model("Order", OrderSchema);

export default {
	Order,
	readAll: async function () {
		return await Order.find().populate({ path: "customerId", populate: { path: "user" } }).populate({ path: "driver", populate: { path: "user" } });
	},

	readOne: async function (id) {
		return await Order.findById(id);
	},

	create: async function (foods, customerId, total) {
		const order = new Order({
			foods,
			date: date.getDate(),
			customerId,
			total,
			driver: null,
			isDelivered: false,
		});
		return await order.save();
	},

	updateByID: async function (id, orderObject) {
		return await Order.findByIdAndUpdate(
			id,
			orderObject,
			{ new: true, runValidators: true }
		);
	},

	deleteByID: async function (id) {
		return await Order.deleteOne({ _id: id });
	},

	addDriverToOrder: async function (id, driverID) {
		const order = await Order.findById(id);
		if (!order) throw new Error("order not found");

		const driver = await Driver.readOne(driverID);
		if (!driver) throw new Error("driver not found");

		if (order.driver == null) {
			order.driver = driverID;
		} else {
			const preDriver = await Driver.readOne(order.driver);
			const indexOfOrder = preDriver.deliveries.findIndex(obj => obj._id == id);
			preDriver.deliveries.splice(indexOfOrder, 1);
			order.driver = driverID;
			await preDriver.save();
		};

		setTimeout(() => {
			order.isDelivered= true
			console.log("order was delivered");
			return order.save()
		}, 10000);

		driver.deliveries.push(id);

		return await order.save() && await driver.save();
	}
}
