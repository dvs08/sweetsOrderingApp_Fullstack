
//Challenge to make a toggle functionality 
/*
const appRoot = document.getElementById('app');

let visibility = false;

const toggleVisibility = () =>{

    visibility = !visibility;
    render();
};

const render = () => {

    const template = (


        <div>

            <h1>Visible Toggle</h1>
            <button onClick ={toggleVisibility}>{visibility? 'Hide Details' : 'Show details'}</button>
            {visibility && (
                <p>Hey. There are some details you can now see</p>
            )}

        </div>




    );


    ReactDOM.render(template,appRoot);
};

render();
*/

//********Make the same using state component


//VisibilityTOggle - render, constructor, handleToggleVisibility
// visibility -> false


class VisibilityToggle extends React.Component{

    constructor(props){

        super(props);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.state = {

            visibility: false
        };
    }

    handleToggleVisibility(){

        this.setState((prevState) =>{

            return {

                visibility: !prevState.visibility

            };
        });
    }

    render(){

        return(

            <div>

            <h1>Visible Toggle</h1>
            <button onClick ={this.handleToggleVisibility}>{this.state.visibility? 'Hide Details' : 'Show details'}</button>
            {this.state.visibility && (
                <p>Hey. There are some details you can now see</p>
            )}

        </div>

        );


    }
}

ReactDOM.render(<VisibilityToggle/> , document.getElementById('app'));




















