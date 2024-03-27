const product=require("../model/products");
const wishlist=require("../model/wishlist");
const reviewModel=require('../model/review')

module.exports = {
  home: async (req, res) => {
    try {
      if (req.session.userId) {
        let products = await product.find().limit(3);
        res.render("user/userHomePage", { products });
      } else {
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  },
  detailedProduct: async (req, res) => {
    try {
      if (req.session.userId) {
        const userid = req.session.userId;
        let productId = req.params.id;
        let wishlistData = await wishlist.findOne({
          user: userid,
          product: productId,
        });
        let wishlistId;
        if (wishlistData) {
          wishlistData.product.forEach((data) => {
            if (data == productId) {
              wishlistId = productId;
            }
          });
          if (!wishlistData) {
            wishlistId = null;
          }
        }
        let data = await product.findById(productId);
        const ProductReview = await reviewModel.findOne({productID:productId}).populate('review.UserId')
        res.render("user/productDetailPage", { data, wishlistId, ProductReview });
      } else {
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  },

  category: async (req, res) => {
    if (req.session.userId) {
      const category = req.params.category;
      const categorizedDetails = await product.find({ category: category });
      console.log(categorizedDetails);
      res
        .status(200)
        .render("user/userSingleProductPage", { data: categorizedDetails });
    } else {
      res.redirect("/");
    }
  },

  searchingGet: async (req, res) => {
    try {
      let allProducts;
      const Name = req.query.search?.toString() || "";
      allProducts = await product.find({
        productName: { $regex: Name, $options: "i" },
      });
      res.render("user/userSingleProductPage", { data:allProducts });
    } catch (error) {
      console.log(error);
    }
  },
  sort:async (req,res)=>{
    const sortType=req.query.value
    const sortedProducts=await product.find().sort({price:parseInt(sortType)})
    res.render("user/userSingleProductPage", { data:sortedProducts });
  },
  filter:async (req,res)=>{
    const {min,max}=req.body
    const filtered=await product.find({price:{$gte:min,$lte:max}})
    res.render("user/userSingleProductPage", { data:filtered });
  },
  userReviewGet:async(req,res)=>{
    if(req.session.userId){
      const productId=req.params.id
      const productDetails = await product.findOne({_id:productId})
      res.status(200).render('user/ProductReview',{data:productDetails})

    }else{
      res.redirect('/')
    }
  },

  userReviewPost:async(req,res)=>{
    try {
     
     const userID = req.session.userId
     const productId = req.params.id
     const {description,title} = req.body
      
     const review = await reviewModel.findOne({productID:productId})
     if (!review) {
       const newReview = new reviewModel({
         productID:productId,
         review:[{UserId:userID,
          comment:description,
          title:title
        }]
       })
       await newReview.save()    
       res.redirect('/home')
     }else{
       await reviewModel.updateOne(
         { productID:productId},
         {$push:{review:{UserId:userID,
          comment:description,
          title:title
        }}}
       )
       res.redirect('/home')
     }
    } catch (error) {
     console.log(error);
    }
  },

  logout: (req, res) => {
    req.session.destroy();
  },
};



