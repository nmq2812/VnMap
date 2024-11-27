const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrder,
  getAllOrder,
  getAllOrderInPoint,
  getAllOrderInPointAdmin,
  getAllOrderCreatePoint,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");
const {
  authMiddleware,
  isPointLeader,
  isAdmin,
} = require("../middlewares/authMiddleware");

router.post("/create-order", authMiddleware, createOrder);
router.get("/all-order-in-point", authMiddleware, getAllOrderInPoint);
router.get(
  "/all-order-create-point",
  authMiddleware,
  isPointLeader,
  getAllOrderCreatePoint
);
router.get(
  "/all-order-in-point-admin/:id",
  authMiddleware,
  isAdmin,
  getAllOrderInPointAdmin
);
router.get("/:id", getOrder);
router.get("/", authMiddleware, isAdmin, getAllOrder);

// update
router.put("/:id", authMiddleware, updateOrder);

router.delete("/delete-order/:id", authMiddleware, deleteOrder);

module.exports = router;
