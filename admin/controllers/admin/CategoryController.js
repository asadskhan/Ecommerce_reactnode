var Request = require("request");      
var Category = require.main.require('./models/Category');   
const controller = 'Category'; 
  
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
    console.log(action);
    const categoryList = await Category.getAllData();
    res.render('admin/Category/list',{page_title:" List",data:categoryList,controller:controller,action:action});    
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
     
    if(req.params.id){
        var cat_id =  String("'"+req.params.id+"'");   
        categoryDetail = await Category.getRecordByid(cat_id); 
        if(categoryDetail.length == 0){ 
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/Category/list'); 
        }   
        if (req.method == "POST") { 
            var input = JSON.parse(JSON.stringify(req.body)); 
            console.log(input);
            req.checkBody('category_name', 'Category Name is required').notEmpty();
            req.checkBody('status', 'Status is required').notEmpty(); 
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
                var saveData = {  
                    category_name : input.category_name,      
                    status : input.status,      
                }; 
                var checkDuplicate = await Category.checkRecordDuplication(saveData.category_name,req.params.id);
                if(checkDuplicate.length > 0){
                    var msg =  'Category already added.'; 
                    req.flash('error', msg)   
                    res.locals.message = req.flash();
                    res.set('content-type' , 'text/html; charset=mycharset');  
                    return res.redirect(nodeAdminUrl+'/Category/edit/'+req.params.id);     

                }else{

                    //console.log(saveData); return true;
                    saveData.id = req.params.id;  
                    var msg =  'Category updated successfully.'; 
                    var saveResult = await Category.updateData(saveData);  
                        
                    req.flash('success', msg)   
                    res.locals.message = req.flash(); 
                    if(saveResult){  
                        res.set('content-type' , 'text/html; charset=mycharset');  
                        return res.redirect(nodeAdminUrl+'/Category/list');     
                    } 
                }    
            } 
        } 
    }else{ 
        req.flash('error', 'Invalid url.');  
        return res.redirect(nodeAdminUrl+'/Category/list');     
    } 
    res.render('admin/Category/edit',{page_title:" Edit",data:categoryDetail, errorData:errorData,controller:controller,action:action});    
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

    if (req.method == "POST") { 
        var input = JSON.parse(JSON.stringify(req.body));  
        req.checkBody('category_name', 'Category Name is required').notEmpty();
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

            var saveData = {  
                category_name    : input.category_name,      
                status : input.status,      
            };  
            
            var checkDuplicate = await Category.checkRecordDuplication(saveData.category_name);
            if(checkDuplicate.length > 0){

                var msg =  'Category already added.'; 
                req.flash('error', msg)   
                res.locals.message = req.flash();
                res.set('content-type' , 'text/html; charset=mycharset');  
                return res.redirect(nodeAdminUrl+'/Category/add');     
                 

            }else{
 
                var saveResult = await Category.saveData(saveData);
                var msg =  'Category added successfully.'; 
                req.flash('success', msg)   
                res.locals.message = req.flash();  
                if(saveResult){  
                    res.set('content-type' , 'text/html; charset=mycharset');  
                    return res.redirect(nodeAdminUrl+'/Category/list');     
                } 
            }    
        } 
    }  
    res.render('admin/Category/add',{page_title:page_title,data:data, errorData:errorData,controller:controller,action:action});    
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
        categoryDetail = await Category.deleteRecord(cat_id);  
        if(categoryDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/Category/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/Category/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/Category/list');      
    }    
};          
exports.deleteRecord = deleteRecord; 
   
