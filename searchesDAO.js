
function searchesDAO (db) {
	
	var collection = 'searches',
		collectionObj = db.collection(collection);
	
	function getSearches(callback) {
		collectionObj.find({},{'_id':0}).toArray(callback);
	}
	
	function addSearch(query,callback) {
		
		db.collection(collection).insert({'term':query,'when':new Date(Date.now())},function(err) {
			callback(err);
		});
		
	}
	
	return {
		getSearches:getSearches,
		addSearch:addSearch
	};
};

module.exports = searchesDAO;