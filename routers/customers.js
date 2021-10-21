import express from "express";
import customersController from "../controllers/customers.js";

const router = express.Router();

router.post("/", customersController.create); // Burada user var mi diye bakilacak sonra userID ile yeni Customer olusturulacak.

router.get("/", customersController.readAll);

router.get("/:customerEmail", customersController.findByEmail);
// router.get("/:customerID", customersController.readOne);
// router.put("/:customerID/:orderID", customersController.addOrderToDriver);

// router.put("/:customerID", customersController.update);
// router.delete("/:customerID", customersController.delete);

export default router;