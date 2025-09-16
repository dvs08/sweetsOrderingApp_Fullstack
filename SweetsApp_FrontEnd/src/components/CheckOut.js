// import React from 'react';
// import { connect } from 'react-redux';
// import { useLocation } from 'react-router-dom';

// const CheckOut = ({ itemQueue, totalPrice }) => {
//   return (
//     <div className='checkout'>
//       <h2>Item List</h2>
//       <div className='item'>
//         {itemQueue.map((entry, index) => (
//           <div key={index} className='itemDetail'>
//             {`${entry.item}: ${entry.weight} - ${calculatePrice(entry.item, entry.weight)} INR`}
//           </div>
//         ))}
//       </div>
//       <h2>Total Price</h2>
//       <div className='price'>
//         {isNaN(totalPrice) ? "Error" : `${totalPrice} INR`}
//       </div>
//       <button className='itemButton'>Proceed</button>
//     </div>
//   );
// };

// const calculatePrice = (item, weight) => {
//   const weightInUnits = parseFloat(weight.replace('g', '').trim()) / 500;
//   const pricesPer500g = {
//     'Jalebi': 200,
//     'Laddu': 400,
//     'Roshgulla': 600,
//     'Kajukatli': 800
//   };
//   const pricePerUnit = pricesPer500g[item] || 0;
//   return weightInUnits * pricePerUnit;
// };

// const mapStateToProps = (state) => ({
//   itemQueue: state.items.itemQueue,
//   totalPrice: state.items.totalPrice
// });

// export default connect(mapStateToProps)(CheckOut);

// import React, { Component } from 'react';
// import { useLocation } from 'react-router-dom';

// const pricesPer500g = {
//     'Jalebi': 200,
//     'Laddu': 400,
//     'Roshgulla': 600,
//     'Kajukatli': 800,
// };

// const calculatePrice = (item, weight) => {
//     const weightInUnits = parseFloat(weight.replace('g', '').trim()) / 500;
//     const pricePerUnit = pricesPer500g[item] || 0;
//     return weightInUnits * pricePerUnit;
// };

// class CheckOut extends Component {

//     render() {
//         // Extract location state from props
//         const { location } = this.props;
//         const { state } = location || {}; 
//         const { itemQueue = [], totalPrice = 0 } = state || {};

//         const g=JSON.parse(localStorage.getItem('state'));
//         console.log({g});
        


//         return (
//             <div className='checkout'>
//                 <h2>Item List</h2>
//                 <div className='item'>
//                     {itemQueue.map((entry, index) => (
//                         <div key={index} className='itemDetail'>
//                             {`${entry.item}: ${entry.weight} - ${calculatePrice(entry.item, entry.weight)} INR`}
//                         </div>
//                     ))}
//                 </div>
//                 <h2>Total Price</h2>
//                 <div className='price'>
//                     {isNaN(totalPrice) ? "Error" : `${totalPrice} INR`}
//                 </div>
//                 <button className='itemButton'>Proceed</button>
//             </div>
//         );
//     }
// }

// const CheckOutWrapper = (props) => {
//     const location = useLocation();
//     return <CheckOut {...props} location={location} />;
// };

// export default CheckOutWrapper;
                                                                                         

//**********************************OLD FINAL REDUX************************************************************* */

// import React from 'react';
// import { connect } from 'react-redux';
// import { pricesPer500g } from './prices';
// import { useNavigate } from 'react-router-dom'; 

// const CheckOut = ({ itemQueue }) => {
//     const navigate = useNavigate(); 

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

//     const handleProceed = () => {
        
//         navigate('/success'); 
//     };
//     const handleBack = () =>{

//         navigate('/mithaiwala');
//     }

//     return (


//         <div className='outerBox'>

//                     <h1 className='fontSize'>Thank You For Ordering ! </h1>
//                     <h3 className='subtile'>Please Proceed</h3>
//                 <div className='mainItem'>

//                     <h2>Item List</h2>
//                     <div className='item'>
//                         {itemQueue.length === 0 ? (
//                             <p>Please Add To Cart</p>
//                         ) : (
//                             itemQueue.map((entry, index) => (
//                                 <button key={index} className='itemButton'>
//                                     {`${entry.item}: ${entry.weight} - ${entry.weight && pricesPer500g[entry.item] ? calculatePrice(entry.item, entry.weight) : 'N/A'} INR`}
//                                 </button>
//                             ))
//                         )}
//                     </div>
//                     <h2>Total Price</h2>
//                     <div className='verticalBox'>
//                         <div className='price'>
//                             {isNaN(totalPrice) ? "Error" : `${totalPrice} INR`}
//                         </div>
//                         <button className='itemButton' onClick={handleProceed} disabled ={itemQueue.length === 0}>
//                             Proceed
//                         </button>
//                         <button className='itemButton' onClick={handleBack}> Back</button>
//                     </div>
//                 </div>


