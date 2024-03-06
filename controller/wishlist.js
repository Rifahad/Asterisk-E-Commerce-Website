const wishlist = require("../model/wishlist");
const product = require("../model/products");
const userModel = require("../model/register");

module.exports = {
  wishlist: async (req, res) => {
    try {
      if (req.session.userId) {
        let products = [];
        const userId = req.session.userId;
        const data = await wishlist.findOne({ user: userId });
        for (let i of data.product) {
          const item = await product.findById(i);
          products.push(item);
        }
        console.log(products);
        res.render("user/wishlist", { products });
      } else {
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  },
  addToWishlist: async (req, res) => {
    try {
      if (req.session.userId) {
        const id = req.params.id;
        const userId = req.session.userId;
        let wishlistId;
        let wishlistData = await wishlist.findOne({
          user: userId,
          product: id,
        });
        wishlistData?.product.forEach((data) => {
          if(data==id){
            wishlistId=id;
          }
        });
        if(wishlistId) {
          await wishlist.findOneAndUpdate(
            { user: userId },
            { $pull: { product: id } },
            { new: true }
          );
        } else {
            await wishlist.findOneAndUpdate(
            { user: userId },
            { $push: { product: id } },
            { upsert: true, new: true }
          );
        }
      }
      res.status(200).json({success:true})
    } catch (error) {
      console.log(error);
    }
  },
  deleteFromWishlist: async (req, res) => {
    try {
      if (req.session.userId) {
        const userId = req.session.userId;
        const productId = req.params.id;
        await wishlist.findOneAndUpdate(
          { user: userId },
          { $pull: { product: productId } },
          { new: true }
        );
        res.status(200).json({ message: true });
      } else {
        res.status(200).redirect("/");
      }
    } catch (error) {
      console.log("error happened at wishlist delete");
    }
  },
};
