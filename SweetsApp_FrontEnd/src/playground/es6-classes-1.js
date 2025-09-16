
//classes: blueprint of an object

//eg) Car class
// make, model, etc. description()

//chalenge Setup up constructor to take name and age (default to 0)
// getDescription = Div is '22 years(s) old.



class Person {

    constructor(name = 'Anonymous' , age = 0){        //automatically called during the creation of an object in a class.
        this.name = name;  
        this.age = age;
    }

    getGetting(){

       return `Hi, I am ${this.name}`;

    }

    getDescription(){

        return `${this.name} is ${this.age} years old`;
     
    }

}
 //subclass: student has all properties of Person

class Student extends Person{

    constructor(name, age, major){
        super(name, age);                  //super access the constructor parameters from th parent. this.name ,this.age
        this.major = major;

    }

    hasMajor(){

        return !!this.major;            //logical operator 
    }

    getDescription(){    //overriding method

       // return `${this.name} is in ${this.major}` ;
       let description = super.getDescription();  //getting parents get description
        
       if(this.hasMajor()){

           description = description + `is in ${this.major}`;
       }
       
       return description;
    }
}

//traverler = extends person class
// add supoort for homelocation
//overrid getGreeting
//1. if there is location:hi i am div tha. Im visting from Delhi
//2. If no location: Hi i am divyanshu tha



class Traverler extends Person{
    constructor(name,age, homeLocation){

        super(name, age);

        this.homeLocation = homeLocation;

    }

    getGetting(){

        let greet = super.getGetting();
        if(this.homeLocation){

            
            return greet + `I am visiting from ${this.homeLocation}`;
        } else{

            return greet;
        }

    }
    
}

 
const me = new Person('Divyanshu Thakur', 45);  //making new instance using new keyword
console.log(me.getGetting());

console.log(me.getDescription());

const other = new Student('Johny Sins', 23, 'Cs');
console.log(other.hasMajor());
console.log(other.getDescription());  

const trav1 = new Traverler('Div Thakur', 23, 'Delhi');

console.log(trav1.getGetting());



