import addressrouter from "./address/address.router.js"
import authrouter from "./auth/auth.router.js"
import brandrouter from "./brand/brand.router.js"
import cartrouter from "./cart/cart.router.js"
import categoryrouter from "./category/category.router.js"
import couponrouter from "./coupon/coupon.router.js"
import orderrouter from "./order/order.router.js"
import productrouter from "./product/product.router.js"
import reviewrouter from "./review/review.router.js"
import subcategoryrouter from "./subcategory/subcategory.router.js"
import userrouter from './user/user.router.js'
import wishlistrouter from "./wishlist/wishlist.router.js"


export const bootstrap = (app) =>{
    app.use('/api/categories',categoryrouter)
    app.use('/api/subcategories',subcategoryrouter)
    app.use('/api/brands',brandrouter)
    app.use('/api/products',productrouter)
    app.use('/api/users',userrouter)
    app.use('/api/auth',authrouter)
    app.use('/api/reviews',reviewrouter)
    app.use('/api/wishlists',wishlistrouter)
    app.use('/api/addresses',addressrouter)
    app.use('/api/coupons',couponrouter)
    app.use('/api/carts',cartrouter)
    app.use('/api/orders',orderrouter)



    
}
