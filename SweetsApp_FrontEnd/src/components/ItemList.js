

// import React from 'react';

// const pricesPer500g = {
//     'Jalebi': 200,
//     'Laddu': 400,
//     'Roshgulla': 600,
//     'Kajukatli': 800,
// };

// const ItemList = ({ itemQueue }) => {

//     const calculatePrice = (item, weight) => {
//         const weightInUnits = parseFloat(weight.replace('g', '').trim()) / 500;
//         const pricePerUnit = pricesPer500g[item] || 0;
//         return weightInUnits * pricePerUnit;
//     };

//     const calculateTotalPrice = () => {
//         return itemQueue.reduce((total, entry) => {
//             if (entry.item && entry.weight) {
//                 const price = calculatePrice(entry.item, entry.weight);
//                 return total + price;
//             }
//             return total;
//         }, 0);
//     };

//     const totalPrice = calculateTotalPrice();

//     return (
//         <div className='mainItem'>
//             <h2>Price List (500g)</h2>
//             <div className='item'>
//                 <ol className='order'>
//                     <li>Jalebi: 200 INR</li>
//                     <li>Laddu: 400 INR</li>
//                     <li>Roshgulla: 600 INR</li>
//                     <li>Kajukatli: 800 INR</li>
//                 </ol>
//             </div>
//             <h2>Item List</h2>
//             <div className='item'>
//                 {itemQueue.map((entry, index) => (
//                     <button key={index} className='itemButton'>
//                         {`${entry.item}: ${entry.weight} - ${entry.weight && pricesPer500g[entry.item] ? calculatePrice(entry.item, entry.weight) : 'N/A'} INR`}
//                     </button>
//                 ))}
//             </div>
//             <h2>Total Price</h2>
//             <div className='verticalBox'>
//                 <div className='price'>
//                     {isNaN(totalPrice) ? "Error" : `${totalPrice} INR`}
//                 </div>
//                 <button className='itemButton'>Check Out</button>
//             </div>
//         </div>
//     );
// };

// export default ItemList;




//****************************************************************************************************************** */

// import React from 'react';
// import { pricesPer500g } from './prices'; 
// import { Link } from 'react-router-dom'; 

// const ItemList = ({ itemQueue }) => {

//     const calculatePrice = (item, weight) => {
//         const weightInUnits = parseFloat(weight.replace('g', '').trim()) / 500;
//         const pricePerUnit = pricesPer500g[item] || 0;
//         return weightInUnits * pricePerUnit;
//     };

//     const calculateTotalPrice = () => {
//         return itemQueue.reduce((total, entry) => {
//             if (entry.item && entry.weight) {
//                 const price = calculatePrice(entry.item, entry.weight);
//                 return total + price;
//             }
//             return total;
//         }, 0);
//     };

//     const totalPrice = calculateTotalPrice();

//     return (
//         <div className='mainItem'>
//             <h2>Price List (500g)</h2>
//             <div className='item'>
//                 <ol className='order'>
//                     <li>Jalebi: 200 INR</li>
//                     <li>Laddu: 400 INR</li>
//                     <li>Roshgulla: 600 INR</li>
//                     <li>Kajukatli: 800 INR</li>
//                 </ol>
//             </div>
//             <h2>Item List</h2>
//             <div className='item'>
//             {itemQueue.map((entry, index) => (
//     <div key={index} className='itemContainer'>
//         <button className='itemButton'>
//             {`${entry.item}: ${entry.weight} - ${entry.weight && pricesPer500g[entry.item] ? calculatePrice(entry.item, entry.weight) : 'N/A'} INR`}
//         </button>
//     </div>
// ))}
//             </div>
//             <h2>Total Price</h2>
//             <div className='verticalBox'>
//                 <div className='price'>
//                     {isNaN(totalPrice) ? "Error" : `${totalPrice} INR`}
//                 </div>
           
//                 <Link to="/checkout">
//                     <button className='itemButton'>Check Out</button>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default ItemList;


//************NEW +-Button********************* */

// import React from 'react';
// import { pricesPer500g } from './prices'; 
// import { Link } from 'react-router-dom'; 
// import { useDispatch, useSelector } from 'react-redux';

// const ItemList = () => {
//     const dispatch = useDispatch();
//     const itemQueue = useSelector(state => state.itemQueue);

//     const calculatePrice = (item, weight) => {
//         const weightInUnits = parseFloat(weight.replace('g', '').trim()) / 500;
//         const pricePerUnit = pricesPer500g[item] || 0;
//         return weightInUnits * pricePerUnit;
//     };

//     const calculateTotalPrice = () => {
//         return itemQueue.reduce((total, entry) => {
//             if (entry.item && entry.weight && entry.count > 0) {
//                 const price = calculatePrice(entry.item, entry.weight);
//                 return total + price * entry.count; // Multiply by count
//             }
//             return total;
//         }, 0);
//     };

//     const totalPrice = calculateTotalPrice();

//     const handleIncrease = (item) => {
//         const existingEntry = itemQueue.find(entry => entry.item === item);
//         if (existingEntry) {
//             dispatch({ type: 'UPDATE_ITEM_COUNT', payload: { item, count: existingEntry.count + 1 } });
//         }
//     };

//     const handleDecrease = (item) => {
//         const existingEntry = itemQueue.find(entry => entry.item === item);
//         if (existingEntry && existingEntry.count > 0) {
//             const newCount = existingEntry.count - 1;
//             dispatch({ type: 'UPDATE_ITEM_COUNT', payload: { item, count: newCount } });
//         }
//     };

