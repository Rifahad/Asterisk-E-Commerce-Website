const productDetails = require("../model/products");
const banner = require("../model/banner");
const couponDetails = require("../model/coupon");
const categoryModel = require("../model/category");

module.exports = {
  addProduct: (req, res) => {
    res.status(200).render("admin/addProducts");
  },
  addProductPost: async (req, res) => {
    const productImage = req.file ? req.file.filename : "no image";
    try {
      await productDetails.create({ ...req.body, productImage: productImage });
      res.redirect("/add-product");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding product");
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const id = req.params.productId;
      await productDetails.findByIdAndDelete(id);
      res.status(200).json({ message: "Deleted Successfully" });
    } catch(error){
      res.status(500).send("Error deleting product");
    }
  },
  addBanner: (req, res) => {
    res.status(200).render("admin/addBanner");
  },
  addBannerPost: async (req, res) => {
    console.log(req.body);
    const productImage = req.file ? req.file.filename : "no image";
    try {
      await banner.create({ ...req.body, productImage: productImage });
      res.redirect("/add-banner");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding product");
    }
  },
  deleteBanner: async (req, res) => {
    try {
      const id = req.params.bannerId;
      await banner.findByIdAndDelete(id);
      res.status(200).json({ message: "Deleted Successfully" });
    } catch(error){
      res.status(500).send("Error deleting banner");
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
    try{
      console.log("ojdlkds;ip");
      const { category, subCategory} = req.body
      const categoryImage = req.file.filename
      const subCategoryArray = JSON.parse(subCategory)
      const categories = await categoryModel.find()
      const existCategory = categories.find( val => val.category === category)
      if(!category || !categoryImage){
          return res.status(294).json({ success:false, missingData:true, errorMsg:"Please provide missing datas"})
      }
      else if(existCategory){
          return res.status(289).json({success:false, exist:true, errorMsg:"Category already exist"})
      }
      else if(category && categoryImage && subCategoryArray.length > 0){
          const newSchema = new categoryModel({
              category,
              categoryImage,
              subCategory : subCategoryArray
          })
          await newSchema.save()
          return res.status(200).json({ success:true, allData:true })
      }
      else if(category && categoryImage && subCategoryArray.length == 0){
          const newSchema = new categoryModel({
              category,
              categoryImage
          })
          await newSchema.save()
          return res.status(200).json({ success:true, data:true })
      }
  } catch (error){
      console.log("category post ",error.message);
  }  },
  logout: (req, res) => {
    req.session.destroy();
  },
};