//         </div>

        
//     );
// };

// const mapStateToProps = (state) => ({
//     itemQueue: state.itemQueue
// });

// export default connect(mapStateToProps)(CheckOut);



//************************** */


// import React , {useState} from 'react';
// import { connect } from 'react-redux';
// import { useNavigate } from 'react-router-dom';  
// import useRequest from '../hooks/useRequest';
// import { useDispatch } from 'react-redux';

// const CheckOut = ({ itemQueue }) => {
//     const navigate = useNavigate(); 
//     const {request} = useRequest();
//     const dispatch = useDispatch();
//     const [error, setError] = useState();

    
//     const  mithais  = JSON.parse(localStorage.getItem('mithaiData'));
//     console.log(mithais);
    
//     const ids = mithais.map(mithai => mithai.id);
//     console.log(ids);

//     const calculatePrice = (item, weight) => {
//         const weightInUnits = parseFloat(weight.replace('g', '').trim()) / 1000;
//         const mithaiItem = mithais.find(mith => mith.name === item);
//         const pricePerUnit = mithaiItem?.rate || 0;
//         return weightInUnits * pricePerUnit;
//     };

//     const calculateTotalPrice = () => {
//         return itemQueue.reduce((total, entry) => {
//             if (entry.item && entry.weight && entry.count > 0) {
//                 const price = calculatePrice(entry.item, entry.weight);
//                 return total + price * entry.count; 
//             }
//             return total;
//         }, 0);
//     };

//     const totalPrice = calculateTotalPrice();

//     // const handleProceed = () => {

//     //     if(itemQueue.length == 0 || totalPrice == 0){

//     //         alert('Please Add to Cart');
            
//     //     }

//     //     else{
//     //     navigate('/success'); 
//     //     }
//     // };
   
//     const handleProceed = async () => {

//         const mithaiItems = itemQueue.map(entry => ({
//             mithaiId: mithais.find((mith) => mith.name === entry.item)?.id, 
//             quantity: entry.count,
//             weight: entry.weight,
//         }));

//         console.log(mithaiItems); 

//         try {
//             // Send POST request to backend
//             const response = await request({

//                 methodType: 'POST',
//                 endpoint: '/purchase',  //check on this
//                 payload: {

//                     mithaiItems,
//                 }

//             }); 
            
//             console.log(response);
//             console.log(response.data);
//             console.log(response.data.invoice.invoiceNumber);
//             // Check if response is successful
//             if (response.status === 201) {
                
//                 localStorage.setItem("invoiceNo", response.data.invoice.invoiceNumber);
//                 navigate('/success'); // Navigate to success page
//             } else {

//                 setError('Transaction failed');
        
//             }
//         } catch (error) {
//             console.error('Error sending data to the server:', error.response.data.error);
//             setError(error.response.data.error);
//         }
//     };

//     const handleBack = () => {
//         navigate('/mithaiwala');
//     };
//     const handleReturn = () => {
        
        
//         dispatch({
//             type: 'RESET_ITEM_QUEUE',
//         });
    
        
//         navigate('/');
//     };

//     const handleHome = () => {

//             dispatch({

//                 type: 'RESET_ITEM_QUEUE',
//             });
//             navigate('/mithaiwala');

//     };

//     return (
        
//        <div>
//          <div className="logout">
//                 <button className='returnB' onClick={handleHome}>Home</button>
//                 <button className='returnB' onClick={handleReturn}>LogOut</button>
//         </div>
//         <div className='outerBox'>
           
//             <h1 className='fontSize'>Review your cart!</h1>
//             <h3 className='subtitle'>Please Proceed</h3>
//             <div className='mainItem'>
//                 <h2>Item List</h2>
//                 <div className='item'>
//                     {itemQueue.length === 0 ? (
//                         <p>Please Add To Cart</p>
//                     ) : (
//                         itemQueue.map((entry, index) => (
//                             <div key={index} className='itemContainer'>
//                                 <button className='itemButton'>
//                                     {`${entry.item}: ${entry.weight} - ${calculatePrice(entry.item, entry.weight) * entry.count} INR`} 
//                                 </button>
//                                 <span> (Quantity: {entry.count})</span>
//                             </div>
//                         ))
//                     )}
//                 </div>
//                 <h2>Total Price</h2>
//                 <div className='verticalBox'>
//                     <div className='price'>
//                         {isNaN(totalPrice) ? "Error" : `${totalPrice} INR`}
//                     </div>
//                     <button className='itemButton' onClick={handleProceed}>
//                         Proceed
//                     </button>
//                     <button className='itemButton' onClick={handleBack}>Back</button>
//                 </div>
//             </div>
            
