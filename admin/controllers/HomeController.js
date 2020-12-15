var dateFormat = require('dateformat');
var Users = require.main.require('./models/Users');
var randomstring = require("randomstring");   
var Request = require("request"); 
var ProductImages = require.main.require('./models/ProductImages');   
var Products = require.main.require('./models/Products');  
var Categories = require.main.require('./models/Categories');
var Brand = require.main.require('./models/Brand');
var Color = require.main.require('./models/Color');

var Home = require.main.require('./models/Home');
var BlogImages = require.main.require('./models/BlogImages');

var Projects = require.main.require('./models/Projects');
/** 
 *  notificationList
 *  Purpose: This function is used to see notification list 
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void  
*/
async function index(req, res) {
    try {  
         
        // newarrival = {};
        // featured = {};
        // bestseller = {};
        // saleproduct = {};
        // topratted = {};    
        action = 'list'; 
        
        const newarrival = await Products.getAllData(4);
        if(newarrival){ 
             
            for (const item of newarrival) { 
                productImage = await ProductImages.getDefaultImage(item.id);
                CategoryName = await Categories.getRecordByid(item.category_id);
                
                if(CategoryName.length > 0){ 
                    item.category_title = CategoryName[0].title;
                }else{
                    item.default_image = noImageProduct; 
                }

                if(productImage.length > 0){ 
                    item.default_image = nodeSiteUrl+'/upload/product_images/'+productImage[0].image; 
                }else{
                    item.default_image = noImageProduct; 
                }  
            };     
        } 

        const featured = await Products.getFeaturedProduct(5);
        if(featured){ 
             
            for (const item of featured) { 
                productImage = await ProductImages.getDefaultImage(item.id);
                CategoryName = await Categories.getRecordByid(item.category_id);
                
                if(CategoryName.length > 0){ 
                    item.category_title = CategoryName[0].title;
                }else{
                    item.default_image = noImageProduct; 
                }

                if(productImage.length > 0){ 
                    item.default_image = nodeSiteUrl+'/upload/product_images/'+productImage[0].image; 
                }else{
                    item.default_image = noImageProduct; 
                }  
            };     
        } 

        const bestseller = await Products.getAllData(2);
        if(bestseller){ 
             
            for (const item of bestseller) { 
                productImage = await ProductImages.getDefaultImage(item.id);
                CategoryName = await Categories.getRecordByid(item.category_id);
                
                if(CategoryName.length > 0){ 
                    item.category_title = CategoryName[0].title;
                }else{
                    item.default_image = noImageProduct; 
                }

                if(productImage.length > 0){ 
                    item.default_image = nodeSiteUrl+'/upload/product_images/'+productImage[0].image; 
                }else{
                    item.default_image = noImageProduct; 
                }  
            };     
        } 

        const saleproduct = await Products.getSellData(5);
        if(saleproduct){ 
             
            for (const item of saleproduct) { 
                productImage = await ProductImages.getDefaultImage(item.id);
                CategoryName = await Categories.getRecordByid(item.category_id);
                
                if(CategoryName.length > 0){ 
                    item.category_title = CategoryName[0].title;
                }else{
                    item.default_image = noImageProduct; 
                }

                if(productImage.length > 0){ 
                    item.default_image = nodeSiteUrl+'/upload/product_images/'+productImage[0].image; 
                }else{
                    item.default_image = noImageProduct; 
                }  
            };     
        } 

        const topratted = await Products.getAllData(5);
        if(topratted){ 
             
            for (const item of topratted) { 
                productImage = await ProductImages.getDefaultImage(item.id);
                CategoryName = await Categories.getRecordByid(item.category_id);
                
                if(CategoryName.length > 0){ 
                    item.category_title = CategoryName[0].title;
                }else{
                    item.default_image = noImageProduct; 
                }

                if(productImage.length > 0){ 
                    item.default_image = nodeSiteUrl+'/upload/product_images/'+productImage[0].image; 
                }else{
                    item.default_image = noImageProduct; 
                }  
            };     
        } 
        
        const allCategory = await Categories.getAllParentDataWithoutCollection(3);
        if(allCategory){ 
             
            for (const item of allCategory) {
                if(item.image){ 
                    item.default_image = nodeSiteUrl+'/upload/category_image/'+item.image; 
                }else{
                    item.default_image = noImageProduct; 
                }  
            };     
        } 

        const collectionCategory = await Categories.getAllParentDataWithCollection(2);
        if(collectionCategory){ 
             
            for (const item of collectionCategory) {
                if(item.image){ 
                    item.default_image = nodeSiteUrl+'/upload/category_image/'+item.image; 
                }else{
                    item.default_image = noImageProduct; 
                }  
            };     
        } 
        

        const sliders = await Home.getSliders();
        if(sliders){ 
             
            for (const item of sliders) {
                if(item.image){ 
                    item.default_image = nodeSiteUrl+'/upload/banner_image/'+item.image; 
                }else{
                    item.default_image = noImageProduct; 
                }  
            };     
        } 

        const homeBlog = await Home.getBlogs(3);
        if(homeBlog){
            for (const item of homeBlog) {
                blogImage = await BlogImages.getDefaultImage(item.id);
                 

                if(blogImage.length > 0){ 
                    item.default_image = nodeSiteUrl+'/upload/blog_image/'+blogImage[0].image; 
                }else{
                    item.default_image = noImageProduct; 
                }
                item.default_date = dateFormat(item.created_at, "mediumDate");
            };     
        }

        const dealDay = await Products.getAllDeal(1);
        if(dealDay){ 
             
            for (const item of dealDay) { 
                productImage = await ProductImages.getDefaultImage(item.id);

                if(productImage.length > 0){ 
                    item.default_image = nodeSiteUrl+'/upload/product_images/'+productImage[0].image; 
                }else{
                    item.default_image = noImageProduct; 
                }
                item.deal_end_time = dateFormat(item.deal_end_time, "yyyy/m/dd HH:MM:ss"); 
            };     
        } 

        return res.send(JSON.stringify({
                        status: true, 
                        page_title:"Ecommerce",
                        allCategory:allCategory, 
                        collectionCategory:collectionCategory, 
                        sliders:sliders, 
                        dealDay:dealDay, 
                        homeBlog:homeBlog, 
                        newarrival:newarrival, 
                        featured:featured, 
                        bestseller:bestseller, 
                        saleproduct:saleproduct, 
                        topratted:topratted
                    }));

        // res.set('content-type' , 'text/html; charset=mycharset'); 
        // res.render('front/index',{page_title:"Ecommerce",allCategory:allCategory, collectionCategory:collectionCategory, sliders:sliders, dealDay:dealDay, homeBlog:homeBlog, newarrival:newarrival, featured:featured, bestseller:bestseller, saleproduct:saleproduct, topratted:topratted});
    } catch (err) {
        console.log('Catch Error: '+err)
        return err; 
    } 
        
};
exports.index = index;

