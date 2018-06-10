/* Main serverside Javascript file */

var express = require("express");
var db = require("./system/mongo")();
var app = express(); 

var getHttp = require("./system/functions");

var port = process.env.PORT || 3000;


var exphbs = require("express-handlebars"); // Do we want this?
app.engine('handlebars', exphbs( {defaultLayout: 'main' } ));
app.set('view engine', 'handlebars');





app.get('/api/:cost/:originn', function(req,res){
	console.log("req params " + JSON.stringify(req.params)); 
	var originn = req.params.originn;
	var cost = req.params.cost;
	var db = require("./system/mongo")();
	db.collection("places").find({}).toArray(function(error, placess){
		if(error){
				console.log("There was an error");
				res.write("There was an error");
				res.status(500).send();
		} else {
				var resp = getHttp(originn, placess);
				console.log("resp.addresses = " + resp.addresses + " and " + resp.addresses.length)
				for(var x = 0; x<resp.addresses.length; x++){
						for(var key in placess[x].menu){
							console.log("var key = " + key);
							if(placess[x].menu[key]<cost){
								console.log("in places.menu = " + placess[x].menu[key]);
								resp.addresses[x].items[key] = placess[x].menu[key];
							}
						} // Should clean this up 
				}
				res.write(JSON.stringify(resp).toString());
				res.status(200).send();
		}
	});
	
});

app.use("/", function(req, res){
	console.log("In home - " + db);
	res.status(200).render("home");
});


app.listen(port, function(){
	console.log(" == Successfully started listening");
});
