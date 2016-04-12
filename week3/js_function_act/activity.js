/************************************************************
** Kevin Turkington
** cs 290
** 4/12/16
** JS_function_activity
*************************************************************/


//function calls
i_work();//proof functions can be called before declaration

//no_work(); // uncomment this to prove var functions cant be called  before declaration.

/*********************************
** Function: i_work
** Description: prints a string saying "This is proof I work!"
** Parameters: N/A
** Pre-Conditions: N/A
** Post-Conditions: printed statment.
*********************************/
function i_work(){
	console.log("this is proof I work!");
}


/*********************************
** Function: i_dont_work
** Description: print a string saying "this is proof calls 
** before assignment doesn't work!"
** Parameters: N/A
** Pre-Conditions: N/A
** Post-Conditions: printed statment.
*********************************/
var no_work = function i_dont_work(){
	console.log("this is proof calls before assignment doesn't work!");
}

no_work();