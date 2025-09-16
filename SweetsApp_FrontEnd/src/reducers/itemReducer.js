// reducers/itemReducer.js
const initialState = {
    itemQueue: [],
    totalPrice: 0
  };
  
  const itemReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_ITEM':
        const updatedQueue = [action.payload, ...state.itemQueue];
        const newTotalPrice = updatedQueue.reduce((total, entry) => {
          const weightInUnits = parseFloat(entry.weight.replace('g', '').trim()) / 500;
          const pricePerUnit = pricesPer500g[entry.item] || 0;
          return total + (weightInUnits * pricePerUnit);
        }, 0);
        return {
          ...state,
          itemQueue: updatedQueue,
          totalPrice: newTotalPrice
        };

      case 'SET_TOTAL_PRICE':
        return {
          ...state,
          totalPrice: action.payload
        };
        
        
      default:
        return state;
    }
  };
  
  const pricesPer500g = {
    'Jalebi': 200,
    'Laddu': 400,
    'Roshgulla': 600,
    'Kajukatli': 800
  };
  
  export default itemReducer;
  

