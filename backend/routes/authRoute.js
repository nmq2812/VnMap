const express = require("express");
const router = express.Router();

const {
    registerUser,
    registerLeader,
    loginUserController,
    loginAdminController,
    loginGatheringPointLeaderController,
    loginHeadOfTransactionPointController,
    logout,
    updateUser,
    updateUserStatus,
    updatePassword,
    getAllUsers,
    getAllUserInPoint,
    getAllLeader,
    deleteUser,
} = require("../controller/userController");
const {
    authMiddleware,
    isPointLeader,
    isAdmin,
} = require("../middlewares/authMiddleware");

router.post("/register/:id", registerUser);
router.post("/register-leader/:id", authMiddleware, isAdmin, registerLeader);
router.post("/login", loginUserController);
router.post("/admin", loginAdminController);
router.post("/gathering-point-leader", loginGatheringPointLeaderController);
router.post(
    "/head-of-transaction-point",
    loginHeadOfTransactionPointController,
);
router.post("/edit-state", authMiddleware, isPointLeader, updateUserStatus);

router.get("/logout", logout);
router.get("/all-users", authMiddleware, getAllUsers);
router.get(
    "/all-users-in-point",
    authMiddleware,
    isPointLeader,
    getAllUserInPoint,
);
router.get("/all-leader", authMiddleware, isAdmin, getAllLeader);

router.put("/edit-user", authMiddleware, updateUser);
router.put("/password", authMiddleware, updatePassword);

router.delete("/delete-user/:id", authMiddleware, isPointLeader, deleteUser);
router.delete("/delete-leader/:id", authMiddleware, isAdmin, deleteUser);

module.exports = router;
