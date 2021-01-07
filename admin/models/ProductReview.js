const table = 'product_review';
 

/** 
 *  getAllData
 *  Purpose: This function is used to getAllData
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void 
*/
async function getAllData() {	  
	try {   
			var sql='select * from '+table+' ORDER BY id DESC';    
			return new Promise((resolve,reject)=>{
				connectPool.query(sql, (err, result) => {
					if (err) { 
						reject(err)
					} else {  
						resolve(result)
					}
				})
			}).catch(function(e){
				return e; 
		});
		 
	}finally {
	 
	} 
}
/** 
 *  getAllData
 *  Purpose: This function is used to getAllData
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void 
*/
async function getByProductId(product_id) {	  
	try {   
			var sql='select * from '+table+' where product_id ='+product_id+' ORDER BY `created_at` DESC ';
			// console.log(sql);    
			return new Promise((resolve,reject)=>{
				connectPool.query(sql, (err, result) => {
					if (err) { 
						reject(err)
					} else {  
						resolve(result)
					}
				})
			}).catch(function(e){
				return e; 
		});
		 
	}finally {
	 
	} 
}

/** 
 *  getAverageRatting
 *  Purpose: This function is used to getAverageRatting
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void 
*/
async function getAverageRatting(product_id) {	  
	try {   
			var sql='select avg(ratting) as avgratting from '+table+' where product_id ='+product_id+' ORDER BY `created_at` DESC ';
			return new Promise((resolve,reject)=>{
				connectPool.query(sql, (err, result) => {
					if (err) { 
						reject(err)
					} else {  
						resolve(result)
					}
				})
			}).catch(function(e){
				return e; 
		});
		 
	}finally {
	 
	} 
}

/** 
 *  getAverageRatting
 *  Purpose: This function is used to getAverageRatting
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void 
*/
async function getTotalRatting(product_id) {	  
	try {   
			var sql='select count(*) as total from '+table+' where product_id ='+product_id+' ORDER BY `created_at` DESC ';
			return new Promise((resolve,reject)=>{
				connectPool.query(sql, (err, result) => {
					if (err) { 
						reject(err)
					} else {  
						resolve(result)
					}
				})
			}).catch(function(e){
				return e; 
		});
		 
	}finally {
	 
	} 
}

function saveDataCallback(data,callback)
{	
	 console.log(data);
	var sql='INSERT INTO product_review set ? ';    
	connectPool.query(sql,data,function(error,result){
		if (error) { 
			console.log(error);
			callback(false); 
		}  
		else 
		{	
			console.log('Sql: '+sql+' Result : '+result);
			/*if(result.length==0 || result==null){
				callback(false);
			}else{
				callback(result);
			} */
			callback(result);
		} 
	});  
}


/** 
 *  deleteRecord
 *  Purpose: This function is used to deleteRecord
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void 
*/
async function deleteRecord(id) {	  
	try { 
		if(id){ 
			var sql='delete  from '+table+' where id = '+ id;   
			return new Promise((resolve,reject)=>{
				connectPool.query(sql, (err, result) => {
					if (err) { 
						reject(err)
					} else { 
						resolve(result)
					}
				})
			})
		}else{
			return null;
		}
	} finally {
	 
	} 
} 

/** 
 *  saveData
 *  Purpose: This function is used to saveData
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json 
*/
async function saveData(data) { 
	try { 
		if(data){   
			var sql='INSERT INTO '+table+' set ? ';
			return new Promise((resolve,reject)=>{
				connectPool.query(sql,data, (err, result) => {
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
	} finally {
		//if (connectPool && connectPool.end) connectPool.end();
	}  
}

module.exports={
	getByProductId,
	saveData,  
	getAllData,
	deleteRecord,  
	saveDataCallback,
	getAverageRatting,
	getTotalRatting
};