/** 
 *  newsletter
 *  Purpose: This function is used newsletter
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void 
*/ 
async function newsletter(req, res) {

    console.log(req.body.newsletter)
    if(req.body.newsletter){

        var body_message = 'Hi, <br /> Newsletter Subscription Email : <br />'+req.body.newsletter;

        var subject =  'Newsletter Subscription';
        var mail = {
            from    :   'info@ecommerce.projectdemo.company',
            to      :   [String('deepshah983@gmail.com')],
            subject :   subject,
            html    :   body_message   
        }  
        var data = '';

        smtpTransport.sendMail(mail, function(error, response){
            if(error){  
                console.log(error); 
                smtpTransport.close(); 
                return res.send(JSON.stringify({
                    "status": 201,
                    "message": 'Error in sending mail.',
                    "data": error, 
                 })); 

            }else{   
                console.log('mail sent'); 
                smtpTransport.close();
                return res.send(JSON.stringify({
                    "status": 200,
                    "message": 'Subscription successful.',
                    "data": data,   
                }));  
            }     
        }); 
    }
            
};    
exports.newsletter = newsletter;



/** 
 *  list
 *  Purpose: This function is used to show listing of all arecord
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json   
*/
async function getProductlist(req, res) { 
    
      
    const { check, validationResult } = require('express-validator/check');   
    var input = JSON.parse(JSON.stringify(req.body)); 
    var input = req.query;
    console.log('Request Body : '+JSON.stringify(input));

    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
                 

    var reaponseArr = {};   
    var projectglobalArr = [];
    
    var searchCategory = (input.category)?input.category:[]
    var searchBrand = (input.brand)?input.brand:[]
    var sort = (input.sort)?input.sort:''
     

    var categoryglobalArr = [];
    let categoryglobalArrLists = [];

    var brandglobalArr = [];
    let brandglobalArrLists = [];
    
    var colorglobalArr = [];
    let colorglobalArrLists = []

    var MaxPrice = '0'
    var MinPrice = '0'

    var constructorArr = {}; 
 
    var pageLimit = 10;
    try{   

        let page = (input.page >0 ) ? input.page : 1;    
        let offset =  String((page-1)*pageLimit);  

        data = {
            user_id:input.user_id,
            brand:searchBrand,
            sort:sort,
            offset:offset,
            limit:pageLimit
        }    

            var projectsCount = await Projects.getProjectCount(data);
            console.log(projectsCount);
            if(projectsCount){  

                var projects = await Projects.getProjects(data);
                    // console.log(projects); 
                if(projects){ 
                    // projects.forEach(function (item, key) {
                    for (const item of projects) { 
                        productImage = await ProductImages.getDefaultImage(item.id);

                        dataArr = {};
                        dataArr.id = String(item.id);
                        dataArr.title = String(item.title);
                        
                        if(productImage.length > 0){ 
                            dataArr.default_image = nodeSiteUrl+'/upload/product_images/'+productImage[0].image; 
                        }else{
                            dataArr.default_image = noImageProduct; 
                        }
                        
                        dataArr.description = String(item.description);
                        dataArr.price = CURRENCY+String(item.price);
                        dataArr.discount = String(item.discount);
                        dataArr.discounted_price = CURRENCY+String(item.discounted_price);
                        dataArr.is_sell = String(item.is_sell);
                        dataArr.created_date = moment(item.created_at).format('YYYY-MM-DD hh:mm:ss');
                        projectglobalArr.push(dataArr);
                        
                        let cats = item.sub_category_id.split(',');
                        cats.forEach(function(obj){
                            if (!categoryglobalArr.includes(parseInt(obj))) {
                                categoryglobalArr.push(parseInt(obj));
                            }
                              
                        });

                        // Color
                        let colors = item.color.split(',');
                        colors.forEach(function(obj){
                            if (!colorglobalArr.includes(parseInt(obj))) {
                                colorglobalArr.push(parseInt(obj));
                            }
                              
                        });

                        // Brand Array
                        if (!brandglobalArr.includes(parseInt(item.brand))) {
                            brandglobalArr.push(parseInt(item.brand));
                        }

                    // });
                    }

                    var productMinMax = await Projects.getProjectMinMax(data);

                    MaxPrice = productMinMax[0].MaxPrice
                    MinPrice = productMinMax[0].MinPrice

                }

                // Category Array 
                
                if(categoryglobalArr){
                    for (const item of categoryglobalArr) { 
                        //console.log('Value : '+item)
                        CategoryName = await Categories.getRecordByid(item)
                        if(CategoryName.length > 0){ 
                            catName = CategoryName[0].title;
                            catId = CategoryName[0].id;
                            
                            checked = JSON.stringify(searchCategory).includes(parseInt(item)) ? 'checked="checked"':''

                            categoryglobalArrLists.push({id: catId, name: catName,count : 2 , checked:checked })
                        }
                    }  
                }

                // Color Array 
                let colorglobalArrLists = []
                if(colorglobalArr){
                    for (const item of colorglobalArr) { 
                        //console.log('Value : '+item)
                        ColorName = await Color.getRecordByid(item)
                        if(CategoryName.length > 0){ 
                            clrId = ColorName[0].id;
                            clrName = ColorName[0].title;
                            clrCode = ColorName[0].color_code;
                            colorglobalArrLists.push({id: clrId, name: clrName, clrCode: clrCode, count : 2 })
                        }
                    }  
                }

                // Brand Array 
                let brandglobalArrLists = []
                if(brandglobalArr){
                    for (const item of brandglobalArr) { 
                        //console.log('Value : '+item)
                        BrandName = await Brand.getRecordByid(item)
                        if(BrandName.length > 0){ 
                            brandName = BrandName[0].title;
                            brandId = BrandName[0].id;
                            checked = JSON.stringify(searchBrand).includes(parseInt(item)) ? 'checked="checked"':''

                            brandglobalArrLists.push({id: brandId, name: brandName,count : 2 , checked:checked})
                        }
                    }  
                }


                // console.log("Global Array : "+projectglobalArr);
                console.log('Category Array: '+JSON.stringify(categoryglobalArrLists))
                console.log('Brand Array: '+JSON.stringify(brandglobalArrLists))
                console.log('Color Array: '+JSON.stringify(colorglobalArrLists))
                
                var total_record = projectsCount[0].count;
                if(parseInt(total_record) <= parseInt(pageLimit)){
                    var  total_page = 1;
                }else{
                    var  total_page = (total_record/pageLimit); 
                    if(total_page % 1 != 0){
                        total_page = total_page-(total_page % 1)+1;  
                    }    
                } 
                

                total_record =  String(total_record);
                total_page  = String(total_page);
                current_page = page;
                project_list = projectglobalArr;
                categoryLists = categoryglobalArrLists;
                brandLists = brandglobalArrLists;
                colorLists = colorglobalArrLists;
                
                // console.log("Total Record : "+total_record); 
                
            }else{ 
                 
                total_record =   String(0);
                total_page = String(0);
                current_page =  page;
                project_list =  projectglobalArr;
                categoryLists = categoryglobalArrLists;
                brandLists = brandglobalArrLists;
                colorLists = colorglobalArrLists;
            }

    }catch (e) { 
        console.log("CaTCH eRROR: "+e);
        // return res.send(JSON.stringify({ 
        //     "status": SessionExpireStatus,  
        //     "message": e, 
        //     "data": reaponseArr  
        // })); 
    }


    res.set('content-type' , 'text/html; charset=mycharset'); 
    res.render('front/lists',{
        page_title:"Ecommerce",
        allProduct:project_list, 
        categoryLists:categoryLists, 
        brandLists:brandLists, 
        colorLists:colorLists, 
        total_record:total_record, 
        total_page:total_page, 
        current_page:current_page,
        MaxPrice:MaxPrice,
        MinPrice:MinPrice,
        searchCategory:searchCategory,
        fullUrl:fullUrl
    });
    
};
exports.getProductlist = getProductlist;


