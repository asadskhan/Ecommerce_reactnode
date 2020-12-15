var Request = require("request");      
var Banner = require.main.require('./models/Banner');   
const controller = 'Banner'; 
  
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
     
    const BannerList = await Banner.getAllData();
    if(BannerList){
        for (const item of BannerList) { 
            if(item.image != ''){ 
                item.default_image = nodeSiteUrl+'/upload/banner_image/'+item.image; 
            }else{
                item.default_image = noImageProduct; 
            } 
        }
    }
    res.render('admin/Banner/list',{page_title:" List",data:BannerList,controller:controller,action:action});    
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
    var BannerDetail = {}; 
    var errorData = {};
    
    if(req.params.id){
        var cat_id =  String("'"+req.params.id+"'");   
        BannerDetail = await Banner.getRecordByid(cat_id); 
        if(BannerDetail.length == 0){ 
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/Banner/list'); 
        }   
        if (req.method == "POST") { 
            var input = JSON.parse(JSON.stringify(req.body)); 
            console.log(input);
            req.checkBody('title', 'Banner Title is required').notEmpty();
            req.checkBody('sort_order', 'Display Order is required').notEmpty();
            req.checkBody('title1', 'Banner Sub Title is required').notEmpty();
            req.checkBody('description', 'Description is required').notEmpty();
            req.checkBody('status', 'Status is required').notEmpty(); 
            var errors = req.validationErrors();    
            if(errors){	  
                if(errors.length > 0){
                    errors.forEach(function (errors1) {
                        var field1 = String(errors1.param); 
                        var msg = errors1.msg; 
                        errorData[field1] = msg;   
                        BannerDetail[0].field1 = req.field1;
                    }); 
                } 
                   
            }else{

                var saveResult = ''; 
                
                if (req.files && req.files.image !== "undefined") { 

                    let image = req.files.image;
                    filename = image.name;   
                    image.mv('public/upload/banner_image/'+filename, function(err) { 
                        if (err){    
                            // console.log(err);    
                            req.flash('error', 'Could not upload image. Please try again!')  
                            res.locals.message = req.flash();
                            return res.redirect(nodeAdminUrl+'/Banner/edit/'+req.params.id);
                        } 
                    });

                    var saveData = {  
                        title  :input.title,
                        title1  :input.title1,
                        description  :input.description,
                        image : filename,
                        status : input.status, 
                        sort_order : input.sort_order,
                        
                    };
                }else{

                    var saveData = {  
                        title  :input.title,
                        title1  :input.title1,
                        description  :input.description,
                        status : input.status,
                        sort_order : input.sort_order,      
                    };
                }
                 

                var checkDuplicate = await Banner.checkRecordDuplication(saveData.title,req.params.id);
                if(checkDuplicate.length > 0){
                    var msg =  'Banner already added.'; 
                    req.flash('error', msg)   
                    res.locals.message = req.flash();
                    res.set('content-type' , 'text/html; charset=mycharset');  
                    return res.redirect(nodeAdminUrl+'/Banner/edit/'+req.params.id);     

                }else{

                    //console.log(saveData); return true;
                    saveData.id = req.params.id;  
                    var msg =  'Banner updated successfully.'; 
                    var saveResult = await Banner.updateData(saveData);  
                        
                    req.flash('success', msg)   
                    res.locals.message = req.flash(); 
                    if(saveResult){  
                        res.set('content-type' , 'text/html; charset=mycharset');  
                        return res.redirect(nodeAdminUrl+'/Banner/list');     
                    } 
                }    
            } 
        } 
    }else{ 
        req.flash('error', 'Invalid url.');  
        return res.redirect(nodeAdminUrl+'/Banner/list');     
    } 
    res.render('admin/Banner/edit',{page_title:" Edit",data:BannerDetail, errorData:errorData,controller:controller,action:action});    
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
    var BannerDetail = {};  
    var action = 'add'; 
    var errorData = {};

    if (req.method == "POST") { 
        var input = JSON.parse(JSON.stringify(req.body));  
        req.checkBody('title', 'Banner Title is required').notEmpty();
        req.checkBody('sort_order', 'Display Order is required').notEmpty();
        req.checkBody('title1', 'Banner Sub Title is required').notEmpty();
        req.checkBody('description', 'Description is required').notEmpty();
        req.checkBody('status', 'Status is required').notEmpty(); 
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
                image.mv('public/upload/banner_image/'+filename, function(err) { 
                    if (err){    
                        console.log(err);    
                        req.flash('error', 'Could not upload image. Please try again!')  
                        res.locals.message = req.flash();
                        return res.redirect(nodeAdminUrl+'/Banner/add');
                    } 
                });
                
                var saveData = {  
                    title  :input.title,
                    title1  :input.title1,
                    description  :input.description,
                    image : filename,
                    status : input.status,      
                    sort_order : input.sort_order,
                };
            }else{

                var saveData = {  
                    title  :input.title,
                    title1  :input.title1,
                    description  :input.description,
                    status : input.status,
                    sort_order : input.sort_order,
                };
            }
            
            var checkDuplicate = await Banner.checkRecordDuplication(saveData.title);
            if(checkDuplicate.length > 0){

                var msg =  'Banner already added.'; 
                req.flash('error', msg)   
                res.locals.message = req.flash();
                res.set('content-type' , 'text/html; charset=mycharset');  
                return res.redirect(nodeAdminUrl+'/Banner/add');     
                 

            }else{
 
                var saveResult = await Banner.saveData(saveData);
                var msg =  'Banner added successfully.'; 
                req.flash('success', msg)   
                res.locals.message = req.flash();  
                if(saveResult){  
                    res.set('content-type' , 'text/html; charset=mycharset');  
                    return res.redirect(nodeAdminUrl+'/Banner/list');     
                } 
            }    
        } 
    }  
    res.render('admin/Banner/add',{page_title:page_title,data:data, errorData:errorData,controller:controller,action:action});    
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
   
    var BannerDetail = {}; 
    if(req.params.id){
        var cat_id =  String("'"+req.params.id+"'");    
        BannerDetail = await Banner.deleteRecord(cat_id);  
        if(BannerDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/Banner/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/Banner/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/Banner/list');      
    }    
};          
exports.deleteRecord = deleteRecord; 
   
