//arguments object - no longer bound with arrow functions

const add = (a,b) => {

   // console.log(arguments); //prints all arguments passed to function. Not applicable in arrow function
    return a+ b;

};

console.log(add(55,1));




// this keyword - no longer bound


const user = {

    name: 'Div',
    city: ['Rome', 'Bishkek', 'Colombo'],
    printPlacesLived() {        //ppoints to global scope -- undefined so changed to normal function. Using methods now

      return this.city.map((city) => {   //map method to iterate over array. Using map method we can make changes to each element. 
            return this.name + ' has lived in' + city + '!';
      });

     // return cityMessages;

        // this.city.forEach((x) =>{                //this poimts to this of parent

        //     console.log(this.name + 'has lived in ' + x);
        // });

    }

};

console.log(user.printPlacesLived());



//Challenge 

const multiplier = {

    numbers: [1,2,3],
    multiBy:  2,

    multiply(){

       return this.numbers.map((num) => num*this.multiBy);
    }

    //numbers - array of numbers
    //multiplyBy - single number
    //multiply - return a new array where the number have been multiplied

};

console.log(multiplier.multiply());  //[1,2,3] 2 [2,4,6]

















