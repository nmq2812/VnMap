const Point = require("../models/pointModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbid");

const createPoint = asyncHandler(async (req, res) => {
    try {
        const newPoint = await Point.create(req.body);
        res.json(newPoint);
    } catch (error) {
        throw new Error(error);
    }
});

const getPoint = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getPoint = await Point.findById(id);
        res.json(getPoint);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllPointInCity = asyncHandler(async (req, res) => {
    const { pv } = req.params;
    const city = pv;
    try {
        const getAllPoint = await Point.find({
            pointProvince: city,
        });
        res.json(getAllPoint);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllPoint = asyncHandler(async (req, res) => {
    console.log(req.body);

    try {
        const getAllPoint = await Point.find();
        res.json(getAllPoint);
    } catch (error) {
        throw new Error(error);
    }
});

const deletePoint = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletePoint = await Point.findByIdAndDelete(id);
        res.json(deletePoint);
    } catch (err) {
        throw new Error(err);
    }
});

module.exports = {
    createPoint,
    getPoint,
    getAllPoint,
    getAllPointInCity,
    deletePoint,
};