/** 
 *  projectList
 *  Purpose: This function is used to get projectList
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: JSON 
*/  
exports.getProductDatalists = function (req, res) {  
     
    const { check, validationResult } = require('express-validator/check');   
    var input = JSON.parse(JSON.stringify(req.body)); 
    var input = req.query;   
    var auth_token = req.headers.authtoken;   
        
    var reaponseArr = {};   
    var projectglobalArr = [];    
    var constructorArr = {}; 
 
        
    try{   

        let page = (input.page >0 ) ? input.page : 1;    
        let offset =  String((page-1)*pageLimit);  

        data = {
            user_id:input.user_id,
            offset:offset,
            limit:pageLimit
        }    
        Projects.getProjectCount(data,function(projectsCount){
            console.log(projectsCount[0].count);
            if(projectsCount){  

                Projects.getProjects(data,function(projects){
                    console.log(projects); 
                    if(projects){ 
                        projects.forEach(function (item, key) {
                            dataArr = {};
                            dataArr.project_id = String(item.id); 
                            dataArr.project_title = String(item.title);
                            dataArr.description = String(item.description);  
                            dataArr.amount = CURRENCY+String(item.amount);  
                            dataArr.status = (item.status == 1) ? 'Pending' : 'Completed';  
                            dataArr.created_date = moment(item.created_at).format('YYYY-MM-DD hh:mm:ss');    
                            projectglobalArr.push(dataArr);       
                        });    
                    } 
                var total_record = projectsCount[0].count
                    if(parseInt(total_record) <= parseInt(pageLimit)){
                        var  total_page = 1;      
                    }else{
                        var  total_page = (total_record/pageLimit); 
                        if(total_page % 1 != 0){
                            total_page = total_page-(total_page % 1)+1;  
                        }    
                    } 
                    reaponseArr = {  
                        'total_record' :  String(total_record),  
                        'total_page' : String(total_page),   
                        'current_page' : page, 
                        'project_list' : projectglobalArr
                    }  
                    return res.send(JSON.stringify({ 
                        "status": successStatus, 
                        "message": 'Project list', 
                        "data": reaponseArr,  
                    }));   
                });
            }else{ 
                reaponseArr = { 
                    'total_record' :  String(0), 
                    'total_page' : String(0),  
                    'current_page' : page, 
                    'project_list' : projectglobalArr
                }  
                return res.send(JSON.stringify({ 
                    "status": successStatus, 
                    "message": 'No record found',
                    "data": reaponseArr,  
                })); 
            }  
        });  
                    
                
    }catch (e) { 
        console.log(e);
        return res.send(JSON.stringify({ 
            "status": SessionExpireStatus,  
            "message": e, 
            "data": reaponseArr  
        })); 
    }    
};


