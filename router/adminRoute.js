const express=require("express")
const router=express.Router()
const multer = require('multer')
const storage=require("../middleware/multer")
const upload = multer({ storage })



const {
    addCategory,
    addCategoryPost,
    addProduct,
    addProductPost,
    // editProduct,
    deleteProduct,
    addBanner,
    addBannerPost,
    addCoupon,
    addCouponPost,
    logout
}=require("../controller/adminController")

const auth=require("../controller/authController")
const view=require("../controller/adminViewsController")

    
router.get("/register",auth.registerAccount)
      .post("/login-admin",auth.registerAccountPost)

      .get("login-admin",auth.loginAdmin)
      .post("/dashboard",auth.loginAdminPost)

      .get("/dashboard",view.dashboard)

      .get("/category",view.category)
      .get("/add-category",addCategory)
      .post('/add-category',upload.single('productImage'),addCategoryPost)
      
      .get("/orders",view.orders)

      .get('/products',view.products)
    //   .get('/product/edit/:id',editProduct)
      .get("/product/delete/:productId",deleteProduct)


      .get("/add-product",addProduct)
      .post("/add-product",upload.single('productImage'),addProductPost)

      .get("/banner" , view.banner)
      .get("/add-banner",addBanner)
      .post("/add-banner",upload.single('productImage'),addBannerPost)

      .get("/coupon",view.coupon)
      .get("/add-coupon",addCoupon)
      .post("/add-coupon",addCouponPost)

      .get("/users",view.users)

      .get("/logout",logout)

module.exports=router



