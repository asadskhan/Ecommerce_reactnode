var Request = require("request");      
var Categories = require.main.require('./models/Categories');   
const controller = 'Categories'; 
  
/** 
 *  list
 *  Purpose: This function is used to show listing of all arecord
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json   
*/
async function list(req, res) { 
    res.set('content-type' , 'text/html; charset=mycharset'); 
    data = {};    
    action = 'list'; 
    const categoryList = await Categories.getAllParentData();
    if(categoryList){
        for (const item of categoryList) {
            if(item.image != ''){
                item.default_image = nodeSiteUrl+'/upload/category_image/'+item.image;
            }else{
                item.default_image = noImageProduct;
            }

            const subListsData = await Categories.getAllChildData(item.id);
            if(subListsData){
                item.subcategory = subListsData;
            }else{
                item.subcategory = {};
            }
        }
    }
    
    res.render('admin/Categories/list',{page_title:" List",data:categoryList,controller:controller,action:action});    
};       
exports.list = list;

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
    var categoryDetail = {}; 
    var errorData = {};
    parentCategoryList =  await Categories.getAllParentData();
    if(req.params.id){
        var cat_id =  String("'"+req.params.id+"'");   
        categoryDetail = await Categories.getRecordByid(cat_id); 
        if(categoryDetail.length == 0){ 
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/Categories/list'); 
        }   
        if (req.method == "POST") { 
            var input = JSON.parse(JSON.stringify(req.body)); 
            console.log(input);
            req.checkBody('title', 'Title is required').notEmpty();
            req.checkBody('slug', 'URL is required').notEmpty();
            req.checkBody('is_active', 'Status is required').notEmpty(); 
            var errors = req.validationErrors();    
            if(errors){	  
                if(errors.length > 0){
                    errors.forEach(function (errors1) {
                        var field1 = String(errors1.param); 
                        var msg = errors1.msg; 
                        errorData[field1] = msg;   
                        categoryDetail[0].field1 = req.field1;
                    }); 
                } 
                   
            }else{  
                var saveResult = ''; 

                if (req.files && req.files.image !== "undefined") { 

                    let image = req.files.image;
                    filename = image.name;   
                    image.mv('public/upload/category_image/'+filename, function(err) { 
                        if (err){    
                            // console.log(err);    
                            req.flash('error', 'Could not upload image. Please try again!')  
                            res.locals.message = req.flash();
                            return res.redirect(nodeAdminUrl+'/Categories/edit/'+req.params.id);
                        } 
                    });

                    var saveData = {  
                        title    : input.title,
                        text    : input.text,
                        slug    : input.slug,
                        parent_id    : input.parent_id,
                        sort_order: input.sort_order,
                        is_collection : (input.is_collection === undefined)?'0':'1',
                        is_active : input.is_active,
                        image : filename,
                    };
                }else{

                    var saveData = {  
                        title    : input.title,
                        parent_id: input.parent_id,
                        text     : input.text,
                        slug     : input.slug,
                        sort_order: input.sort_order,
                        is_collection : (input.is_collection === undefined)?'0':'1',
                        is_active : input.is_active,     
                    };
                }

                
                var checkDuplicate = await Categories.checkRecordDuplication(saveData.title,req.params.id);
                if(checkDuplicate.length > 0){
                    var msg =  'Category already added.'; 
                    req.flash('error', msg)   
                    res.locals.message = req.flash();
                    res.set('content-type' , 'text/html; charset=mycharset');  
                    return res.redirect(nodeAdminUrl+'/Categories/edit/'+req.params.id);     

                }else{

                    //console.log(saveData); return true;
                    saveData.id = req.params.id;  
                    var msg =  'Categories updated successfully.'; 
                    var saveResult = await Categories.updateData(saveData);  
                        
                    req.flash('success', msg)   
                    res.locals.message = req.flash(); 
                    if(saveResult){  
                        res.set('content-type' , 'text/html; charset=mycharset');  
                        return res.redirect(nodeAdminUrl+'/Categories/list');     
                    } 
                }    
            } 
        } 
    }else{ 
        req.flash('error', 'Invalid url.');  
        return res.redirect(nodeAdminUrl+'/Categories/list');     
    } 
    res.render('admin/Categories/edit',{page_title:" Edit",data:categoryDetail, categories:parentCategoryList, errorData:errorData,controller:controller,action:action});    
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
    var categoryDetail = {};  
    var action = 'add'; 
    var errorData = {}; 
    parentCategoryList =  await Categories.getAllParentData();
    // console.log(req);   
    if (req.method == "POST") { 
        var input = JSON.parse(JSON.stringify(req.body));

        req.checkBody('title', 'Title is required').notEmpty();
        req.checkBody('slug', 'URL is required').notEmpty();
        req.checkBody('is_active', 'Status is required').notEmpty();
        var errors = req.validationErrors();    
        if(errors){	  
            if(errors.length > 0){
                errors.forEach(function (errors1) {
                    var field1 = String(errors1.param); 
                    var msg = errors1.msg; 
                    errorData[field1] = msg;   
                    data.field1 = req.field1; 
                }); 
            }    
        }else{ 

            if (req.files && req.files.image !== "undefined") { 

                let image = req.files.image; 

                filename = image.name;   
                image.mv('public/upload/category_image/'+filename, function(err) { 
                    if (err){    
                        console.log(err);    
                        req.flash('error', 'Could not upload image. Please try again!')  
                        res.locals.message = req.flash();
                        return res.redirect(nodeAdminUrl+'/Category/add');
                    } 
                });
                
                var saveData = {
                    title    : input.title,
                    parent_id    : input.parent_id,
                    text    : input.text,
                    sort_order: input.sort_order,
                    is_collection : (input.is_collection === undefined)?'0':'1',
                    slug    : input.slug,
                    is_active : input.is_active,
                    image : filename,
                };
            }else{

                var saveData = {  
                    title    : input.title,
                    parent_id    : input.parent_id,
                    text    : input.text,
                    sort_order: input.sort_order,
                    is_collection : (input.is_collection === undefined)?'0':'1',
                    slug    : input.slug,
                    is_active : input.is_active,
                };
            }

            
            var checkDuplicate = await Categories.checkRecordDuplication(saveData.title);
            if(checkDuplicate.length > 0){

                var msg =  'Category already added.'; 
                req.flash('error', msg)   
                res.locals.message = req.flash();
                res.set('content-type' , 'text/html; charset=mycharset');  
                return res.redirect(nodeAdminUrl+'/Categories/add');     
                 

            }else{
 
                var saveResult = await Categories.saveData(saveData);
                var msg =  'Categories added successfully.'; 
                req.flash('success', msg)   
                res.locals.message = req.flash();  
                if(saveResult){  
                    res.set('content-type' , 'text/html; charset=mycharset');  
                    return res.redirect(nodeAdminUrl+'/Categories/list');     
                } 
            }    
        } 
    }  
    res.render('admin/Categories/add',{page_title:page_title,data:data, categories:parentCategoryList, errorData:errorData,controller:controller,action:action});    
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
        categoryDetail = await Categories.deleteRecord(cat_id);  
        if(categoryDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/Categories/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/Categories/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/Categories/list');      
    }    
};          
exports.deleteRecord = deleteRecord; 

/** 
 *  getSubcat
 *  Purpose: This function is used to get constructor getSubcat
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json  
*/
exports.getSubcat = function (req, res) {
    
    if(req.params.catId){
        var cat_id =  String("'"+req.params.catId+"'");  
        connectPool.query('SELECT * FROM `categories` where `parent_id` = '+cat_id, function (error, results) {
            if(error){
                console.log(error);
            }else{
                return res.send({
                    "status": 200, 
                    "message": 'Subcat List', 
                    "data": results,
                }); 
            }
        });  
    }
}; 