/**  
 *  updateBankDetail
 *  Purpose: This function is used to updateBankDetail
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void 
*/
async function logout(req, res) { 
    try {
         const { check, validationResult } = require('express-validator/check');
         var reaponseArr = '{}'; 
         var input = JSON.parse(JSON.stringify(req.body));  
         console.log(input); 
         var auth_token = req.headers.authtoken; 
         req.checkBody('user_id', 'user_id is required').notEmpty();  
         var errors = req.validationErrors();  
         if(!auth_token){   	 		 
             return res.send(JSON.stringify({ 
                 "status": SessionExpireStatus,
                 "message": 'Session Expired.',  
             }));	  		 
         }
         if(errors){	  		 
             return res.send(JSON.stringify({
                 "status": failStatus,
                 "message": errors[0].msg, 
             })); 	  		 
         }else{ 
             var respondeArray = {};
             const CheckAuthentication = await Users.CheckAuthentication(auth_token);   // Check Authentication  
             console.log(CheckAuthentication);  
             if(CheckAuthentication.length > 0){ 
                 const checkUser = await Users.getUserByid(input.user_id); 
                // console.log(checkUser); 
                 if(checkUser.length > 0){ 
                     var updateData = { 
                        id    : input.user_id,      
                        device_token : null,  
                        device_type : null,  
                        auth_token : null,   
                     };  
                     var saveRecord = await Users.updateUserData(updateData);    
                     if(saveRecord){   
                         return res.send(JSON.stringify({  
                             "status": successStatus,
                             "message": 'User logged out successfully.',  
                             "data": {},          
                         }));  
                     }else{
                         return res.send(JSON.stringify({ 
                             "status": failStatus,  
                             "message": 'Data could  not updated. Please try again.',
                             "data": respondeArray  
                         })); 
                     }  
                }else{
                    return res.send(JSON.stringify({ 
                        "status": failStatus,  
                        "message": 'Invalid user Id.',
                        "data": respondeArray  
                    }));
                }  
             }else{
                 return res.send(JSON.stringify({ 
                     "status": failStatus,  
                     "message": 'Session expired.',
                     "data": respondeArray   
                 })); 
             }   
         } 
     } catch (err) {
         return res.send(JSON.stringify({
             "status": failStatus,
             "message": err, 
         })); 
     }  
     return false;  
 }; 
 exports.logout = logout; 
 
  


