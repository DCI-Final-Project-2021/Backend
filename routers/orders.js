import express from "express";
import ordersController from "../controllers/orders.js";
// import validateOrder from "../middlewares/validateOrder.js";

const router = express.Router();

router.post("/", ordersController.create); // Buraya kullanici kontrol edilecek varsa idsi yoksa yeni kullanici olusturulacak ki orders create edilebilsin.
// router.post("/", validateOrder, ordersController.create);

// Login yazildiktan sonra kontrol icin middleware yazilacak.  
router.get("/", ordersController.readAll);

router.get("/:orderID", ordersController.readOne);
router.put("/:orderID/:driverID", ordersController.addDriverToOrder);

router.put("/:orderID", ordersController.update);
router.delete("/:orderID", ordersController.delete);

export default router;