//             {error && <div className="errorMes">{error}</div>}
           
            
//         </div>

//     </div>
//     );
// };

// const mapStateToProps = (state) => ({
//     itemQueue: state.itemQueue,
// });

// export default connect(mapStateToProps)(CheckOut);


import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';  
import useRequest from '../hooks/useRequest';
import { useDispatch } from 'react-redux';

const CheckOut = ({ itemQueue }) => {
    const navigate = useNavigate(); 
    const { request , isLoading} = useRequest();
    const dispatch = useDispatch();
    const [error, setError] = useState();
    const [attemptProceed, setAttemptProceed] = useState(false);

    const mithais = JSON.parse(localStorage.getItem('mithaiData'));
    
    const calculatePrice = (item, weight) => {
        const weightInUnits = parseFloat(weight.replace('g', '').trim()) / 1000;
        const mithaiItem = mithais.find(mith => mith.name === item);
        const pricePerUnit = mithaiItem?.rate || 0;
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

    const totalPrice = calculateTotalPrice();

    const handleProceed = async () => {

        
        if (itemQueue.length === 0 || totalPrice === 0) {
            //alert('Please add to cart');
            setError('Please add to cart');
            return;
        }
    
        // Only proceed if there are items in the queue
        const mithaiItems = itemQueue.map(entry => ({
            mithaiId: mithais.find((mith) => mith.name === entry.item)?.id, 
            quantity: entry.count,
            weight: entry.weight,
        }));
    
        try {
            const response = await request({
                methodType: 'POST',
                endpoint: '/purchase',
                payload: { mithaiItems },
            });
    
            if (response.status === 201) {
                localStorage.setItem("invoiceNo", response.data.invoice.invoiceNumber);
                navigate('/success');
            } else {
                setError('Transaction failed');
                setAttemptProceed(true);
            }
        } catch (error) {
            console.error('Error sending data to the server:', error.response.data.error);
            setError(error.response.data.error);
            setAttemptProceed(true);
        }
    };
    

    const handleBack = () => {
        navigate('/mithaiwala');
    };

    const handleReturn = () => {
        dispatch({ type: 'RESET_ITEM_QUEUE2' });
        navigate('/');
    };

    const handleHome = () => {
        dispatch({ type: 'RESET_ITEM_QUEUE' });
        navigate('/mithaiwala');
    };

    const handleRemoveItem = (item) => {
        const updatedQueue = itemQueue.filter(entry => entry.item !== item);
        dispatch({ type: 'SET_ITEM_QUEUE', payload: updatedQueue });
    };

    return (
       <div>
         <div className="logout">
                <button className='returnB' onClick={handleHome}>Home</button>
                <button className='returnB' onClick={handleReturn}>LogOut</button>
        </div>
        <div className='outerBox'>
            <h1 className='fontSize'>Review your cart!</h1>
            <h3 className='subtitle'>Please Proceed</h3>
            <div className='mainItem'>
                <h2>Item List</h2>
                <div className='item'>
                    {itemQueue.length === 0 ? (
                        <p>Please Add To Cart</p>
                    ) : (
                        itemQueue.map((entry, index) => {
                            const mithaiItem = mithais.find(mith => mith.name === entry.item);
                           //console.log(mithaiItem, entry);
                            const availabilityKey = `availableQuantity${entry.weight}`;
                            const availableQuantity = mithaiItem[availabilityKey];
                            const isUnavailable = availableQuantity < entry.count; 
                          
                            console.log(mithaiItem);
                            console.log(entry);
                           // console.log(mithaiItem, entry);
                            //console.log(isUnavailable);
                            return (
                                <div key={index} className='itemContainer'>
                                    <button className='itemButton'>
                                        {`${entry.item}: ${entry.weight} - ${calculatePrice(entry.item, entry.weight) * entry.count} INR`} 
                                    </button>
                                    <span> (Quantity: {entry.count})</span>
                                    {attemptProceed && isUnavailable && (
                                        <button className='removeButton' onClick={() => handleRemoveItem(entry.item)}>
                                            Remove
                                        </button>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
                <h2>Total Price</h2>
                <div className='verticalBox'>
                    <div className='price'>
                        {isNaN(totalPrice) ? "Error" : `${totalPrice} INR`}
                    </div>
                    <button className='itemButton' onClick={handleProceed} disabled={isLoading}>
                        Proceed
                    </button>
                    <button className='itemButton' onClick={handleBack}>Back</button>
                </div>
            </div>
            
            {error && <div className="errorMes">{error}</div>}
        </div>
    </div>
    );
};

const mapStateToProps = (state) => ({
    itemQueue: state.itemQueue,
});

export default connect(mapStateToProps)(CheckOut);

