const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  review: [
    {
      UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "registeredData",
      },
      comment: { type: String },
      title:{
        type:String
      }
    },
  ],
});

module.exports = mongoose.model("Review", reviewSchema);
