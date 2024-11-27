const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
// vd: pointName: điểm giao dịch
// vd: pointAddress: vị trí cụ thể
// vd: pointProvince: Hà Nội
var pointSchema = new mongoose.Schema(
  {
    pointName: {
      type: String,
      required: true,
    },
    pointAddress: {
      type: String,
      required: true,
      unique: true,
    },
    pointProvince: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Point", pointSchema);
