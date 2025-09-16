// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// import Header from './Header';
// import TaskBar from './Taskbar';
// import ItemList from './ItemList';
// import { setTotalPrice } from '../actions/itemActions';

// const pricesPer500g = {
//   'Jalebi': 200,
//   'Laddu': 400,
//   'Roshgulla': 600,
//   'Kajukatli': 800
// };

// class InnoteMithai extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       redirectToCheckout: false
//     };
//   }

//   handleCheckOut = () => {
//     const { itemQueue, setTotalPrice } = this.props;
    
//     const totalPrice = (itemQueue || []).reduce((total, entry) => {
//       const weightInUnits = parseFloat(entry.weight.replace('g', '').trim()) / 500;
//       const pricePerUnit = pricesPer500g[entry.item] || 0;
//       return total + (weightInUnits * pricePerUnit);
//     }, 0);

//     setTotalPrice(totalPrice);
//     this.setState({ redirectToCheckout: true });
//   };

//   render() {
//     const { itemQueue } = this.props;
//     const { redirectToCheckout } = this.state;

//     if (redirectToCheckout) {
//       return (
//         <Navigate
//           to="/checkout"
//           replace
//         />
//       );
//     }

//     const taskBar = this.props.taskBar || ['Jalebi', 'Laddu', 'Roshgulla', 'Kajukatli'];

//     return (
//       <div>
//         <Header title="InNote FE Mithaiwala" />
//         <TaskBar taskBar={taskBar} />
//         <ItemList itemQueue={itemQueue} />
//         <div>
//           <button onClick={this.handleCheckOut} className='itemButton'>Check Out</button>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   itemQueue: state.items.itemQueue,
  
//   totalPrice: state.items.totalPrice //totalPrice from Redux state
// });

// const mapDispatchToProps = (dispatch) => ({
//   setTotalPrice: (price) => dispatch(setTotalPrice(price))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(InnoteMithai);


//*********************************************************************** */

// import React, { Component } from 'react';
// import { Navigate } from 'react-router-dom';
// import Header from './Header';
// import TaskBar from './Taskbar';
// import ItemList from './ItemList';

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

// class InnoteMithai extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             itemQueue: this.props.taskBar ? this.props.taskBar.map(item => ({ item, weight: '500g' })) : [],
//             redirectToCheckout: false,
//             totalPrice: 0
//         };
//     }

//     handleCheckOut = () => {
//         const { itemQueue } = this.state;
//         console.log({itemQueue});
        
//         const totalPrice = itemQueue.reduce((total, entry) => {
//             if (entry.item && entry.weight) {
//                 const price = calculatePrice(entry.item, entry.weight);
//                 return total + price;
//             }
//             return total;
//         }, 0);

//         this.setState({ totalPrice, redirectToCheckout: true });
//     };

//     render() {
//         const { itemQueue, redirectToCheckout, totalPrice } = this.state;

//         if (redirectToCheckout) {
//             localStorage.setItem('state', JSON.stringify({itemQueue, totalPrice}))

//             console.log({itemQueue, totalPrice});
            
//             return (
//                 <Navigate
//                     to="/checkout"
//                     state={{ itemQueue, totalPrice }}  // Ensure state is passed here
//                     replace
//                 />
//             );
//         }

//         const taskBar = this.props.taskBar || ['Jalebi', 'Laddu', 'Roshgulla', 'Kajukatli'];

//         return (
//             <div>
//                 <Header title="InNote FE Mithaiwala" />
//                 <TaskBar taskBar={taskBar} />
//                 <ItemList  />
//                 <div>
//                     <button onClick={this.handleCheckOut} className='itemButton'>Check Out</button>
//                 </div>
//             </div>
//         );
//     }
// }

// export default InnoteMithai;




//***************************************************New*******************************************************


import React from 'react';
import Header from './Header';
import TaskBar from './Taskbar';

const InnoteMithai = () => {
    //const taskBar = ['Jalebi', 'Laddu', 'Roshgulla', 'Kajukatli'];

    return (
        <div>
            <Header title="InNote FE Mithaiwala" />
            <TaskBar/>
        </div>
    );
};


export default InnoteMithai;
