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
				var sql='select * from brand WHERE `id` != '+ id + ' AND `title` = "'+ name + '" ';
			}else{
				var sql='select * from `brand` WHERE `title` = "'+ name + '" ';
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
 *  getUserByid
 *  Purpose: This function is used to getUserByid
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void 
*/
async function getRecordByid(id) {	  
	try { 
		if(id){ 
			var sql='select * from brand where id = '+ id;   
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
			var sql='delete  from brand where id = '+ id;   
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
async function getAllData() {	  
	try {   
			var sql='select * from brand where is_deleted = 0';    
			return new Promise((resolve,reject)=>{
				connectPool.query(sql, (err, result) => {
					if (err) { 
						reject(err)
					} else { 
						resolve(result)
					}
				})
			})
		 
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
			var sql='INSERT INTO brand set ? ';
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
/** 
 *  updateData
 *  Purpose: This function is used to updateData
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json 
*/
async function updateData(data) {	  
	
	try { 
		if(data){   
			var sql = "UPDATE brand set ? WHERE id = ?";   
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
 *  updateOverallRating
 *  Purpose: This function is used to updateOverallRating
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json 
*/
async function getOverallRating(data) {	   
	
	try { 
		if(data){   
			var sql = "select AVG(rating) as rating from reviews WHERE user_id = ?";   
			return new Promise((resolve,reject)=>{
				connectPool.query(sql, data, (err, result) => {
					if (err) { 
						console.log(data); 
						reject(err)
					} else {   
						resolve(result[0].rating);
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
 
module.exports={
	saveData,
	checkRecordDuplication,
	updateData,
	getRecordByid, 
	getOverallRating,  
	getAllData,
	deleteRecord,
	InitSequel:function(sequelize, type)
	{	
        var Product = sequelize.define('brand', {
              id: { 
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
              }, 
							title : { type: type.STRING }, 
							image : { type: type.STRING }, 
							slug : { type: type.STRING }, 
              parent_id : { type: type.INTEGER },  
              is_deleted : { type: type.INTEGER },  
              is_active : { type: type.INTEGER },    
          },   
          {
            tableName: 'brand',
            timestamps: false
          }  
      ); 
      return Product;
  }, 
}; 
