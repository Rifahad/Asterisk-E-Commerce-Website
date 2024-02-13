const express=require("express")
const router=express.Router()
const multer = require('multer')
const storage=require("../middleware/multer")
const upload = multer({ storage })



const {
    dashboard,
    category,
    addCategory,
    addCategoryPost,
    orders,
    products,
    addProduct,
    addProductPost,
    // editProduct,
    deleteProduct,
    banner,
    addBanner,
    addBannerPost,
    coupon,
    addCoupon,
    addCouponPost,
    users,
    logout
}=require("../controller/adminController")

const auth=require("../controller/authController")

    
router.get("/register",auth.registerAccount)
      .post("/login-admin",auth.registerAccountPost)

      .get("login-admin",auth.loginAdmin)
      .post("/dashboard",auth.loginAdminPost)

      .get("/dashboard",dashboard)

      .get("/category",category)
      .get("/add-category",addCategory)
      .post('/add-category',upload.single('productImage'),addCategoryPost)
      
      .get("/orders",orders)

      .get('/products',products)
    //   .get('/product/edit/:id',editProduct)
      .get("/product/delete/:productId",deleteProduct)


      .get("/add-product",addProduct)
      .post("/add-product",upload.single('productImage'),addProductPost)

      .get("/banner" , banner )
      .get("/add-banner",addBanner)
      .post("/add-banner",upload.single('productImage'),addBannerPost)

      .get("/coupon",coupon)
      .get("/add-coupon",addCoupon)
      .post("/add-coupon",addCouponPost)

      .get("/users",users)

      .get("/logout",logout)

module.exports=router



