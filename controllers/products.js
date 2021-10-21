import Product from "../models/Product.js";

export default {
    readAll: async function (req, res, next) {
        try {
            const result = await Product.readAll();
            res.json({ result });
        } catch (error) {
            next(error);
        }
    },

    readOne: async function (req, res, next) {
        try {
            const result = await Product.readOne(req.params.productID);
            res.json({ result });
        } catch (error) {
            next(error);
        }
    },

    create: async function (req, res, next) {
        try {
            const result = await Product.create(req.body.name, req.body.description, req.body.category, req.body.price);
            res.json({ result });
        } catch (error) {
            next(error);
        }
    },

    update: async function (req, res, next) {
        try {
            const id = req.params.productID;
            const updatedProduct = req.body;
            const result = await Product.updateByID(id, updatedProduct);
            res.json(result);
        } catch (error) {
            next(error);
        }
    },

    delete: async function (req, res, next) {
        try {
            const result = await Product.deleteByID(req.params.productID);
            res.json(result);
        } catch (error) {
            next(error);
        }
    },




};