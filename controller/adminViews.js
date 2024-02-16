const productDetails = require("../model/products");
const banner = require("../model/banner");
const couponDetails = require("../model/coupon");
const categoryDetails = require("../model/category");
const users=require("../model/register")
module.exports = {
  dashboard: (req, res) => {
    res.status(200).render("admin/dashboard");
  },
  orders: (req, res) => {
    res.status(200).render("admin/orders");
  },
  products: async (req, res) => {
    try {
      const result = await productDetails.find();
      console.log(result);
      res.status(200).render("admin/products", { products: result });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Error fetching products");
    }
  },
  banner: async (req, res) => {
    try {
      const result = await banner.find();
      console.log(result);
      res.status(200).render("admin/bannar", { products: result });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Error fetching products");
    }
  },
  coupon: (req, res) => {
    res.status(200).render("admin/coupon");
  },
  users:async (req, res) => {
    const user=await users.find()
    res.status(200).render("admin/users",{data:user});
  },
  category: (req, res) => {
    res.status(200).render("admin/category");
  },
};
