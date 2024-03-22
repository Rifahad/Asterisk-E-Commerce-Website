const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
    },
    products: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        quantity: { type: Number },
      },
    ],
    totalPrice: Number,
    address: String,
    paymentMethod: String,
    Status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);
