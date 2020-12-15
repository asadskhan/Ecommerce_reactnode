var Request = require("request");      
var Color = require.main.require('./models/Color');   
const controller = 'Color'; 
  
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
    const ColorList = await Color.getAllData(); 
    // console.log(ColorList); console.log("hello");  
    res.render('admin/Color/list',{page_title:" List",data:ColorList,controller:controller,action:action});    
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
    var ColorDetail = {}; 
    var errorData = {};
    if(req.params.id){
        var cat_id =  String("'"+req.params.id+"'");   
        ColorDetail = await Color.getRecordByid(cat_id); 
        if(ColorDetail.length == 0){ 
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/Color/list'); 
        }   
        if (req.method == "POST") { 
            var input = JSON.parse(JSON.stringify(req.body)); 
            console.log(input);
            req.checkBody('title', 'Color is required').notEmpty();
            req.checkBody('color_code', 'Code is required').notEmpty(); 
            var errors = req.validationErrors();    
            if(errors){	  
                if(errors.length > 0){
                    errors.forEach(function (errors1) {
                        var field1 = String(errors1.param); 
                        var msg = errors1.msg; 
                        errorData[field1] = msg;   
                        ColorDetail[0].field1 = req.field1;
                    }); 
                } 
                   
            }else{  
                var saveResult = ''; 
                var saveData = {  
                    title    : input.title,
                    color_code    : input.color_code,
                    is_active : input.is_active,
                }; 
                var checkDuplicate = await Color.checkRecordDuplication(saveData.title,req.params.id);
                if(checkDuplicate.length > 0){
                    var msg =  'Color already added.'; 
                    req.flash('error', msg)   
                    res.locals.message = req.flash();
                    res.set('content-type' , 'text/html; charset=mycharset');  
                    return res.redirect(nodeAdminUrl+'/Color/edit/'+req.params.id);     

                }else{

                    //console.log(saveData); return true;
                    saveData.id = req.params.id;  
                    var msg =  'Color updated successfully.'; 
                    var saveResult = await Color.updateData(saveData);  
                     
                    req.flash('success', msg)   
                    res.locals.message = req.flash(); 
                    if(saveResult){  
                        res.set('content-type' , 'text/html; charset=mycharset');  
                        return res.redirect(nodeAdminUrl+'/Color/list');     
                    } 
                }    
            } 
        } 
    }else{ 
        req.flash('error', 'Invalid url.');  
        return res.redirect(nodeAdminUrl+'/Color/list');     
    } 
    res.render('admin/Color/edit',{page_title:" Edit",data:ColorDetail,errorData:errorData,controller:controller,action:action});    
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
    var ColorDetail = {};  
    var action = 'add'; 
    var errorData = {}; 
    // console.log(req);   
    if (req.method == "POST") { 
        var input = JSON.parse(JSON.stringify(req.body));  
        req.checkBody('title', 'Color is required').notEmpty();
        req.checkBody('color_code', 'Code is required').notEmpty(); 
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
                color_code    : input.color_code,
                is_active : input.is_active,
            };  
            
            var checkDuplicate = await Color.checkRecordDuplication(saveData.title);
            if(checkDuplicate.length > 0){

                var msg =  'Color already added.'; 
                req.flash('error', msg)   
                res.locals.message = req.flash();
                res.set('content-type' , 'text/html; charset=mycharset');  
                return res.redirect(nodeAdminUrl+'/Color/add');     
                 

            }else{
 
                var saveResult = await Color.saveData(saveData);
                var msg =  'Color added successfully.'; 
                req.flash('success', msg)   
                res.locals.message = req.flash();  
                if(saveResult){  
                    res.set('content-type' , 'text/html; charset=mycharset');  
                    return res.redirect(nodeAdminUrl+'/Color/list');     
                } 
            }    
        } 
    }  
    res.render('admin/Color/add',{page_title:page_title,data:data, errorData:errorData,controller:controller,action:action});    
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
   
    var ColorDetail = {}; 
    if(req.params.id){
        var cat_id =  String("'"+req.params.id+"'");    
        ColorDetail = await Color.deleteRecord(cat_id);  
        if(ColorDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/Color/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/Color/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/Color/list');      
    }    
};          
exports.deleteRecord = deleteRecord; 
   
