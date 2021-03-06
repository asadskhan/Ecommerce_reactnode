var Request = require("request");      
var Brand = require.main.require('./models/Brand');   
const controller = 'Brand'; 
  
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
    const BrandList = await Brand.getAllData(); 
    // console.log(BrandList); console.log("hello");  
    res.render('admin/Brand/list',{page_title:" List",data:BrandList,controller:controller,action:action});    
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
    var BrandDetail = {}; 
    var errorData = {};
    if(req.params.id){
        var cat_id =  String("'"+req.params.id+"'");   
        BrandDetail = await Brand.getRecordByid(cat_id); 
        if(BrandDetail.length == 0){ 
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/Brand/list'); 
        }   
        if (req.method == "POST") { 
            var input = JSON.parse(JSON.stringify(req.body)); 
            console.log(input);
            req.checkBody('title', 'Title is required').notEmpty();
            req.checkBody('is_active', 'Password is required').notEmpty(); 
            var errors = req.validationErrors();    
            if(errors){	  
                if(errors.length > 0){
                    errors.forEach(function (errors1) {
                        var field1 = String(errors1.param); 
                        var msg = errors1.msg; 
                        errorData[field1] = msg;   
                        BrandDetail[0].field1 = req.field1;
                    }); 
                } 
                   
            }else{  
                var saveResult = ''; 
                var saveData = {  
                    title    : input.title,      
                    is_active : input.is_active,      
                }; 
                var checkDuplicate = await Brand.checkRecordDuplication(saveData.title,req.params.id);
                if(checkDuplicate.length > 0){
                    var msg =  'Brand already added.'; 
                    req.flash('error', msg)   
                    res.locals.message = req.flash();
                    res.set('content-type' , 'text/html; charset=mycharset');  
                    return res.redirect(nodeAdminUrl+'/Brand/edit/'+req.params.id);     

                }else{

                    //console.log(saveData); return true;
                    saveData.id = req.params.id;  
                    var msg =  'Brand updated successfully.'; 
                    var saveResult = await Brand.updateData(saveData);  
                     
                    req.flash('success', msg)   
                    res.locals.message = req.flash(); 
                    if(saveResult){  
                        res.set('content-type' , 'text/html; charset=mycharset');  
                        return res.redirect(nodeAdminUrl+'/Brand/list');     
                    } 
                }    
            } 
        } 
    }else{ 
        req.flash('error', 'Invalid url.');  
        return res.redirect(nodeAdminUrl+'/Brand/list');     
    } 
    res.render('admin/Brand/edit',{page_title:" Edit",data:BrandDetail,errorData:errorData,controller:controller,action:action});    
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
    var BrandDetail = {};  
    var action = 'add'; 
    var errorData = {}; 
    // console.log(req);   
    if (req.method == "POST") { 
        var input = JSON.parse(JSON.stringify(req.body));  
        req.checkBody('title', 'Title is required').notEmpty();
        req.checkBody('is_active', 'Password is required').notEmpty(); 
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
                title    : input.title,      
                is_active : input.is_active,      
            };  
            
            var checkDuplicate = await Brand.checkRecordDuplication(saveData.title);
            if(checkDuplicate.length > 0){

                var msg =  'Brand already added.'; 
                req.flash('error', msg)   
                res.locals.message = req.flash();
                res.set('content-type' , 'text/html; charset=mycharset');  
                return res.redirect(nodeAdminUrl+'/Brand/add');     
                 

            }else{
 
                var saveResult = await Brand.saveData(saveData);
                var msg =  'Brand added successfully.'; 
                req.flash('success', msg)   
                res.locals.message = req.flash();  
                if(saveResult){  
                    res.set('content-type' , 'text/html; charset=mycharset');  
                    return res.redirect(nodeAdminUrl+'/Brand/list');     
                } 
            }    
        } 
    }  
    res.render('admin/Brand/add',{page_title:page_title,data:data, errorData:errorData,controller:controller,action:action});    
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
   
    var BrandDetail = {}; 
    if(req.params.id){
        var cat_id =  String("'"+req.params.id+"'");    
        BrandDetail = await Brand.deleteRecord(cat_id);  
        if(BrandDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/Brand/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/Brand/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/Brand/list');      
    }    
};          
exports.deleteRecord = deleteRecord; 
   
