
const p = Promise((resolve,reject)  =>{

    setTimeout(() =>{

        resolve("Promise has been resolved");

    }, 10000);
});


//1. Normal way

function getData() {                      // Output: Hello. (after 10 sec) --> Promise has been resolved

    p.then((res) => {

        console.log(res);
    } );
    console.log("Hello");
}

getData();


//2. Async/await

async function handlePromise(){                       //this will work --> waits till val gets a value. (Promise resolves), then everything below it works

    console.log("This will work");                           
    const val = await p;

    console.log("Hello World");
    console.log(val);
} 


handlePromise();

async function handlePromise(){                       //After when 1st promise resolves, rest all below including the 2nd promises also resolves

    console.log("This will work");                           
    const val = await p;

    console.log("Hello World");
    console.log(val);

    const val2 = await p;
    clg(val2);                          
} 


handlePromise();



//When you have multiple awaits. handlepromise gets loaded to stack. At 1st await, it gets susepnded for x time. Comes back on and prints whatever is next.
//Then when await comes again, it gets suspended again for y time. 



//fetch() it's a browser function which returns Response.json() which is also promise which resolves to
// jsonValue
//eg) fetch().then(res => res.json()).then(res => consolelog());








