/************************************************************
** Kevin Turkington
** cs 290
** 4/12/16
** js_objects_activity
*************************************************************/


/********************
** Function: deepEqual
** Description: compares values or objects and sees if they are
** completely the same.
** Parameters: variable1, variable2
** Pre-Conditions: two objects or values
** Post-Conditions: returns a true or false
************************/
function deepEqual(obj1,obj2){
	var str1,str2;

	//simple check to see if variables are similar.
	if (obj1 == obj2) {
		return true;
	}

	//checks if types are the same and if objs are not null
	else if((typeof(obj1) == typeof(obj2)) && (obj1 != null) && (obj2 != null)){
		//adds variables of objects to a array
		for (var prop in obj1) {
  			str1 += obj1[prop];
		}
		for (var prop in obj2){
			str2 += obj2[prop];
		}

		//checks if arrays are the same
		if(str1 != str2){
			return false;
		}
		else{
			return true;
		}
	}
	else{
		return false;
	}
}



//assignment
var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// true
console.log(deepEqual(obj, {here: 1, object: 2}));
// false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// true

