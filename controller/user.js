const product=require("../model/products");
const wishlist=require("../model/wishlist")

module.exports = {
  home:async (req, res) => {
    try{
      if(req.session.userId){
        let products = await product.find().limit(3)
        res.render("user/userHomePage",{products})
      }else{
        res.redirect("/")
      }
    }catch (error){
      console.log(error);
    }
  },  
  detailedProduct:async(req, res) => {
    try{
      if(req.session.userId){
        const userid=req.session.userId
        let productId=req.params.id
        let wishlistData=await wishlist.findOne({user:userid,product:productId})
        let wishlistId;
        if(wishlistData){
          wishlistData.product.forEach((data) => {
            if(data==productId){
              wishlistId=productId;
            }
          });
          if(!wishlistData){
            wishlistId=null;
          }
        }
        let data = await product.findById(productId)
    
        res.render("user/productDetailPage",{data, wishlistId})
      }else{
        res.redirect("/")
      }
    }catch (error){
      console.log(error);
    }
  },
  
  category:async (req, res) => {
    if(req.session.userId){
      const category = req.params.category;
      const categorizedDetails=await product.find({category:category})
      console.log(categorizedDetails);
      res.status(200).render("user/userSingleProductPage",{data:categorizedDetails})
    }else{
      res.redirect('/');
    }
  },

  logout: (req, res) => {
    req.session.destroy();
  },
};
