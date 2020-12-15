var Request = require("request");      
var Category = require.main.require('./models/Category');
var Brand = require.main.require('./models/Brand');
var Color = require.main.require('./models/Color');
var BlogImages = require.main.require('./models/BlogImages');   
var Blog = require.main.require('./models/Blog');   
const controller = 'Blog'; 
const module_name = 'Blog';  
  
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
    const allRecord = await Blog.getAllData();  
    
     

    // console.log(allRecord);
    if(allRecord){ 
        //allRecord.forEach(function (item, key) {
        for (const item of allRecord) { 
            productImage = await BlogImages.getDefaultImage(item.id);
            CategoryName = await Category.getRecordByid(item.category_id);
            
            if(CategoryName.length > 0){ 
                item.category_title = CategoryName[0].category_name;
            }else{
                item.category_title = '-'; 
            }
            if(productImage.length > 0){ 
                item.default_image = nodeSiteUrl+'/upload/blog_image/'+productImage[0].image; 
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
            var allProducts = await SQBlog.findAll({ 
                offset:offset, 
                limit:pageLimit, 
                where : [WHERECONDITION], 
                include: [SQBlogImages,SQCategory]}).then(function(result){  
                return result;
            });  
            var countAllProducts = await SQBlog.findAll({ where : [WHERECONDITION]}).then(function(countProduct){ 
                return countProduct;
            });    
            if(countAllProducts){   
                    if(allProducts){ 
                        allBlog.forEach(function (item, key) { 
                            if(item.blog_image.length > 0){
                                imageArray = item.blog_image;
                                imageArray.forEach(function (item1, key1) { 
                                    item1.image = nodeSiteUrl+'/upload/blog_image/'+item1.image; 
                                })
                            }  
                        });    
                    } 
                var total_record = countAllBlog.length;
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
    
    const allRecord = await BlogImages.getByProductId(id);  

    var imageArra = [];
    if (req.method == "POST") { 
        var input = JSON.parse(JSON.stringify(req.body)); 
        if (req.files && req.files.images !== "undefined") { 

            let images = req.files.images; 
            var timestamp = new Date().getTime();     
            if(images && images.length > 0){    
                
                
                images.forEach(function (item, key) {  
                    filename =  item.name;    
                    item.mv('public/upload/blog_image/'+item.name, function(err) {
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
                                blog_id    : req.params.id,    
                                image :   item.name, 
                                default_image :  default_image      
                            };  
                            console.log(imagedata); 
                            imageArra.push(imagedata); 
                             
                            BlogImages.saveDataCallback(imagedata,function(result){ 
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

                default_image = 1;
                if(allRecord.length > 0){
                    default_image = 0;
                }

                filename = images.name;   
                images.mv('public/upload/blog_image/'+filename, function(err) { 
                    if (err){    
                        console.log(err);    
                        req.flash('error', 'Could not upload image. Please try again!')  
                        res.locals.message = req.flash();   
                        //return res.redirect(nodeAdminUrl+'/'+controller+'/images'); 
                        return res.redirect(backURL); 
                    }else{
                         
                        var imagedata = {  
                            blog_id    : req.params.id,    
                            image :   filename,
                            default_image :  default_image
                        };   
                        imageArra.push(imagedata); 
                        // console.log(imagedata);
                        BlogImages.saveDataCallback(imagedata,function(result){ 
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

    
    res.render('admin/Blog/images',{
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
     
    if(req.params.id){
        var id =  String("'"+req.params.id+"'");   
        entityDetail = await Blog.getUserByid(id);
        console.log(entityDetail);   
        if(entityDetail.length == 0){ 
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/'+controller+'/list');  
        }  
        categoryList =  await Category.getAllData();
         
        if (req.method == "POST") { 
            var input = JSON.parse(JSON.stringify(req.body));   
            req.checkBody('title', 'Title is required').notEmpty();
            req.checkBody('category_id', 'Category is required').notEmpty();
            req.checkBody('description', 'Description is required').notEmpty();
            req.checkBody('short_description', 'Short Description is required').notEmpty();

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
                var checkDuplicate = await Blog.checkRecordDuplication(input.slug,input.id);
                if(checkDuplicate.length > 0){
                    var msg =  controller+' already added.'; 
                    req.flash('error', msg)   
                    res.locals.message = req.flash();
                    res.set('content-type' , 'text/html; charset=mycharset');  
                    return res.redirect(nodeAdminUrl+'/'+controller+'/edit/'+input.id);     

                }else{

                    var saveResult = '';    
                    var msg =  controller+' updated successfully.';
                    
                    input.updated_at = datetime;
                    var saveResult = await Blog.updateUserData(input);  
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
        categories : categoryList
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
    categoryList =  await Category.getAllData();
     

    if (req.method == "POST") { 
        var input = JSON.parse(JSON.stringify(req.body));  
        req.checkBody('title', 'Title is required').notEmpty();
        req.checkBody('category_id', 'Category is required').notEmpty();
        req.checkBody('description', 'Description is required').notEmpty();
        req.checkBody('short_description', 'Short Description is required').notEmpty();
            
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
             
            var checkDuplicate = await Blog.checkRecordDuplication(input.slug);
            if(checkDuplicate.length > 0){

                var msg =  'Blog already added.'; 
                req.flash('error', msg)   
                res.locals.message = req.flash();
                res.set('content-type' , 'text/html; charset=mycharset');  
                return res.redirect(nodeAdminUrl+'/Blog/add');     
                 

            }else{
                input.created_at = datetime;
                var saveResult = await Blog.saveData(input);
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
        categories : categoryList
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
        categoryDetail = await Blog.deleteRecord(cat_id);  
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
        entityDetail = await BlogImages.deleteRecord(id);   
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
        var blog_id =  String("'"+req.params.blog_id+"'");      
        //entityDetail = await BlogImages.resetDefaultImage(blog_id);   
        entityDetail = await BlogImages.setDefaultImage(id, blog_id);   
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
   
