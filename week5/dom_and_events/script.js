/****************************
*** Kevin Turkington
*** cs 290
*** 4/26/2016
*** dom_and_events assignment
****************************/

//creating table
var my_table = document.createElement("table");
my_table.style.border = "3px solid black";

//creation variables
var headers_created = false;

//create table function
function create_headers(row){
	for (var j = 0; j < 4; j++) {
	var header = document.createElement("th");
	header.textContent = "Header " + (j+1);

	row.appendChild(header);
	}
}

function create_td(row,row_num){
	for (var j = 0; j < 4; j++) {
	var cell = document.createElement("td");
	cell.textContent = (j+1)+" , "+row_num;

	row.appendChild(cell);
	}
}


//populate table
for (var i = 0; i < 4; i++) {
	var row = my_table.insertRow(i);

	if(headers_created == false){
		create_headers(row);
		headers_created = true;
	}
	else{
		create_td(row,i);
	}
}

//adding to webpage...
var table_div = document.createElement("div");
table_div.appendChild(my_table);
document.body.appendChild(table_div);



//*********************************************************************
//variables
var row = 1;
var col= 0;
var point = my_table.rows[row].cells[col];
point.style.border = "1px solid red";
var prev_point = point;

//functions
var mark_func = function mark(){
	point.style.background = "pink";
}

var up_func = function up(){
	var temp = point;
	if(row > 1){
		point = my_table.rows[row-1].cells[col];
		row--;
		point.style.border = "1px solid red";
		temp.style.border = "white";
	}
}

var down_func = function down(){
	var temp = point;
	if(row < 3){
		point = my_table.rows[row+1].cells[col];
		row++;
		point.style.border = "1px solid red";
		temp.style.border = "white";
	}
}

var left_func = function left(){
	var temp = point;
	if(col > 0){
		point = my_table.rows[row].cells[col-1];
		col--;
		point.style.border = "1px solid red";
		temp.style.border = "white";
	}
}

var right_func = function right(){
	var temp = point;
	if(col < 3){
		point = my_table.rows[row].cells[col+1];
		col++;
		point.style.border = "1px solid red";
		temp.style.border = "white";
	}
}


//making buttons
var up_btn = document.createElement("button");
up_btn.textContent = "up";
up_btn.onclick = up_func;

var down_btn = document.createElement("button");
down_btn.textContent = "down";
down_btn.onclick = down_func;

var left_btn = document.createElement("button");
left_btn.textContent = "left";
left_btn.onclick = left_func;

var right_btn = document.createElement("button");
right_btn.textContent = "right";
right_btn.onclick = right_func;

var mark_btn = document.createElement("button");
mark_btn.textContent = "Mark cell";
mark_btn.onclick = mark_func;






var buttons_div = document.createElement("div");
buttons_div.appendChild(up_btn);
buttons_div.appendChild(down_btn);
buttons_div.appendChild(left_btn);
buttons_div.appendChild(right_btn);
buttons_div.appendChild(mark_btn);



//top of hiearchy added to webpage
document.body.appendChild(buttons_div);