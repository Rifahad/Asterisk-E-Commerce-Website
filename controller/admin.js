const productDetails = require("../model/products");
const banner = require("../model/banner");
const couponDetails = require("../model/coupon");
const categoryDetails = require("../model/category");

module.exports = {
  addProduct: (req, res) => {
    res.status(200).render("admin/addProducts");
  },
  addProductPost: async (req, res) => {
    const productimg = req.file ? req.file.filename : "no image";
    try {
      await productDetails.create({ ...req.body, productImage: productimg });
      res.redirect("/add-product");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding product");
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const id = req.params.productId;
      const product = await productDetails.findById(id);
      await productDetails.findByIdAndDelete(id);
      res.redirect("/products");
    } catch (error) {
      res.status(500).send("Error deleting product");
    }
  },
  addBanner: (req, res) => {
    res.status(200).render("admin/addBanner");
  },
  addBannerPost: async (req, res) => {
    console.log(req.body);
    const productimg = req.file ? req.file.filename : "no image";
    try {
      await banner.create({ ...req.body, productImage: productimg });
      res.redirect("/add-banner");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding product");
    }
  },
  addCoupon: (req, res) => {
    res.status(200).render("admin/addCoupon");
  },
  addCouponPost: async (req, res) => {
    console.log(req.body);
    await couponDetails.create(req.body);
  },
  addCategory: (req, res) => {
    res.status(200).render("admin/addCategory");
  },
  addCategoryPost: async (req, res) => {
    await categoryDetails.create(req.body);
  },
  logout: (req, res) => {
    req.session.destroy();
  },
};
