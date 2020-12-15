// var sync = require('synchronize');
const table = 'blogs';

/** 
 *  checkRecordDuplication
 *  Purpose: This function is used to checkRecordDuplication
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void 
*/
async function checkRecordDuplication(name,id=null) {	  
	try { 
		if(name){
			if(id){
				var sql='select * from '+table+' WHERE `id` != '+ id + ' AND `slug` = "'+ name + '" ';
			}else{
				var sql='select * from '+table+' WHERE `slug` = "'+ name + '" ';
			} 
			console.log(sql);
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
 *  getAllData
 *  Purpose: This function is used to getAllData
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void 
*/
async function getAllData($limit = null) {	  
	try {   
			var sql='select * from '+table+' where id != 0 ORDER BY id DESC';   
			if($limit){
				sql += ' LIMIT '+$limit;
			} 

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


 
 

async function getUserByid(user_id) {	  
	try { 
		if(user_id){ 

			var sql='select * from '+table+' where id = '+ user_id+' LIMIT 1';    
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
		//if (connectPool && connectPool.end) connectPool.end();
	} 
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
 *  updateData
 *  Purpose: This function is used to updateData
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json 
*/
async function updateUserData(data) {	  
	
	try { 
		if(data){  

			var sql = "UPDATE "+table+" set ? WHERE id = ?";   
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
	saveData,
	checkRecordDuplication,
	getUserByid,  
	updateUserData, 
	getAllData,
	deleteRecord,
}; 
