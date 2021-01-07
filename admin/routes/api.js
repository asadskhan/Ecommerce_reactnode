var express = require('express');
var router = express.Router();
 
var HomeController    = require('../controllers/HomeController');  
// var ConstructorController    = require('../controllers/ConstructorController');  
// var CommonsController    = require('../controllers/CommonsController'); 
// var CustomerController    = require('../controllers/CustomerController'); 
// var MailsController    = require('../controllers/MailsController'); 
var AdminController    =  require('../controllers/admin/AdminController');  
var CategoriesController    =  require('../controllers/admin/CategoriesController');  
var BrandController    =  require('../controllers/admin/BrandController');
var ColorController    =  require('../controllers/admin/ColorController');
var UsersController    =  require('../controllers/admin/UsersController');   
var ProductsController    =  require('../controllers/admin/ProductsController'); 
var BlogController    =  require('../controllers/admin/BlogController');
var CategoryController    =  require('../controllers/admin/CategoryController');
var BannerController    =  require('../controllers/admin/BannerController');

var ProductController    =  require('../controllers/ProductsController');

   
/** Routes for admin  */ 
router.get('/admin/login', AdminController.login);     
router.post('/admin/login', AdminController.login);     
router.get('/admin/Dashboard', requiredAuthentication, AdminController.dashboard); 
    
/** Routes for category module  */ 
 router.get('/admin/Categories/list',  CategoriesController.list);     
 router.get('/admin/Categories/edit/:id',  CategoriesController.edit);     
 router.post('/admin/Categories/edit/:id', CategoriesController.edit); 
 router.post('/admin/Categories/add',  CategoriesController.add); 
 router.get('/admin/Categories/add',  CategoriesController.add); 
 router.get('/admin/Categories/delete/:id',  CategoriesController.deleteRecord);   
router.get('/admin/Categories/getSubcat/:catId', CategoriesController.getSubcat);

/** Routes for Brand module  */ 
router.get('/admin/Brand/list',  BrandController.list);     
router.get('/admin/Brand/edit/:id',  BrandController.edit);     
router.post('/admin/Brand/edit/:id', BrandController.edit); 
router.post('/admin/Brand/add',  BrandController.add); 
router.get('/admin/Brand/add',  BrandController.add); 
router.get('/admin/Brand/delete/:id',  BrandController.deleteRecord);

/** Routes for Color module  */ 
router.get('/admin/Color/list',  ColorController.list);     
router.get('/admin/Color/edit/:id',  ColorController.edit);     
router.post('/admin/Color/edit/:id', ColorController.edit); 
router.post('/admin/Color/add',  ColorController.add); 
// router.get('/admin/Color/add',  ColorController.add); 
router.get('/admin/Color/delete/:id',  ColorController.deleteRecord);

/** Routes for users module  */ 
router.get('/admin/Users/list',  UsersController.list);     
router.get('/admin/Users/edit/:id',  UsersController.edit);     
router.post('/admin/Users/edit/:id',  UsersController.edit); 
router.post('/admin/Users/add', UsersController.add); 
router.get('/admin/Users/add',  UsersController.add); 
router.get('/admin/Users/delete/:id', UsersController.deleteRecord);

/** Routes for users Products  */ 
router.get('/admin/Products/list',  ProductsController.list);     
router.get('/admin/Products/edit/:id', ProductsController.edit);     
router.post('/admin/Products/edit/:id',  ProductsController.edit);   
router.post('/admin/Products/add', ProductsController.add); 
router.get('/admin/Products/add',  ProductsController.add); 
router.get('/admin/Products/delete/:id', ProductsController.deleteRecord);   
router.get('/admin/Products/images/:id', ProductsController.images);   
router.post('/admin/Products/images/:id', ProductsController.images);   
router.get('/admin/Products/deleteImage/:id', ProductsController.deleteImage); 
router.get('/admin/Products/setDefaultImage/:id/:product_id', ProductsController.setDefaultImage);


/** Routes for Blog  */ 
router.get('/admin/Blog/list',  BlogController.list);     
router.get('/admin/Blog/edit/:id', BlogController.edit);     
router.post('/admin/Blog/edit/:id',  BlogController.edit);   
router.post('/admin/Blog/add', BlogController.add); 
router.get('/admin/Blog/add',  BlogController.add); 
router.get('/admin/Blog/delete/:id', BlogController.deleteRecord);   
router.get('/admin/Blog/images/:id', BlogController.images);   
router.post('/admin/Blog/images/:id', BlogController.images);   
router.get('/admin/Blog/deleteImage/:id', BlogController.deleteImage); 
router.get('/admin/Blog/setDefaultImage/:id/:blog_id', BlogController.setDefaultImage); 
// router.get('/Blog/getProductlist', BlogController.getProductlist); 


