//var sync = require('synchronize');
async function getSliders()
{	 
	  
	try {
		var sql='SELECT * FROM `slider` ORDER BY `slider`.`sort_order` ASC ';   
		return new Promise((resolve,reject)=>{
			connectPool.query(sql, (err, resp) => {
				if (err) { 
					reject(err)
				} else { 
					resolve(resp)
				}
			}) 
		})
	} finally {
      //if (connectPool && connectPool.end) connectPool.end();
    } 
} 

async function getBlogs($limit = null)
{	 
	  
	try {
		var sql='SELECT * FROM `blogs` ORDER BY `blogs`.`id` ASC ';   
		if($limit){
			sql += ' LIMIT '+$limit;
		}
		return new Promise((resolve,reject)=>{
			connectPool.query(sql, (err, resp) => {
				if (err) { 
					reject(err)
				} else { 
					resolve(resp)
				}
			}) 
		})
	} finally {
      //if (connectPool && connectPool.end) connectPool.end();
    } 
} 
module.exports={
	getSliders,
	getBlogs,
	getUserDetail:function(data,callback)
	{	 
		var sql='select * from users LEFT JOIN bussiness_profile ON (bussiness_profile.user_id = users.id) where users.id = ?';  
		var param=[data.id];     
		connectPool.query(sql,param,function(error,result){
			if (error) {
				console.log(error);
				callback(null);
			}   
			else
			{	 
				if(result.length==0 || result==null){
					callback(false);
				}else{
					callback(result);
				} 
				//callback(result);
			} 
		});  
	},   
	getUserByEmail:function(email,callback)
	{	 
		var sql='select * from users where email = ?';     
		connectPool.query(sql,email,function(error,result){ 
			if (error) {
				callback(null);
			}  
			else
			{	 
				if(result.length==0 || result==null){
					callback(false);
				}else{
					callback(result);
				}  
			} 
		});  
	},   
	getCustomerList:function(data,callback)
	{	 
		var sql='select * from users where is_deleted = 0 AND is_active = 1 AND role_id = 1';     
		connectPool.query(sql,function(error,result){
			if (error) {
				console.log(error); 
				callback(null);
			}  
			else
			{	 
				if(result.length==0 || result==null){
					callback(false);
				}else{
					callback(result);
				}  
			} 
		});  
	}, 
	updateData:function(data,callback)
	{	 
		var sql = "UPDATE users set ? WHERE email = ?";     
		connectPool.query(sql,[data, data.email], function(error,result){ 
			if (error) { 
				console.log(error);   
				callback(null);
			}  
			else 
			{	
				if(result.length==0 || result==null){
					callback(false);
				}else{
					result.id = data.id;  
					callback(result);
				}  
			} 
		});  
	},
	updateDataById:function(data,callback)
	{	 
		var sql = "UPDATE users set ? WHERE id = ?";     
		connectPool.query(sql,[data, data.id], function(error,result){ 
			if (error) {   
				console.log(error);
				callback(null);
			}  
			else 
			{	
				if(result.length==0 || result==null){
					callback(false);
				}else{
					result.id = data.id;  
					callback(result);
				}  
			} 
		});  
	},
	checkEmailExist:function(data,callback)
	{	 
		var sql='select count(id) as count from users where email = ?';     
		var param=[data.email];    
		connectPool.query(sql,param,function(error,result){ 
			if (error) { 
				console.log(error); 
				callback(null); 
			}  
			else
			{	 
				if(result.length==0 || result==null){
					callback(false);
				}else{ 
					callback(result);
				}  
			}  
		});  
	}
}; 
