
/*: A class component is created by extending the React.
Component class and must have a render() method that returns the JSX to be displayed.*/
/*


let appRoot = document.getElementById('app');

let num = 0;

const addOne = () => {
    num++;
    renderCounterApp();  //changes shows up on screen
};
const minusOne = () =>{

    num--;
    renderCounterApp();
    
};

const reset = () =>{

    num = 0;
    renderCounterApp();

};



const renderCounterApp = () =>{

    const templateFour = (

        <div> 

            <h1>Count: {num}</h1>
            <button onClick={addOne}>+1</button>
            <button onClick={minusOne}>-1</button>
            <button onClick={reset}>reset</button>

        </div>


    );

    ReactDOM.render(templateFour, appRoot);
};

renderCounterApp();
*/

//making the same using component state

class Counter extends React.Component {

    constructor(props){

        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);

        this.state  = {   //state component, setting it to default at 0

            count: props.count,
           
        };
    }
    
    componentDidMount(){
        const stringCount = localStorage.getItem('count');
        const count = parseInt(stringCount, 10);
        if(!isNaN(count)){

            this.setState(() => ({count: count}));
        }
    }

    componentDidUpdate(prevProps, prevState){

       if(prevState.count !== this.state.count){
            localStorage.setItem('count', this.state.count);
       }

    }
    handleAddOne(){

       // this.state = this.state.count +1;  will not render it on browser

        this.setState((prevState) =>{       //setState() is a method used to update the state of a class component.

            return{

                count: prevState.count +1
            };
        });
    }
    handleMinusOne(){

        this.setState((prevState) =>{

            return{
                count: prevState.count -1
            };
        });
    }
    handleReset(){

        this.setState(() =>{
            return{
                count:0
            };
        });
    }

//Now we dont need to re-render it. Everything is rendering automatically by updating the state

    render() {

        return(

            <div>
            
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>reset</button>

            </div>

        );
    }

}

// create 3 methods. HandleAddOne, handleMinusOne, handleReset
//use clg to print method name
//wire onClick & bind in the constructor 


Counter.defaultProps = {
    count:0
};

ReactDOM.render(<Counter/>, document.getElementById('app'));