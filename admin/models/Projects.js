//var sync = require('synchronize');
module.exports={
	getProjects:function(data,callback)
	{	
		try{

		let LIMIT = '';
		var sql='select `products`.* from `products` WHERE `products`.`is_active` = 1 ';
		
		// console.log(data.sort);
		var brand = data.brand.map(Number);
		var category = data.category.map(Number);

		
		var brandArr = brand.map( function(el) { return el; });
		if(brandArr.length > 0){
			sql += " AND `brand` IN ("+ brandArr +") ";
		} 
		
		var categoryArr = category.map( function(el) { return el; });
		 
		var countcatlast = categoryArr.length;
		if(countcatlast > 0){

			--countcatlast;
			sql += " AND ( "; 
			category.map(function(el,index) { 				 
            	sql += " FIND_IN_SET ('"+el+"', sub_category_id)" + ((countcatlast1=index) ? " ) ": " OR ");
        	});
		}
	 	
	 	var color = data.color;
		if(color){
			sql += " AND FIND_IN_SET ( '"+color+"', color ) ";
		} 

		var minprice = data.minprice;
		var maxprice = data.maxprice;
		if(minprice !='' && maxprice !=''){
			sql += " AND ( price  <= '"+maxprice+"' AND price  >= '"+minprice+"' ) ";
		} 

		if(data.sort=='alphaasc'){
			sql +=  ' ORDER BY `title` ASC ';
		}else if(data.sort=='alphadesc'){
			sql +=  ' ORDER BY `title` DESC ';
		}else if(data.sort=='priceasc'){
			sql +=  ' ORDER BY `price` ASC ';
		}else if(data.sort=='pricedesc'){
			sql +=  ' ORDER BY `price` DESC ';
		}else if(data.sort=='featured'){
			sql +=  ' ORDER BY `is_featured` DESC ';
		}else if(data.sort=='newest'){
			sql +=  ' ORDER BY `id` DESC ';
		}
		if(data.limit){
			sql +=  ' LIMIT '+data.limit;
		}
		if(data.offset){
			LIMIT =  ' OFFSET '+data.offset;  
			sql += LIMIT;  
		}
		var param=[];
		
		console.log(sql);

		return new Promise((resolve,reject)=>{
			connectPool.query(sql,param, (err, result) => {
				if (err) { 
					reject(err)
				} else { 
					resolve(result)
				}
			})
		})

	}catch (error) { 
			console.log(error);   
		}   
	}, 
	getProjectDetail:function(data,callback)
	{	 
		var sql='select * from `products` where id = ?';
		if(data.join !=- 'undefined' && data.join != null){
			if(data.join == 'customer'){
				sql='select `products`.*,  users.first_name,users.last_name,users.email from `products` LEFT JOIN users ON (users.id = `products`.user_id)  where `products`.id = ? ';   
			}else if('contractor'){
				sql='select `products`.*,  users.first_name,users.last_name,users.email from `products` LEFT JOIN users ON (users.id = `products`.contractor_id)  where `products`.id = ? ';  
			}   
		}   
		   
		var param=[data.id];  
		connectPool.query(sql,param,function(error,result){
			if (error) {
				console.log(error);
				callback(false);
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
	getProjectCount:function(data,callback)
	{	
		 
		var sql='select count(id) as count from `products` where `is_active` = 1 ';
		// var param=[data.user_id];  

		return new Promise((resolve,reject)=>{
			connectPool.query(sql, (err, result) => {
				if (err) { 
					reject(err)
				} else { 
					resolve(result)
				}
			})
		})  
	},
	getProjectMinMax:function(data,callback)
	{	
		 
		var sql='SELECT ROUND(MAX(price)) as MaxPrice, ROUND(MIN(price)) as MinPrice FROM `products` where `is_active` = 1 ';
		// var param=[data.user_id];  

		return new Promise((resolve,reject)=>{
			connectPool.query(sql, (err, result) => {
				if (err) { 
					reject(err)
				} else { 
					resolve(result)
				}
			})
		})  
	},
	updateById,
	getProjectById
}; 


/** 
 *  updateData
 *  Purpose: This function is used to updateData
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json 
*/
async function updateById(data) {	   
	try { 
		if(data){   
			var sql = "UPDATE `products` set ? WHERE id = ?";   
			return new Promise((resolve,reject)=>{
				connectPool.query(sql,[data, data.id], (err, result) => {
					if (err) {  
						console.log(data);
						reject(err)
					} else {  
						resolve(result)
					}
				})
			}) 
		}else{
			return null;
		}
	} catch (err) {
        return err;  
    } finally {
		//if (connectPool && connectPool.end) connectPool.end();
	}   
} 

/** 
 *  updateData
 *  Purpose: This function is used to updateData
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json 
*/
async function getProjectById(project_id) {	   
	try { 
		if(project_id){    
			var sql='select * from `products` where id = ?';
			return new Promise((resolve,reject)=>{
				connectPool.query(sql,project_id, (err, result) => { 
					if (err) {  
						console.log(data);
						reject(err)
					} else {   
						resolve(result)
					}
				})
			}) 
		}else{
			return null;
		}
	} catch (err) {
        return err;  
    } finally {
		//if (connectPool && connectPool.end) connectPool.end();
	}   
} 