//     return (
//         <div className='mainItem'>
//             <h2>Price List (500g)</h2>
//             <div className='item'>
//                 <ol className='order'>
//                     <li>Jalebi: 200 INR</li>
//                     <li>Laddu: 400 INR</li>
//                     <li>Roshgulla: 600 INR</li>
//                     <li>Kajukatli: 800 INR</li>
//                 </ol>
//             </div>
//             <h2>Item List</h2>
//             <div className='item'>
//                 {itemQueue.map((entry, index) => (
//                     entry.count > 0 ? ( // Only render if count is greater than 0
//                         <div key={index} className='itemContainer'>
//                             <button className='itemButton'>
//                                 {`${entry.item}: ${entry.weight} - ${calculatePrice(entry.item, entry.weight) * entry.count} INR`}
//                             </button>
//                             <button onClick={() => handleIncrease(entry.item)}>+</button>
//                             <button onClick={() => handleDecrease(entry.item)}>-</button>
//                             <span> Count: {entry.count}</span>
//                         </div>
//                     ) : null // Do not render anything if count is 0
//                 ))}
//             </div>
//             <h2>Total Price</h2>
//             <div className='verticalBox'>
//                 <div className='price'>
//                     {isNaN(totalPrice) ? "Error" : `${totalPrice} INR`}
//                 </div>
//                 <Link to="/checkout">
//                     <button className='itemButton'>Check Out</button>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default ItemList;

import React from 'react';
import { useNavigate} from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';


const ItemList = ({mithai=[]}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const itemQueue = useSelector(state => state.itemQueue);

    const calculatePrice = (item, weight) => {

        console.log(item);
        const weightInUnits = parseFloat(weight.replace('g', '').trim()) / 1000;
        const mithaiItem = mithai.find(mith => mith.name === item);
        const pricePerUnit = mithaiItem.rate;
        return weightInUnits * pricePerUnit;
    };

    const calculateTotalPrice = () => {
        return itemQueue.reduce((total, entry) => {
            if (entry.item && entry.weight && entry.count > 0) {
                const price = calculatePrice(entry.item, entry.weight);
                return total + price * entry.count; 
            }
            return total;
        }, 0);
    };

    const calculateTotalWeight = () => {
        return itemQueue.reduce((total, entry) => {
            const entryWeight = parseFloat(entry.weight.replace('g', '').trim());
            return total + (entry.count > 0 ? entryWeight * entry.count : 0);
        }, 0);
    };

    const totalPrice = calculateTotalPrice();
    const totalWeight = calculateTotalWeight();

    const handleIncrease = (item, weight) => {
        const existingEntry = itemQueue.find(entry => entry.item === item && entry.weight === weight);
        if (existingEntry) {
            const newCount = existingEntry.count + 1;
    
            // Calculate the new total weight
            const newTotalWeight = calculateTotalWeight() + parseFloat(weight.replace('g', '').trim());
    
            // Check if the new total weight exceeds the limit
            //console.log(newTotalWeight)
            
            if (newTotalWeight > 10000) {
                alert('Max weight limit reached (10,000 g)');
                return;
            }
    
            dispatch({ type: 'UPDATE_ITEM_COUNT', payload: { item, weight, count: newCount } });
        }
    };


    const handleDecrease = (item, weight) => {
        const existingEntry = itemQueue.find(entry => entry.item === item && entry.weight === weight);
        if (existingEntry && existingEntry.count > 0) {
            const newCount = existingEntry.count - 1;
            
            if (newCount === 0) {
                const updatedQueue = itemQueue.filter(entry => !(entry.item === item && entry.weight === weight));
                dispatch({ type: 'SET_ITEM_QUEUE', payload: updatedQueue });
            } else {
                dispatch({ type: 'UPDATE_ITEM_COUNT', payload: { item, weight, count: newCount } });
            }
        }
    };

    const handleCheckout = () => {

        if(itemQueue.length == 0 || totalPrice == 0){

            alert('Please Add to Cart');
            
        }

        else{
        navigate('/checkout'); 
        }
    };
    
    return (
        <div className='mainItem'>
            <h2>Price List (1000g)</h2>
            <div className='item2'>
                <ol className='order'>
                    {mithai.map(({name, rate, id}) =>
                    <li key={id}>{name}: {rate} INR</li>
                )}
                </ol>
            </div>
            <h2>Item List</h2>
            <div className='item'>
               
                {itemQueue.map((entry, index) => (
                    entry.count > 0 ? (
                        <div key={index} className='itemContainer'>
                            <button className='itemButton'>
                                {`${entry.item}: ${entry.weight} - ${calculatePrice(entry.item, entry.weight) * entry.count} INR`}
                             </button>
                            <button onClick={() => handleIncrease(entry.item, entry.weight)}>+</button>
                            <button onClick={() => handleDecrease(entry.item, entry.weight)}>-</button>
                            <span> QTY: {entry.count}</span>
                        </div>
                        ) : null
                    ))}

                    
            </div>
            <h2>Total Price</h2>
            <div className='verticalBox'>
                <div className='price'>
                    {isNaN(totalPrice) ? "Error" : `${totalPrice} INR`}
                </div>
                <div className='price'>
                    {`Total Weight: ${totalWeight} g`}
                </div>
                <button className='itemButton' onClick={handleCheckout}>Check Out</button>
            </div>
        </div>
        
    );
};

export default ItemList;

