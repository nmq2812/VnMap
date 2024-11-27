const mongoose = require("mongoose"); // Erase if already required

var orderSchema = new mongoose.Schema(
  {
    createBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    originalLocation: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    senderNumber: {
      type: String,
      required: true,
    },
    senderProvince: {
      type: String,
      required: true,
    },
    senderAddress: {
      type: String,
      required: true,
    },
    recipientName: {
      type: String,
      required: true,
    },
    recipientNumber: {
      type: String,
      required: true,
    },
    recipientProvince: {
      type: String,
      required: true,
    },
    recipientAddress: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      default: "Hàng hóa",
      enum: ["Hàng hóa", "Tài liệu"],
    },
    productPrice: {
      type: String,
      required: true,
    },
    productWeight: {
      type: String,
      required: true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
    productSizeLength: {
      type: Number,
    },
    productSizeWidth: {
      type: Number,
    },
    productSizeHeight: {
      type: Number,
    },
    shippingFee: {
      type: String,
      required: true,
    },
    productTotal: {
      type: Number,
      required: true,
    },
    productNote: {
      type: String,
    },
    orderLocation: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      default: "Chờ lấy hàng",
      enum: [
        "Chờ lấy hàng",
        "Đã lấy hàng",
        "Đang vận chuyển",
        "Chờ phát",
        "Phát thành công",
        "Phát không thành công",
        "Chờ chuyển hoàn",
        "Chuyển hoàn",
        "Phát hoàn thành công",
        "Chuyển tiếp",
        "Vô thừa nhận",
        "Đơn hàng hủy",
        "Bồi thường",
      ],
    },
    serviceTrans: {
      type: String,
      default: "Chuyển phát nhanh",
    },
    serviceExtra: {
      type: String,
      enum: [
        "Giao hàng thu tiền",
        "Thu thập hồ sơ và báo phát hình ảnh",
        "Thu hộ phí ship hàng",
        "Thu hộ phí hủy đơn hàng",
      ],
    },
    serviceLetCusSee: {
      type: Boolean,
      default: false,
    },
    serviceFragile: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
