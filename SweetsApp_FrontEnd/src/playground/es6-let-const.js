/*On terminal, switched bebel to this.
babel src/playground/es6-let-const.js --out-file=piublic/scripts/app.js --presets=env,react
Using 2 terminals. One for changing babel. One for live server
*/

//var based: we can also redefine

var nameVar = 'Divyanshu';
var nameVar = 'Mike';


console.log('nameVar', nameVar);

//with let we can't redefine it
let nameLet = 'Jan';
nameLet = 'Hunk';
console.log('nameLet', nameLet);

//we cant redine nor reassign in const

const nameConst = "Jesse";
console.log('nameConst', nameConst);


function getPetName(){

    var petName = 'Hal';
    console.log(petName);
}

getPetName();
//console.log(petName);  //not in scope, var is function scoped

const petName = getPetName();
console.log(petName);


//block scoping

//Var: it works. But wont work with let/const. They are block scope
var fullName = "Andrew Mead";

if(fullName){
    var firstName = fullName.split(' ')[0];
    console.log(firstName);
}

console.log(firstName);


