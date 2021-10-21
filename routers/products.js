import express from "express";
import productsController from "../controllers/products.js"


const router = express.Router();

router.get("/", productsController.readAll);
router.get("/:productID", productsController.readOne);
router.post("/", productsController.create);


router.put("/:productID", productsController.update);
router.delete("/:productID", productsController.delete);

export default router;