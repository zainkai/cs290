/****************************88
** Kevin Turkington
** cs 290
** 5/3/16
** ajax_interactions_activity
***************************/


var api_key = "111111111111111111111111";//put your own api key
var data_set = "city";


/****
* changes a <p> in the webpage to city or zipcode, indicating to the user
* what to input into the text box
*****/
document.getElementById("rad_c").addEventListener("click",function(event){
	data_set = "city";
	document.getElementById("info_indicator").textContent = "City: ";
});
document.getElementById("rad_z").addEventListener("click",function(event){
	data_set = "zipcode";
	document.getElementById("info_indicator").textContent = "ZipCode(US): ";
});



/*******************
* function: submit button
* param: click
* description: pulls api data then appends data to a table on the website
********************/
document.getElementById("weather_submit").addEventListener("click", function(event){
	var req = new XMLHttpRequest();
	var req_data = null;

	data = {city:null,zipcode:null};

	if (data_set == "city"){
		data.city = document.getElementById("weather_data_input").value;
		req_data = "q="+ data.city +"&APPID=" + api_key;
	}
	else{
		data.zipcode = document.getElementById("weather_data_input").value;
		req_data = "zip="+ data.zipcode +",us" +"&APPID=" + api_key;
	}

	req.open("POST","http://api.openweathermap.org/data/2.5/weather?"+req_data,true);
	req.addEventListener("load",function(){
		if(req.status >= 200 && req.status < 400){
			//taking data recieved from the server
			var response = JSON.parse(req.responseText);
			//console.log(response);

			fill_results_div(response);
		}
		else{
			console.log("something went wrong with the request");
			console.log("Error in network request: " + request.statusText);
		}
	});

	req.send(null);//we are not sending any data only pulling
	event.preventDefault();//if referencing in future dont forget this statement. ***
});


/***********
* function: fill_results_div
* param: data object
* description: creates a table with data that is appended to the website
8**********/
function fill_results_div(data_obj){
	var div = document.getElementById("results_div");
	var my_table = document.createElement("table");

	function create_row(header,info){
		var row = document.createElement("tr");
		var th = document.createElement("th");
		var td = document.createElement("td");

		th.textContent = header;
		td.textContent = info;

		row.appendChild(th);
		row.appendChild(td);

		return row;
	}

	function kalvin_to_fahren(kalvin_temp){
		var celcius_temp = kalvin_temp - 273;
		var fahren_temp = ((9/5)*celcius_temp)+ 32;

		return fahren_temp.toFixed(1);
	}

	//creating rows
	var city_name = create_row("City: ", data_obj.name);
	var descrip_data = create_row("Description: ",data_obj.weather[0].description);
	var temp_data = create_row("Temprature: ",kalvin_to_fahren(data_obj.main.temp) + " °F");
	//appending rows
	my_table.appendChild(city_name);
	my_table.appendChild(descrip_data);
	my_table.appendChild(temp_data);

	//adding to div
	div.appendChild(my_table);
	var br = document.createElement("br");
	div.appendChild(br);
}
