/* Main serverside Javascript file */

var express = require("express");
var db = require("./system/mongo")();
var app = express(); 

var getHttp = require("./system/functions");

var port = process.env.PORT || 3000;


var exphbs = require("express-handlebars"); // Do we want this?
app.engine('handlebars', exphbs( {defaultLayout: 'main' } ));
app.set('view engine', 'handlebars');



app.use("/", express.static("public/"));


// Takes in the maximum cost to spend, and the original location
// Returns a JSON object with an array containing all distances away from
// The users current location, as well as items under his maximum price
app.get('/api/:cost/:originn', function(req,res){
	console.log("req params " + JSON.stringify(req.params)); 
	var originn = req.params.originn;
	var cost = req.params.cost;
	var db = require("./system/mongo")();
	// Query all the places in the database
	db.collection("places").find({}).toArray(function(error, placess){
		if(error){
				console.log("There was an error");
				res.write("There was an error");
				res.status(500).send();
		} else {
			// Makes a synchronous request to the google api (in getHttp)
				var resp = getHttp(originn, placess);
				console.log("resp.addresses = " + resp.addresses);// + " and " + resp.addresses.length)
				for(var x = 0; x<resp.addresses.length; x++){
						resp.addresses[x].name = placess[x].name;
						var miles = resp.addresses[x].distance;
						miles = miles.substr(0, miles.indexOf(" "));
					  console.log("miles = " + miles);
						miles = miles/1.60934;
						miles = Math.round(miles* 1000) / 1000;
					  console.log("miles = " + miles);
					  miles = miles + " miles";
						resp.addresses[x].distance = miles;
						for(var key in placess[x].menu){
							console.log("var key = " + key);
							// Check to see if the menu item is <= the maximum cost by the user
							if(placess[x].menu[key]<=cost){
								// If it is, insert it into the new object (to return)
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
