/* Main clientside Javascript file */

function add(){
var sub = document.getElementById("subbb");
sub.addEventListener("click", function(event){
	var address = document.getElementById("address");
	var slider =	document.getElementById("slider");
	if(slider.value && address.value){
		getAPI(slider.value, encodeURI(address.value));
		slider.value="";
		address.value="";
	} else {
		alert("Invalid slider or address values");
	}
});	
}

function clearData(){
	// clears the home screen of cards 
	//
}

function addData(apiResponse){
	// Inserts the api response into the home 
	console.log(apiResponse);
	apiResponse = JSON.parse(apiResponse);
	var html = Handlebars.templates.template(apiResponse);
	var body = document.querySelector("body");
	body.insertAdjacentHTML('beforeend', html);
}


function getAPI(cost, address){
	var req = new XMLHttpRequest();
	req.addEventListener("load", function(){
		clearData();
		addData(this.responseText);	
	});
	var str = "/api/"+cost+"/"+address;
	console.log(str);
	req.open("GET", str, true);
	req.setRequestHeader("Content-Type", "application/JSON");
	req.send();
}
