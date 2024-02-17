const productDetails = require("../model/products");
const banner = require("../model/banner");
const couponDetails = require("../model/coupon");
const categoryModel = require("../model/category");
const userModel=require('../model/register')
const fs=require('fs')

module.exports = {
  addProduct:async (req, res) => {
    const categoryData=await categoryModel.find()
    res.status(200).render("admin/addProducts",{data:categoryData});
  },
  addProductPost: async (req, res) => {
    const productImage = req.files.map(img=>img.filename);
    try {
      await productDetails.create({ ...req.body, productImage: productImage });
      res.redirect("/add-product");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding product");
    }
  },
  editProduct:async (req,res)=>{
    let id=req.params.productId;
    const data=await productDetails.findById(id)
    const categoryData=await categoryModel.find()
    res.status(200).render("admin/editProduct",{data:categoryData,product:data})
  },
  editProductPost:async (req,res)=>{
    try {
      let id=req.params.productId;
      const oldImage=await productDetails.findOne({_id:id})
      const {productName,price,discount,stock,category,subCategory,deliveryDate,colour,size,quantity,description} = req.body;
      let image;
      if(req.files.length > 0){
        oldImage.productImage.forEach(element => {
          const imagePath  ='./public/'+'asset/'+element  
          if(fs.existsSync(imagePath)){
            fs.unlinkSync(imagePath)
          }
        });
         image = req.files.map((img)=>img.filename);
      }else{
        image=oldImage.productImage.map((img)=>img)
      }
     const data =  await productDetails.findByIdAndUpdate(id, {
          $set: {
              productImage: image,
              productName: productName,
              price:price,
              discount: discount,
              stock:stock,
              category:category,
              subCategory:subCategory,
              deliveryDate:deliveryDate,
              colour:colour,
              size:size,
              quantity:quantity,
              description:description,
          }
        });      
      res.redirect("/products")
    } catch (error) {
      res.status(400).json({message:"No file uploaded"})
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const id = req.params.productId;
      const product = await productDetails.findOne({ _id:id});
      product.productImage.forEach(element => {
        const imagePath  ='./public/'+'asset/'+element  
        if(fs.existsSync(imagePath)){
            fs.unlinkSync(imagePath)
          }
      });
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
      res.status(500).send("Error adding banner");
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
    await couponDetails.create(req.body);
  },
  addCategory: (req, res) => {
    res.status(200).render("admin/addCategory");
  },
  addCategoryPost: async (req, res) => {
    try{
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
  }  
},
blockUser:async(req,res)=>{
  const userid=req.params.userId;
  const userData=await userModel.findOne({_id:userid});
  if(userData.isBlocked==false){
    await userModel.updateOne({_id:userid},{isBlocked:true})
    res.status(200).json({ message: "Unblock" });
  }else{
    await userModel.updateOne({_id:userid},{isBlocked:false})
    res.status(200).json({ message: "block" });


  }
},


logout: (req, res) => {
    req.session.destroy();
  },
};
