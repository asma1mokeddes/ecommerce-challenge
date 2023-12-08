import express from "express";
import {
    getOrders,
    createOrder,
    getOrder,
    getOrdersUser,
    updateOrder,
    deleteOrder,
} from "../routes/ordersRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { adminOrStoreKeeperMiddleware } from "../middlewares/userManagementMiddleware.js";

const router = express.Router();

router.get("/", 
authMiddleware,
//  adminOrStoreKeeperMiddleware,
  getOrders);
router.get("/:orderId", 
authMiddleware,
 getOrder);
router.get("/user/:userId",
 authMiddleware,
  getOrdersUser);
router.post("/",
 authMiddleware,
  createOrder);
router.put("/:orderId", 
authMiddleware, 
// adminOrStoreKeeperMiddleware, 
updateOrder);
router.delete("/:orderId",
 authMiddleware,
//   adminOrStoreKeeperMiddleware,
   deleteOrder);

export default router;
