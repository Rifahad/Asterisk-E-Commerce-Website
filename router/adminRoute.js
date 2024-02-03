const express=require("express")
const router=express.Router()
const multer = require('multer')
const storage=require("../middleware/multer")
const upload = multer({ storage })



const {
    registerAccount,
    registerAccountPost,
    loginAdmin,
    loginAdminPost,
    dashboard,
    category,
    addCategory,
    addCategoryPost,
    orders,
    products,
    addProduct,
    addProductPost,
    banner,
    addBanner,
    addBannerPost,
    coupon,
    addCoupon,
    addCouponPost,
    users,
    logout

}=require("../controller/adminController")


router.get("/register",registerAccount)
      .post("/login-admin",registerAccountPost)

      .get("login-admin",loginAdmin)
      .post("/dashboard",loginAdminPost)

      .get("/dashboard",dashboard)

      .get("/category",category)
      .get("/add-category",addCategory)
      .post('/add-category',addCategoryPost)
      
      .get("/orders",orders)

      .get('/products',products)
      .get("/add-product",addProduct)
      .post("/add-product",upload.single('productImage'),addProductPost)

      .get("/banner" , banner )
      .get("/add-banner",addBanner)
      .post("/add-banner",addBannerPost)

      .get("/coupon",coupon)
      .get("/add-coupon",addCoupon)
      .post("/add-coupon",addCouponPost)

      .get("/users",users)

      .get("/logout",logout)

module.exports=router



