const express = require("express");
const router = express.Router();

const {
  createPoint,
  getPoint,
  getAllPoint,
  getAllPointInCity,
  deletePoint,
} = require("../controller/pointController");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/create-point", createPoint);

router.get("/city", getAllPointInCity);
router.get("/:id", getPoint);
router.get("/", getAllPoint);
router.delete("/delete-point/:id", authMiddleware, isAdmin, deletePoint);

module.exports = router;