/** 
 *  forgotPassword
 *  Purpose: This function is used to forgotPassword
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: email
 *  Returns: void 
*/
exports.forgotPassword = function (req, res) { 
  
    const { check, validationResult } = require('express-validator/check');  
    var input = JSON.parse(JSON.stringify(req.body));    
    console.log(input);   
    var auth_token = req.headers.authtoken; 
    var errors = req.validationErrors(); 
    var error_msg = '';
    if(!input.email || input.email == null){
        error_msg = 'Please provide location_id';
    }   
	if(error_msg != ''){ 
        return res.send(JSON.stringify({
            "status": failStatus,
            "message": error_msg,  
        })); 
    }else{  
        var userData = { 
            email    : input.email
        };      
        var responseArr = {};  
        Users.checkEmailExist(userData,function(result){  
            if(result[0].count && result[0].count > 0){ 
                updateData = {
                    reset_password_code : randomstring.generate(10), 
                    email : input.email
                } 
                Users.updateData(updateData,function(updateResult){  
                    if(updateResult){      
                        Users.getUserByEmail(input.email,function(userDetail){
                            // Send mail to user 
                            var mailData = { 
                                'receiver_id' :  userDetail[0].id,  
                                'template_slug' : 'forgot-password' 
                            }  
                            Mails.SendMail(mailData);  
                            responseArr.user_id = userDetail.id;  
                            // Save bussiness profile 
                            return res.send(JSON.stringify({  
                                "status": successStatus,
                                "message": 'Reset password link is sent to your email. Please check.', 
                                "data": responseArr,         
                            }));  
                        }); 

                    }else{ 
                        return res.send(JSON.stringify({ 
                            "status": failStatus,  
                            "message": 'Data could  not updated. Please try again.',
                            "data": '{}'  
                        })); 
                    }   
                }); 
            }else{
                return res.send(JSON.stringify({ 
                    "status": SessionExpireStatus,  
                    "message": 'Email is not registered.',
                    "data": responseArr  
                })); 
            }
        });   
           
    }
    return false;  
};
  
