var Request = require("request");      
var Categories = require.main.require('./models/Categories');
var Brand = require.main.require('./models/Brand');
var Color = require.main.require('./models/Color');
var ProductImages = require.main.require('./models/ProductImages');   
var Products = require.main.require('./models/Products');   
const controller = 'Products'; 
const module_name = 'Products';  
  
/** 
 *  list
 *  Purpose: This function is used to show listing of all arecord
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json   
*/
async function list(req, res) { 

    try {  
    res.set('content-type' , 'text/html; charset=mycharset'); 
    data = {};    
    action = 'list'; 
    const allRecord = await Products.getAllData();  
    
    // Fnd data by sequilize 
    // const { SQProducts } = require('../../sequelize') 
    // var WHERECONDITION = { 
    //     'is_active' : 1,
    //     'is_deleted' : 0, 
    // }
     
    // var allRecord = await SQProducts.findAll({ 
    //     where : [WHERECONDITION], 
    //     include: [SQProductImages]}).then(function(result){  
    //     return result;
    // }); 


    // console.log(allRecord);
    if(allRecord){ 
        //allRecord.forEach(function (item, key) {
        for (const item of allRecord) { 
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
    //console.log(allRecord);
    res.render('admin/'+controller+'/list',{
        page_title:" List",
        data:allRecord, 
        controller:controller,
        action:action,
        module_name:module_name
    });  

    } catch (err) {
        console.log('Catch Error: '+err)
        return err; 
    } 

};      
exports.list = list;

/**  
 *  list
 *  Purpose: This function is used to send data to the API 
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json   
*/
async function getProductlist(req, res) { 
    
    try {
        var input = JSON.parse(JSON.stringify(req.body));  
        var input = req.query;   
        var auth_token = req.headers.authtoken;   
        var errors = req.validationErrors();     
        var reaponseArr = {};   
        var constructorArr = {}; 
        // if(!req.query.category_id){
        //     return res.send(JSON.stringify({
        //         "status": failStatus,
        //         "message": 'Category Id is required.', 
        //     })); 
        // }   
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
            let page = (input.page && input.page != '' ) ? input.page : 1;  
            let offset =  parseInt((page-1)*pageLimit);    
            var WHERECONDITION = { 
                'is_active' : 1,
                'is_deleted' : 0,
            }
            if(req.query.category_id){ 
                WHERECONDITION.category_id = req.query.category_id; 
            }   
            allProducts = [];

            // Get all products 
            const { SQProducts } = require('../../sequelize') 
            var allProducts = await SQProducts.findAll({ 
                offset:offset, 
                limit:pageLimit, 
                where : [WHERECONDITION], 
                include: [SQProductImages,SQCategory]}).then(function(result){  
                return result;
            });  
            var countAllProducts = await SQProducts.findAll({ where : [WHERECONDITION]}).then(function(countProduct){ 
                return countProduct;
            });    
            if(countAllProducts){   
                    if(allProducts){ 
                        allProducts.forEach(function (item, key) { 
                            if(item.product_images.length > 0){
                                imageArray = item.product_images;
                                imageArray.forEach(function (item1, key1) { 
                                    item1.image = nodeSiteUrl+'/upload/product_images/'+item1.image; 
                                })
                            }  
                        });    
                    } 
                var total_record = countAllProducts.length;
                    if(parseInt(total_record) <= parseInt(pageLimit)){
                        var  total_page = 1;     
                    }else{
                        var  total_page = (total_record/pageLimit); 
                        if(total_page % 1 != 0){
                            if(total_page % 1 != 0){
                                total_page = total_page-(total_page % 1)+1;  
                            }  
                        }      
                    }  
                    reaponseArr = {  
                        'total_record' :  String(total_record), 
                        'total_page' : String(total_page),   
                        'current_page' : page, 
                        'product_list' : allProducts
                    }  
                    return res.send(JSON.stringify({ 
                        "status": successStatus, 
                        "message": 'Project list', 
                        "data": reaponseArr,  
                    }));    
                 
            }else{ 
                reaponseArr = { 
                    'total_record' :  String(0), 
                    'total_page' : String(0),  
                    'current_page' : page, 
                    'project_list' : allProducts
                }  
                return res.send(JSON.stringify({ 
                    "status": successStatus, 
                    "message": 'No record found',
                    "data": reaponseArr,  
                }));  
            }
        } 
    } catch (err) {
        return res.send(JSON.stringify({
            "status": failStatus,
            "message": err, 
        })); 
    } 
};      
exports.getProductlist = getProductlist;
 
/** 
 *  list
 *  Purpose: This function is used to show listing of all arecord
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json   
*/
async function images(req, res) {  
    res.set('content-type' , 'text/html; charset=mycharset'); 
    data = {};    
    action = 'list'; 
    var id =  String("'"+req.params.id+"'"); 
    backURL=req.header('Referer') || '/';
    
    const allRecord = await ProductImages.getByProductId(id);

    var imageArra = [];
    if (req.method == "POST") { 
        var input = JSON.parse(JSON.stringify(req.body)); 
        if (req.files && req.files.images !== "undefined") { 

            let images = req.files.images; 
            var timestamp = new Date().getTime();     
            if(images && images.length > 0){    
                
                images.forEach(function (item, key) {  
                    filename =  item.name;    
                    item.mv('public/upload/product_images/'+item.name, function(err) {
                        if (err){    
                            // console.log(err);    
                            req.flash('error', 'Could not upload image. Please try again!')  
                            res.locals.message = req.flash();   
                            return res.redirect(nodeAdminUrl+'/'+controller+'/images'); 
                        }else{
                            default_image = 0;
                            if(allRecord.length > 0){
                                default_image = 0;
                            }else if(allRecord.length===0 && key === 0){
                                default_image = 1;
                            }
                            var imagedata = {  
                                product_id    : req.params.id,    
                                image :   item.name, 
                                default_image :  default_image      
                            };   
                            imageArra.push(imagedata); 
                            // console.log(imagedata);
                            // console.log(key);
                             
                            ProductImages.saveDataCallback(imagedata,function(result){ 
                                // req.flash('success', 'Images uploaded successfully.')   
                                // res.locals.message = req.flash();  
                                // return res.redirect(backURL);
                                
                            });
                             
                        }  
                    });
                }); 

                req.flash('success', 'Images uploaded successfully.')   
                res.locals.message = req.flash(); 
                res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
                return res.redirect(backURL);
            }else{
                filename = images.name;   
                images.mv('public/upload/product_images/'+filename, function(err) { 
                    if (err){    
                        console.log(err);    
                        req.flash('error', 'Could not upload image. Please try again!')  
                        res.locals.message = req.flash();   
                        //return res.redirect(nodeAdminUrl+'/'+controller+'/images'); 
                        return res.redirect(backURL); 
                    }else{
                        
                        default_image = 1;
                        if(allRecord.length > 0){
                            default_image = 0;
                        }

                        var imagedata = {  
                            product_id    : req.params.id,    
                            image :   filename,
                            default_image :  default_image
                        };   
                        imageArra.push(imagedata); 
                        // console.log(imagedata);
                        ProductImages.saveDataCallback(imagedata,function(result){ 
                            req.flash('success', 'Images uploaded successfully.')   
                            res.locals.message = req.flash();  
                            // return res.redirect(backURL); 

                        });
                    }  
                });
                req.flash('success', 'Images uploaded successfully.')
                res.locals.message = req.flash();
                res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
                return res.redirect(backURL); 
                // return res.redirect(nodeAdminUrl+'/'+controller+'/images/'+input.id);
            }    
           // console.log(imageArra); return true; 
        }        
          
    }

      
    res.render('admin/Products/images',{
        page_title:" Images",
        data:allRecord, 
        controller:controller,
        action:action,
        module_name:module_name,
        id:req.params.id
    });     
};      
exports.images = images;
 

/** 
 *  Edit
 *  Purpose: This function is used to get constructor List
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json  
*/
async function edit(req, res) { 
   
    res.set('content-type' , 'text/html; charset=mycharset'); 
    var action = 'edit';
    var entityDetail = {}; 
    var errorData = {};
    var categoryList = {}
    var brandList = {}
    var colorList = {}
    if(req.params.id){
        var id =  String("'"+req.params.id+"'");   
        entityDetail = await Products.getUserByid(id);   
        if(entityDetail.length == 0){ 
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/'+controller+'/list');  
        }  
        categoryList =  await Categories.getAllParentData();
         
        const subListsData = await Categories.getAllChildData(entityDetail[0].category_id);
        if(subListsData){
            subCategoryList = subListsData;
        }else{
            subCategoryList = {};
        }

        brandList =  await Brand.getAllData();
        colorList =  await Color.getAllData();
        if (req.method == "POST") { 
            var input = JSON.parse(JSON.stringify(req.body));   
            
            req.checkBody('title', 'Title is required').notEmpty();
            req.checkBody('slug', 'Slug is required').notEmpty();
            req.checkBody('category_id', 'Category is required').notEmpty();
            req.checkBody('sub_category_id', 'Sub Category is required').notEmpty();
            req.checkBody('brand', 'Brand is required').notEmpty();
            req.checkBody('color', 'Color is required').notEmpty();
            req.checkBody('description', 'Description is required').notEmpty();
            req.checkBody('specification', 'Specification is required').notEmpty();
            // req.checkBody('price', 'Price is required').notEmpty();
            req.checkBody({ 
              'price': {
                optional: {
                  options: { checkFalsy: true }
                },
                isDecimal: {
                  errorMessage: 'The product price must be a decimal'
                }
              }
            });
            // req.checkBody('discount', 'Discount is required').notEmpty();  
            // req.checkBody('discounted_price', 'discounted_price is required').notEmpty();  
            var errors = req.validationErrors();    
            if(errors){
                if(errors.length > 0){
                    errors.forEach(function (errors1) {
                        var field1 = String(errors1.param);
                        var msg = errors1.msg;
                        errorData[field1] = msg;
                        entityDetail[0].field1 = req.field1;
                    });
                }
            }else{
                var checkDuplicate = await Products.checkRecordDuplication(input.slug,input.id);
                console.log(checkDuplicate.length);
                if(checkDuplicate.length > 0){
                    var msg =  controller+' already added.'; 
                    req.flash('error', msg)   
                    res.locals.message = req.flash();
                    res.set('content-type' , 'text/html; charset=mycharset');  
                    return res.redirect(nodeAdminUrl+'/'+controller+'/edit/'+input.id);     

                }else{

                    var saveResult = '';    
                    var msg =  controller+' updated successfully.';
                    
                    if(input.color!=''){
                        input.color = input.color.toString()
                    }
                    if(input.sub_category_id!=''){
                        input.sub_category_id = input.sub_category_id.toString()
                    }
                    input.is_featured = (input.is_featured === undefined)?'0':'1'
                    input.is_sell = (input.is_sell === undefined)?'0':'1'
                    input.is_deal_product = (input.is_deal_product === undefined)?'0':'1'

                    var saveResult = await Products.updateUserData(input);  
                    req.flash('success', msg)   
                    res.locals.message = req.flash(); 
                    if(saveResult){     
                        return res.redirect(nodeAdminUrl+'/'+controller+'/list');     
                    }
                }
            }  
        } 
 
    }else{   
        req.flash('error', 'Invalid url.');  
        return res.redirect(nodeAdminUrl+'/'+controller+'/list');     
    }  
    res.render('admin/'+controller+'/edit',{
        page_title:" Edit",
        data:entityDetail,
        errorData:errorData,
        controller:controller,
        action:action,
        categories : categoryList,
        subCategoryList : subCategoryList,
        brands : brandList,
        colors : colorList
    });    
};          
exports.edit = edit;  
   

/** 
 *  Edit
 *  Purpose: This function is used to get constructor List
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json  
*/
async function add(req, res) { 
    
    //CheckPermission();   
    res.set('content-type' , 'text/html; charset=mycharset'); 
    var page_title = 'Add'; 
    var errorData = {}; 
    var data = {};  
    var action = 'add'; 
    var errorData = {};    
    categoryList =  await Categories.getAllParentData();
    subCategoryList =  {};
    brandList =  await Brand.getAllData();
    colorList =  await Color.getAllData();

    if (req.method == "POST") { 
        var input = JSON.parse(JSON.stringify(req.body));
        req.checkBody('title', 'Title is required').notEmpty();
        req.checkBody('slug', 'Slug is required').notEmpty();
        req.checkBody('category_id', 'Category is required').notEmpty();
        req.checkBody('sub_category_id', 'Sub Category is required').notEmpty();
        req.checkBody('brand', 'Brand is required').notEmpty();
        req.checkBody('color', 'Color is required').notEmpty();
        req.checkBody('description', 'Description is required').notEmpty();
        req.checkBody('specification', 'Specification is required').notEmpty();
        // req.checkBody('price', 'Price is required').notEmpty();
        req.checkBody({ 
          'price': {
            optional: {
              options: { checkFalsy: true }
            },
            isDecimal: {
              errorMessage: 'The product price must be a decimal'
            }
          }
        });

        // req.checkBody('discount', 'Discount is required').notEmpty();  
        // req.checkBody('display_price', 'display_price is required').notEmpty();   
        var errors = req.validationErrors();    
        if(errors){
            if(errors.length > 0){
                errors.forEach(function (errors1) {
                    var field1 = String(errors1.param);
                    console.log(errors1);
                    var msg = errors1.msg;
                    errorData[field1] = msg;  
                    data.field1 = req.field1;
                });
            }
            data = input;
        }else{
             
            var checkDuplicate = await Products.checkRecordDuplication(input.slug);
            if(checkDuplicate.length > 0){

                var msg =  'Product already added.'; 
                req.flash('error', msg)   
                res.locals.message = req.flash();
                res.set('content-type' , 'text/html; charset=mycharset');  
                return res.redirect(nodeAdminUrl+'/Products/add');     
                 

            }else{

                if(input.color!=''){
                    input.color = input.color.toString()
                }
                if(input.sub_category_id!=''){
                    input.sub_category_id = input.sub_category_id.toString()
                }
                input.is_featured = (input.is_featured === undefined)?'0':'1'
                input.is_sell = (input.is_sell === undefined)?'0':'1'
                input.is_deal_product = (input.is_deal_product === undefined)?'0':'1'

                var saveResult = await Products.saveData(input);
                if(saveResult){
                    req.flash('success', controller+' added successfully.')
                    res.locals.message = req.flash();
                    res.set('content-type' , 'text/html; charset=mycharset');
                    return res.redirect(nodeAdminUrl+'/'+controller+'/list');
                }else{
                    req.flash('error', 'Could not save record. Please try again')
                    res.locals.message = req.flash();
                }
            }
        }
    }
    res.render('admin/'+controller+'/add',{
        page_title:page_title,
        data:data,
        errorData:errorData,
        controller:controller,
        action:action,
        categories : categoryList,
        brands : brandList,
        colors : colorList,
        subCategoryList:subCategoryList
    });
};           
exports.add = add; 

/** 
 *  delete
 *  Purpose: This function is used to get constructor delete
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json  
*/
async function deleteRecord(req, res) { 
   
    var categoryDetail = {}; 
    if(req.params.id){
        var cat_id =  String("'"+req.params.id+"'");    
        categoryDetail = await Products.deleteRecord(cat_id);  
        if(categoryDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/'+controller+'/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/'+controller+'/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/'+controller+'/list');      
    }    
};          
exports.deleteRecord = deleteRecord;  

/** 
 *  delete
 *  Purpose: This function is used to get constructor delete
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json  
*/
async function deleteImage(req, res) { 
   
    var categoryDetail = {}; 
    backURL=req.header('Referer') || '/'; 
    if(req.params.id){
        var id =  String("'"+req.params.id+"'");    
        entityDetail = await ProductImages.deleteRecord(id);   
        if(entityDetail.length == 0){  
            req.flash('error', 'Invalid url')    
        }else{
            req.flash('success', 'Record deleted succesfully.');      
        }   
    }else{ 
        req.flash('error', 'Invalid url.');    
    }    
    return res.redirect(backURL); 
};          
exports.deleteImage = deleteImage;  

/** 
 *  setDefaultImage
 *  Purpose: This function is used to set setDefaultImage 
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json  
*/
async function setDefaultImage(req, res) { 
   
    var categoryDetail = {}; 
    backURL=req.header('Referer') || '/'; 
    if(req.params.id){
        var id =  String("'"+req.params.id+"'");    
        var product_id =  String("'"+req.params.product_id+"'"); 
        console.log(product_id)     
        //entityDetail = await ProductImages.resetDefaultImage(product_id);   
        entityDetail = await ProductImages.setDefaultImage(id, product_id);   
        if(entityDetail.length == 0){  
            req.flash('error', 'Invalid url')    
        }else{
            req.flash('success', 'Record updated succesfully.');       
        }   
    }else{ 
        req.flash('error', 'Invalid url.');  
    }    
    return res.redirect(backURL); 
};          
exports.setDefaultImage = setDefaultImage; 
   
