/* Main clientside Javascript file */

function add(){
var sub = document.getElementById("subbb");
sub.addEventListener("click", function(event){
	var address = document.getElementById("address");
	var slider =	document.querySelector("#slider:checked");
	if(slider.value && address.value){
		getAPI(slider.value, encodeURI(address.value));
		slider.value="";
		address.value="";
	} else {
		alert("Invalid address");
	}
});	
}

function clearData(){
	// clears the home screen of cards 
	var elem = document.querySelectorAll(".itembox");
	for(var x =elem.length-1; x>=0;x--){
		elem[x].parentNode.removeChild(elem[x]);
	}
}

function addData(apiResponse){
	// Inserts the api response into the home
	var val = document.querySelector("#slider:checked").value;
	var doshow = true;
	console.log(apiResponse);
	apiResponse = JSON.parse(apiResponse);
	for(var x=0; x<apiResponse.addresses.length; x++){
 		var miles = apiResponse.addresses[x].distance.substr(0, apiResponse.addresses[x].distance.indexOf(" "));
		
		if(miles<=val){
			apiResponse.splice(x, 1);
		} else {
			console.log(apiResponse.addresses[x])
			console.log(Object.keys(apiResponse.addresses[x].items).length)
			if(Object.keys(apiResponse.addresses[x].items).length==0){
				apiResponse.addresses.splice(x,1)
				x--;
			}
		}
	}
	var html = Handlebars.templates.template(apiResponse);
	var body = document.querySelector("#ContainerOfMenus");
	body.insertAdjacentHTML('afterbegin', html);
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
