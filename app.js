var	express = require('express'),
	app = express(),
	searchesDAO = require('./searchesDAO'),
	request = require('request');
	MongoClient = require('mongodb');

	
var db_name = 'searchApp',
	mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
	
if(process.env.NODE_ENV === 'production'){
	mongodb_connection_string = process.env.MONGODB_URI;
}

MongoClient.connect(mongodb_connection_string,function(err,db) {
	
	var searches = searchesDAO(db);
	
	if(!err) {
		app.set('port',process.env.PORT || 3000);
		app.get('/',function(req,res) {
			res.sendfile('views/index.html', {root: __dirname })
		});
	
		app.get('/favicon.ico', function(req, res) {
			res.sendStatus(200);
		});

		app.get('/imagesearch/:search',function(req,res) {

			var searchQuery = req.params.search,
				pageNum = req.query.offset,
				searchReq = { url: 'https://www.googleapis.com/customsearch/v1?key=' + process.env.CSE_KEY + '&cx=' + process.env.CSE_ID + '&searchType=image&q=' + searchQuery };
	
			searches.addSearch(searchQuery,function(err) {
				if(err) {
					console.log(err);
				} else {
					console.log('Added search ' + searchQuery);
				}
			});
			
			request(searchReq,function(err,response,body) {
				if(err) {
					console.log(err);
					res.send('Something went wrong...');
				} else {
					res.send(response);
				}
			});
			
			res.send({error:'Invalid url'});
			
		});
		
		app.get('/latest/imagesearch', function(req, res) {
			var code = req.params.code;
			searches.getSearches(function(err,results) {
				if(err) {
					console.log(err);
					res.send('Something went wrong...');
				} else {
					res.send(results);
				}
			});
		});

		app.listen(app.get('port'), function() {
			console.log("Node app is running at localhost:" + app.get('port'));
		});
	}
});