/** 
 *  categoryList
 *  Purpose: This function is used to get category list 
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void  
*/ 
exports.categoryList = function (req, res) {  

    try { 
        const { check, validationResult } = require('express-validator/check');   
        var input = JSON.parse(JSON.stringify(req.body)); 
        var input = req.query;   
        var auth_token = req.headers.authtoken;   
        var errors = req.validationErrors();     
        var reaponseArr = [];   
        var constructorArr = {}; 
        if(errors){	  	 	 
            return res.send(JSON.stringify({
                "status": failStatus,
                "message": errors[0].msg, 
            })); 
        //}if(!auth_token){   	 		 
        }if(false){   	 		 
            return res.send(JSON.stringify({ 
                "status": SessionExpireStatus,
                "message": 'Session Expired.',  
            }));	  		 
        }else{      
            let page = (input.page != '' ) ? input.page : 0; 
            let offset = (page * pageLimit);      
            connectPool.query('SELECT id,title FROM categories WHERE is_active = ?', [1], function (error, results) {  
                if(error){
                    console.log(error); 
                }else if (!results) {  
                    return res.send(JSON.stringify({ 
                        "status": 200,
                        "message": 'No record available.',
                        "data": results,
                    })); 
                } else { 
                    return res.send(JSON.stringify({ 
                        "status": 200,
                        "message": 'Category list',
                        "data": results,
                    }));   
                }
            });     
        }
    }catch (e) { 
        console.log(e);
        return res.send(JSON.stringify({ 
            "status": SessionExpireStatus,  
            "message": e, 
            "data": reaponseArr  
        })); 
    }   
}; 

/** 
	 *  ChangePassword
     *  Purpose: This function is used for ChangePassword
	 *  Pre-condition:  None
	 *  Post-condition: None. 
	 *  Parameters: ,
	 *  Returns: void 
*/
exports.changePassword = function (req, res) {
     
    try { 
        const { check, validationResult } = require('express-validator/check');   
        var input = JSON.parse(JSON.stringify(req.body));          
        req.checkBody('current_password', 'Current Password is required').notEmpty();
        req.checkBody('new_password', 'New password is required').notEmpty(); 
        req.checkBody('user_id', 'user_id is required').notEmpty(); 
        var auth_token = req.headers.authtoken;
        var reaponseArr = {};    
        var errors = req.validationErrors();  
        if(errors){	  	 	 
            return res.send(JSON.stringify({
                "status": 400,
                "message": errors[0].msg, 
            }));
        }  
        if(!auth_token){   	 		 
            return res.send(JSON.stringify({ 
                "status": SessionExpireStatus,
                "message": 'Session Expired.',  
            }));	  		 
        } else{ 
            try {
                Auth.CheckAuth(auth_token, function(authResult){   // check Authentication  
                    if(authResult.success){ 
                        var inputArray = {
                            "current_password": input.current_password,
                            "new_password":input.new_password, 
                            "user_id":input.user_id,  
                        } 
                        Request.post({ 
                            "headers": { "content-type": "application/json" },
                            "url": siteUrl +"changePassword", 
                            "body": JSON.stringify({  
                                "current_password": input.current_password,
                                "new_password":input.new_password, 
                                "user_id":input.user_id,  
                            })
                        },(error, response, body) => { 
                            if(error) {
                                return console.dir(error);
                            }     
                            var retrunRes = JSON.parse(body); 
                            return res.send(JSON.stringify(retrunRes));	
                            
                        });
                }else{
                    return res.send(JSON.stringify({ 
                        "status": SessionExpireStatus,  
                        "message": 'Session Expired.',
                        "data": reaponseArr  
                    })); 
                } 
                });
            }catch (e) { 
                console.log(e);
                return res.send(JSON.stringify({ 
                    "status": SessionExpireStatus,  
                    "message": e, 
                    "data": reaponseArr  
                })); 
            }  
        }  
    }catch (e) { 
        console.log(e);
        return res.send(JSON.stringify({ 
            "status": SessionExpireStatus,  
            "message": e, 
            "data": reaponseArr  
        })); 
    }  
};




