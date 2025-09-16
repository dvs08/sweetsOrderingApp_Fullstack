
// import { createStore } from 'redux';

// const initialState = {
//     itemQueue: []
// };

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'SET_ITEM_QUEUE':
//             return { ...state, itemQueue: action.payload };
            
//         default:
//             return state;
//     }
// };

// export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Redux store


//********************************************************************************* */

// import { createStore } from 'redux';

// const initialState = {
//     itemQueue: []
// };

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'SET_ITEM_QUEUE':
//             return { ...state, itemQueue: action.payload };

//         case 'UPDATE_ITEM_COUNT':           //returns new state with copied items from prev state. makes new itemqueue by mapping over each entry in current itemQuue. updates count if condition met
//             return {
//                 ...state, 
//                 itemQueue: state.itemQueue.map(entry => 
//                     entry.item === action.payload.item && entry.weight === action.payload.weight
//                         ? { ...entry, count: action.payload.count }
//                         : entry
//                 )
//             };

//         case 'RESET_ITEM_QUEUE':  
//             return { 
//                 ...state, 
//                 itemQueue: [] 
//             };

//         default:
//             return state;
//     }
// };

// export const store = createStore(reducer);


import { createStore } from 'redux';

// Function to load state from local storage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('itemQueue');
        return serializedState ? JSON.parse(serializedState) : [];
    } catch (error) {
        console.error("Could not load state", error);
        return [];
    }
};

// Function to save state to local storage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('itemQueue', serializedState);
    } catch (error) {
        console.error("Could not save state", error);
    }
};

// Load initial state from local storage
const initialState = {
    itemQueue: loadState(), // Load from local storage or use empty array
};

// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ITEM_QUEUE':
            const newSetState = { ...state, itemQueue: action.payload };
            saveState(newSetState.itemQueue); // Save to local storage
            return newSetState;

        case 'UPDATE_ITEM_COUNT':
            const updatedState = {
                ...state,
                itemQueue: state.itemQueue.map(entry =>
                    entry.item === action.payload.item && entry.weight === action.payload.weight
                        ? { ...entry, count: action.payload.count }
                        : entry
                ),
            };
            saveState(updatedState.itemQueue); // Save to local storage
            return updatedState;
            

        case 'RESET_ITEM_QUEUE2':
            localStorage.removeItem('itemQueue'); // Clear from local storage
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('token');

        case 'RESET_ITEM_QUEUE':
            localStorage.removeItem('itemQueue'); // Clear from local storage
            localStorage.removeItem('isLoggedIn');
            // localStorage.removeItem('token');
        
            return { 
                ...state, 
                itemQueue: [] 
            };

        default:
            return state;
    }
};


export const store = createStore(reducer);

