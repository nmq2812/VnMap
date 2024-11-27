const User = require("../models/userModel");
const Point = require("../models/pointModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");

const { Error } = require("mongoose");

const validateMongoDbId = require("../utils/validateMongodbid");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { generateRefreshToken } = require("../config/refreshtoken");

// POST
// Register Staff
const registerUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const { id } = req.params;
    console.log(req.body);
    const findUser = await User.findOne({ email });
    const findPoint = await Point.findOne({ _id: id });
    if (!findUser && findPoint) {
        // Create a new user
        const newUser = await User.create({
            ...req.body,
            postOfficeId: id,
        });
        res.json(newUser);
    } else {
        // User already exists
        throw new Error("User Already Exists");
    }
});

// Register Leader
const registerLeader = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const { id } = req.params;
    const findUser = await User.findOne({ email });
    const findPoint = await Point.findOne({ _id: id });
    if (!findUser && findPoint && req.user.role === "admin") {
        // Create a new user
        const newUser = await User.create({
            ...req.body,
            postOfficeId: id,
        });
        res.json(newUser);
    } else {
        // User already exists
        throw new Error("Leader Already Exists");
    }
});

// Login a User
const loginUserController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // check if user exists or not
    const findUser = await User.findOne({ email });
    if (
        findUser &&
        findUser.role !== "null" &&
        (await findUser.isPasswordMatched(password))
    ) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateUser = await User.findByIdAndUpdate(
            findUser?._id,
            {
                refreshToken,
            },
            { new: true },
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findUser?._id,
            userName: findUser?.userName,
            email: findUser?.email,
            phone: findUser?.phone,
            role: findUser?.role,
            address: findUser?.address,
            postOfficeId: findUser?.postOfficeId,
            token: generateToken(findUser?._id),
            createdAt: findUser?.createdAt,
        });
    } else {
        // Invalid Credentials
        throw new Error("Invalid Email or Password");
    }
});

// Login a Admin
const loginAdminController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findUser = await User.findOne({ email });
    if (findUser.role !== "admin") throw new Error("You are not an Admin");
    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateUser = await User.findByIdAndUpdate(
            findUser?._id,
            {
                refreshToken,
            },
            { new: true },
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findUser?._id,
            userName: findUser?.userName,
            email: findUser?.email,
            phone: findUser?.phone,
            role: findUser?.role,
            address: findUser?.address,
            token: generateToken(findUser?._id),
            createdAt: findUser?.createdAt,
        });
    } else {
        // Invalid Credentials
        throw new Error("Invalid Email or Password");
    }
});

// Login a gathering point leader
const loginGatheringPointLeaderController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findUser = await User.findOne({ email });
    if (findUser.role !== "gathering point leader")
        throw new Error("You are not an gathering point leader");
    if (
        findUser &&
        findUser.role !== "null" &&
        (await findUser.isPasswordMatched(password))
    ) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateUser = await User.findByIdAndUpdate(
            findUser?._id,
            {
                refreshToken,
            },
            { new: true },
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findUser?._id,
            userName: findUser?.userName,
            email: findUser?.email,
            phone: findUser?.phone,
            role: findUser?.role,
            address: findUser?.address,
            token: generateToken(findUser?._id),
            createdAt: findUser?.createdAt,
        });
    } else {
        // Invalid Credentials
        throw new Error("Invalid Email or Password");
    }
});

// Login a gathering point leader
const loginHeadOfTransactionPointController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findUser = await User.findOne({ email });
    if (findUser.role !== "head of transaction point")
        throw new Error("You are not an head of transaction point");
    if (
        findUser &&
        findUser.role !== "null" &&
        (await findUser.isPasswordMatched(password))
    ) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateUser = await User.findByIdAndUpdate(
            findUser?._id,
            {
                refreshToken,
            },
            { new: true },
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findUser?._id,
            userName: findUser?.userName,
            email: findUser?.email,
            phone: findUser?.phone,
            role: findUser?.role,
            address: findUser?.address,
            token: generateToken(findUser?._id),
            createdAt: findUser?.createdAt,
        });
    } else {
        // Invalid Credentials
        throw new Error("Invalid Email or Password");
    }
});

// GET

// Logout functionality
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    const refreshToken = cookie?.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204); //forbidden
    }
    await User.findOneAndUpdate(
        { refreshToken },
        {
            refreshToken: "",
        },
        { new: true },
    );
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    res.sendStatus(204); //forbidden
});

const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    console.log(req.body);
    validateMongoDbId(_id);
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatePassword = await user.save();
        res.json(updatePassword);
    } else {
        res.json(user);
    }
});

// Get All Users

const getAllUsers = asyncHandler(async (req, res, next) => {
    try {
        const getUsers = await User.find({
            role: "null",
            postOfficeId: req.user.postOfficeId,
        });
        res.json(getUsers);
    } catch (err) {
        throw new Error(err);
    }
});

const getAllUserInPoint = asyncHandler(async (req, res, next) => {
    try {
        const getUsers = await User.find({
            postOfficeId: req.user.postOfficeId,
        });
        res.json(getUsers);
    } catch (err) {
        throw new Error(err);
    }
});

const getAllLeader = asyncHandler(async (req, res, next) => {
    try {
        const getLeaders = await User.find({
            $or: [
                { role: "gathering point leader" },
                { role: "head of transaction point" },
            ],
        });
        res.json(getLeaders);
    } catch (err) {
        throw new Error(err);
    }
});

const getUser = asyncHandler(async (req, res, next) => {
    try {
        const id = req.params.id;
        validateMongoDbId(id);
        const getUser = await User.findById(id);
        res.json(getUser);
    } catch (err) {
        throw new Error(err);
    }
});

const getProfileUser = asyncHandler(async (req, res, next) => {
    try {
        const { _id } = req.user;
        validateMongoDbId(_id);
        const getUser = await User.findById(_id);
        res.json({
            firstName: getUser?.firstName,
            lastName: getUser?.lastName,
            email: getUser?.email,
            mobile: getUser?.mobile,
            address: getUser?.address,
        });
    } catch (err) {
        throw new Error(err);
    }
});

// DELETE

const deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    try {
        validateMongoDbId(id);
        const deleteUser = await User.findByIdAndDelete(id);
        res.json(deleteUser);
    } catch (err) {
        throw new Error(err);
    }
});

// UPDATE

const updateUser = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    console.log(req.body);
    validateMongoDbId(_id);
    try {
        const user = await User.findById(_id);
        user.userName = req.body.userName;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.address = req.body.address;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updateUser = await user.save();
        res.json({
            _id: updateUser?._id,
            userName: updateUser?.userName,
            email: updateUser?.email,
            phone: updateUser?.phone,
            role: updateUser?.role,
            postOfficeId: updateUser?.postOfficeId,
            address: updateUser?.address,
            createdAt: updateUser?.createdAt,
        });
    } catch (err) {
        throw new Error(err);
    }
});

const updateUserStatus = asyncHandler(async (req, res, next) => {
    console.log(123);
    const { _id } = req.user;
    const { id } = req.body;
    validateMongoDbId(_id);
    try {
        const user = await User.findById(id);
        if (req.user.role === "gathering point leader") {
            user.role = "assembly point staff";
        } else if (req.user.role === "head of transaction point") {
            user.role = "transaction point staff";
        } else if (req.user.role === "admin") {
            const { role } = req.body;
            user.role = role;
        }
        const updateUser = await user.save();
        res.json(updateUser);
    } catch (err) {
        throw new Error(err);
    }
});

module.exports = {
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
};
