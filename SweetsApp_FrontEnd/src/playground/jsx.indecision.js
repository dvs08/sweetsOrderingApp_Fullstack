console.log('App.js is running!');


//JSX = JavaScript XML : Allows us to write HTML in react

//challenge2: create app object title/subtile
// use title/subtitle in the template
//render template


//Challenge 3: Only render the subtitle and p tag if subtitle exist - logical and operator
//render a new p tag - if options.length > 0 "here are your options", else "No option"


function arr(options){

    if(options.length > 0){
        return <p>Here are your options:</p>
    }else{
        return <p>No Option</p>
    }

};


const app = {

    title: 'Snehal Bio App',
   // subtitle:'This is some info',
    options: []
};


const onFormSubmit = (e) =>{   //adding options to the array once form submited

    e.preventDefault();

    const option = e.target.elements.option.value;  //to get the value inputed
    
    if(option){

        app.options.push(option);
        e.target.elements.option.value = '';  //clearing input
        render();
    }
};


//create Remove All button

//on click wipe the array -> rerender

    //create a render fnction that renders the new jsx
    //call the right array
    //call it after options added to

    const onRemoveAll = () => {

        app.options = [];
        render();

    };

    const onMakeDecision =() =>{  //making a button to select a random option from the list

        const randomNum = Math.floor(Math.random() * app.options.length);  //setting option from 0 to the length
        const option = app.options[randomNum];
        alert(option); 

    };

    const appRoot = document.getElementById('app');

    const numbers = [55, 101, 1000];
   
    const render = () => {

        const template = (
            <div>
            
                <h1>{app.title}</h1>
                {app.subtitle && <p>{app.subtitle}</p>}
                {/* <p>{app.subtitle}</p> */}
                {arr(app.options)}
                <p>{app.options.length}</p>
                
                <button disabled={app.options.length === 0}onClick={onMakeDecision}>Snehal is..</button>  {/*if length is 0, disbaled the button*/ }
                <button onClick={onRemoveAll}>Remove All</button>

                {
                  /*  [99,98,97, 'Mike Smith', null, undefined, true]        //{99}{98}{97}
                    [<p key="1">a</p> , <p key="2">b</p>, <p key="3">c</p>] //rendering jsx in array. Using key to indentify which items in the array are chanegd

                   generating this dynamically based on numbers[] above. Array of jsx

                   numbers.map((number)=>{

                    return <p key={number}>Number:{number}</p>;        //key is used so we can identify which items in the array are chanegd

                   })
                    */
                }  
    
                <ol>

                    {/* map over app.options and getting back an array of lis (set key and text) */}
                    {/* <li>Item 1</li>
                    <li>item 2</li>
                    <li>item 3</li> */}

                    {

                        app.options.map((option) => {

                            return <li key={option}>{option}</li>;

                        })
                    }
        
                </ol>
                <form onSubmit={onFormSubmit}>
    
                    <input type="text" name="option"/>
                    <button>Add Option</button>
    
    
                </form>
            
            </div>
        );


    ReactDOM.render(template,appRoot);

    };


    render();


//JSX: JavaScript xml
 
// var template = (
//     <div>
    
//         <h1>Indecision App</h1>
//         <p>This is some info</p>
//         <ol>
//             <li>Item 1</li>
//             <li>item 2</li>
//             <li>item 3</li>

//         </ol>

    
//     </div>);

//Challenge
//Create a templateTwo var jsx expresion
// div 
//     h1 -> Divyanshu Thakur
//     p -> Age: 22
//     p -> Location: New Delhi
//     Redner templateTwo instead of template



//making object to store data

// const user ={

//     name: 'Divyanshu',
//     age: 26,
//     location: 'New Delhi'
// };

// function getLocation(location) {  //use function to adding any conditional logic

//     if(location === 'New Delhi'){
//         return <p>Location: {location}</p>;
//     } 
// };

//normal variable store
// var userName = 'John';
// var userAge = 27;
// var userLocation = 'New Delhi';    

// const templateTwo = (                //{Js expression only}

//     <div>                          

//         <h1>{user.name ? user.name : 'Anonymous'}</h1>    
        
//         {/* <p>Age: {user.age}</p>. // if age > 18, return <p>.... Else nothing*/}
//         {user.age >= 18 && <p>Age :{user.age}</p>} 
//         {/* <p>Location: {getLocation(user.location)}</p>  */}
//         {getLocation(user.location)} 


//     </div>


// );


//Making a counter button
// let count = 0;
// const addOne = () => {

//     console.log('addOne');
// };

// const templateThree = (
//     <div>
//         <h1>Count: {count}</h1>
//         <button onClick ={addOne}>+1</button>
//     </div>
// );



//Challenge

/* Make button '-1* - setup minusOne function and register -log "minusOne" 

Make a reset button "reset" - setup reset function -log reset


*/









