/** Routes for Blog  Category */ 
router.get('/admin/Category/list',  CategoryController.list);     
router.get('/admin/Category/edit/:id', CategoryController.edit);     
router.post('/admin/Category/edit/:id',  CategoryController.edit);   
router.post('/admin/Category/add', CategoryController.add); 
router.get('/admin/Category/add',  CategoryController.add); 
router.get('/admin/Category/delete/:id', CategoryController.deleteRecord);


/** Routes for Banner */ 
router.get('/admin/Banner/list',  BannerController.list);     
router.get('/admin/Banner/edit/:id', BannerController.edit);     
router.post('/admin/Banner/edit/:id',  BannerController.edit);   
router.post('/admin/Banner/add', BannerController.add); 
router.get('/admin/Banner/add',  BannerController.add); 
router.get('/admin/Banner/delete/:id', BannerController.deleteRecord);

  
router.get('/admin/logout', AdminController.logout); 



/* Constructor detail API  */
// router.post('/constructor/sign-up', ConstructorController.signUp);  
// router.post('/constructor/login', ConstructorController.login);  
// router.get('/constructor/membershipList', ConstructorController.membershipList);
// router.post('/constructor/updateProfile', ConstructorController.updateProfile);  
// router.get('/constructor/constructorDetail', ConstructorController.constructorDetail);   
// router.get('/constructor/projectList', ConstructorController.projectList);   
// router.post('/constructor/addProject', ConstructorController.addProject);    
// router.get('/constructor/projectDetail', ConstructorController.projectDetail);     
// router.get('/constructor/customerList', ConstructorController.customerList);     
// router.get('/constructor/notifications', ConstructorController.notifications);      
// router.post('/constructor/updateMilestone', ConstructorController.updateMilestone);      
// router.get('/constructor/deletePortfolioImage', ConstructorController.deletePortfolioImage);       
// router.post('/constructor/updateLocation', ConstructorController.updateLocation);        
// router.get('/constructor/deleteLocation', ConstructorController.deleteLocation); 
// router.post('/constructor/updateBankDetail', ConstructorController.updateBankDetail); 
// router.get('/constructor/getBankDetail', ConstructorController.getBankDetail);  
// router.get('/constructor/transactionHistory', ConstructorController.transactionHistory);   
// router.get('/constructor/membershipTransactions', ConstructorController.membershipTransactions);   
// router.get('/constructor/getMembershipData', ConstructorController.getMembershipData);    
  

/* Customer detail API  */
// router.get('/customer/constructorList', CustomerController.constructorList); 
// router.post('/customer/constructorDetail', CustomerController.constructorDetail); 
// router.post('/customer/sign-up', CustomerController.signUp);   
// router.post('/customer/login', CustomerController.login);    
// router.get('/customer/getProfile', CustomerController.getProfile);          
// router.post('/customer/updateUserProfile', CustomerController.updateUserProfile);          
// router.get('/customer/projectList', CustomerController.projectList);            
// router.get('/customer/projectDetail', CustomerController.projectDetail);            
// router.get('/customer/notifications', CustomerController.notifications);               
// router.get('/customer/transactionHistory', CustomerController.transactionHistory);                
// router.post('/customer/submitReview', CustomerController.submitReview);                 
// router.get('/customer/test', CustomerController.test);                 
// router.get('/customer/getSubscription', CustomerController.getSubscription);                 
//router.post('/customer/logout', CustomerController.logout);    
 
 
/* Common APIs  */
// router.post('/constructor/forgotPassword', CommonsController.forgotPassword);          
// router.post('/customer/forgotPassword', CommonsController.forgotPassword);           
// router.get('/constructor/categoryList', CommonsController.categoryList); 
// router.get('/customer/categoryList', CommonsController.categoryList); 
// router.post('/customer/changePassword', CommonsController.changePassword);  
// router.post('/constructor/changePassword', CommonsController.changePassword);  
// router.post('/constructor/updateToken', CommonsController.updateToken);  
// router.post('/customer/updateToken', CommonsController.updateToken);   
// router.post('/customer/logout', CommonsController.logout);   
// router.post('/constructor/logout', CommonsController.logout);    


router.get('/', HomeController.index);
router.post('/newsletter', HomeController.newsletter);
router.get(['/products','/products*'], HomeController.getProductlist);
router.get('/productsdata', HomeController.getProductDatalists);
router.get('/product/:id',  HomeController.getProductdetail);
module.exports = router;       

function requiredAuthentication(req, res, next) {
    next(); 
    if(req.session){
        LoginUser = req.session.LoginUser;
        if(LoginUser){    
            console.log('Authentication check '+LoginUser)
            next();
        }else{
            res.redirect(nodeAdminUrl+'/login');       
        } 
    }else{
        res.redirect(nodeAdminUrl+'/login');       
    }
}