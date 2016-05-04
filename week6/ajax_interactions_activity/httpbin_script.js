/****************************88
** Kevin Turkington
** cs 290
** 5/3/16
** ajax_interactions_activity
***************************/



/*******************
* function: submit button
* param: click
* description: pulls api data then appends data to a table on the website
********************/
document.getElementById("api_submit").addEventListener("click", function(event){
	var req = new XMLHttpRequest();
	var req_data = null;

	//data object
	data = {sport:null,food:null,color:null};
	data.sport = document.getElementById("sport_data").value;
	data.food = document.getElementById("food_data").value;
	data.color = document.getElementById("color_data").value;
	//console.log(JSON.stringify(data));

	//setup to sent object
	req.open("POST","http://httpbin.org/post",true);
	req.setRequestHeader("Content-Type", "application/json");// note: setting request type to json
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

	req.send(JSON.stringify(data));//sending JSON data object to server
	event.preventDefault();//if referencing in future dont forget this statement. ***
});

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

	// note: first parse made data a string, not its a object again
	var list_obj = JSON.parse(data_obj.data);
	//console.log(list_obj);

	//creating rows
	var sport_data = create_row("Sport: ", list_obj.sport);
	var food_data = create_row("food: ",list_obj.food);
	var color_data = create_row("color: ",list_obj.color);
	//appending rows
	my_table.appendChild(sport_data);
	my_table.appendChild(food_data);
	my_table.appendChild(color_data);

	//adding to div
	div.appendChild(my_table);
	var br = document.createElement("br");
	div.appendChild(br);
}