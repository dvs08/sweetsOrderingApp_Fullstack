function square(x){
    return x*x;
 };


 const squareArrow = (x) =>{
    
    return square(x);
 };

 console.log(square(8));
 console.log(squareArrow(8));

const squareNewForm =(x) => x*x; //same as normal arrowfunction 
console.log(squareNewForm(8)); 


/*Challenge: Use arrow functions 
getfirstName('Mike Smit); op Mike
create regular arrow function
create arrow function shortanhd */

const challenge1 = (fullName) => {

    return fullName.split(' ')[0];
};

console.log(challenge1("Mith SMith")); 

const chal1Short = fullName => fullName.split(' ')[0];
console.log(chal1Short("Mith Smith"));