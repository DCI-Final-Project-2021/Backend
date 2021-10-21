import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
}, { versionKey: false });

const Product = mongoose.model("Product", ProductSchema);


export default {
    readAll: async function () {
        return await Product.find();
    },

    readOne: async function (id) {
        return await Product.findById(id);
    },

    create: async function (name, description, category, price) {
        const product = new Product({
            name,
            description,
            category,
            price,
        });
        return await product.save();
    },

    updateByID: async function (id, productObject) {
        return await Product.findByIdAndUpdate(
            id,
            productObject,
            { new: true, runValidators: true }
        );
    },

    deleteByID: async function (id) {
        return await Product.deleteOne({ _id: id });
    }
}
