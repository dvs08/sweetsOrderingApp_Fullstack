

// import React from 'react';
// import DropDown from './DropDown';
// import JalebiImage from '../images/jalebi.jpg'; 
// import LadduImage from '../images/laddu.jpg';
// import RoshgullaImage from '../images/roshgulla.jpg';
// import KajukatliImage from '../images/kajukatli.jpeg';
// import ItemList from './ItemList';

// class TaskBar extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             openDropdownIndex: null,
//             selectedWeight: null,
//             selectedItem: null,
//             taskBar: ['Jalebi', 'Laddu', 'Roshgulla', 'Kajukatli'],
//             itemQueue: []
//         };
//     }

//     toggleDropdown = (index) => {
//         this.setState((prevState) => ({
//             openDropdownIndex: prevState.openDropdownIndex === index ? null : index
//         }));
//     };

//     handleWeightSelect = (weight) => {
//         this.setState(prevState => {
//             if (prevState.selectedItem) {
//                 const newItem = { item: prevState.selectedItem, weight };

//                 console.log({newItem});
                
    
//                 if (prevState.itemQueue.length >= 5) {
//                     return {
//                         selectedWeight: null, 
//                         selectedItem: null, 
//                         openDropdownIndex: null 
//                     };
//                 }
    
//                 let updatedQueue = [newItem, ...prevState.itemQueue];
    
//                 return {
//                     itemQueue: updatedQueue, 
//                     selectedWeight: newItem.weight, 
//                     openDropdownIndex: null 
//                 };
//             }
//             return { selectedWeight: weight };
//         });
//     };
    

//     handleItemSelected = (item) => {
//         this.setState({
//             selectedItem: item,
//             selectedWeight: null
//         });
//     };


//     renderImages = () => {
//         const { selectedWeight, selectedItem } = this.state;
//         let count = 0;

//         console.log({selectedItem, selectedWeight});
        
//         if (selectedWeight) {
//             count = parseInt(selectedWeight);
//         }

//         const imageMap = {
//             'Jalebi': JalebiImage,
//             'Laddu': LadduImage,
//             'Roshgulla': RoshgullaImage,
//             'Kajukatli': KajukatliImage
//         };

//         const imageSrc = selectedItem ? imageMap[selectedItem] : null;

//         return Array.from({ length: count / 500 }).map((_, i) => (   
//             imageSrc ? (
//                 <img key={i} src={imageSrc} alt={selectedItem} />
//             ) : null
//         ));
//     };

//     render() {
//         const { taskBar, openDropdownIndex, itemQueue } = this.state;

//         return (
//             <div className="header">
//                 <div className="taskbar__container">
//                     {taskBar.map((item, index) => (
//                         <div key={index} className="dropdown-wrapper">
//                             <button
//                                 className='button-task'
//                                 onClick={() => {
//                                     this.toggleDropdown(index);
//                                     this.handleItemSelected(item);
//                                 }}
//                             >
//                                 {item}
//                             </button>
//                             {openDropdownIndex === index && (
//                                 <DropDown onSelectWeight={this.handleWeightSelect} />
//                             )}
//                         </div>
//                     ))}
//                 </div>
//                 <div className="image-container">
//                     {this.renderImages()}
//                 </div>
//                 <ItemList itemQueue={itemQueue} />
//             </div>
//         );
//     }
// }

// export default TaskBar;



///**********************REDUX VERSION******************************* */

// import React from 'react';
// import { connect } from 'react-redux';
// import DropDown from './DropDown';
// import JalebiImage from '../images/jalebi.jpg'; 
// import LadduImage from '../images/laddu.jpg';
// import RoshgullaImage from '../images/roshgulla.jpg';
// import KajukatliImage from '../images/kajukatli.jpeg';
// import ItemList from './ItemList';

// class TaskBar extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             openDropdownIndex: null,
//             selectedWeight: null,
//             selectedItem: null
//         };
//     }

//     toggleDropdown = (index) => {
//         this.setState((prevState) => ({
//             openDropdownIndex: prevState.openDropdownIndex === index ? null : index
//         }));
//     };


//     handleWeightSelect = (weight) => {
//         this.setState(prevState => {
//             if (prevState.selectedItem) {
//                 const newItem = { item: prevState.selectedItem, weight, count: 1 };
//                 const newItemWeight = parseFloat(weight.replace('g', '').trim());
    
//                 // Calculate total weight in the queue
//                 const currentTotalWeight = this.props.itemQueue.reduce((total, entry) => {
//                     const entryWeight = parseFloat(entry.weight.replace('g', '').trim());
//                     return total + (entry.count > 0 ? entryWeight * entry.count : 0);
//                 }, 0);
    
//                 // Check if adding the new item exceeds the weight limit
//                 if (currentTotalWeight + newItemWeight > 10000) {
//                     alert('Max weight limit reached (10,000 g)');
//                     return { selectedWeight: null, openDropdownIndex: null };
//                 }
    
//                 // Check if the item with the specific weight already exists in the queue
//                 const existingItem = this.props.itemQueue.find(entry => 
//                     entry.item === newItem.item && entry.weight === newItem.weight
//                 );
    
//                 if (existingItem) {
//                     // If it exists, increase the count
//                     const updatedQueue = this.props.itemQueue.map(entry =>
//                         entry.item === existingItem.item && entry.weight === existingItem.weight
//                             ? { ...entry, count: entry.count + 1 } // Increase count
//                             : entry
//                     );
    
//                     this.props.dispatch({
//                         type: 'SET_ITEM_QUEUE',
//                         payload: updatedQueue
//                     });
//                 } else {
    
//                     this.props.dispatch({
//                                 type: 'SET_ITEM_QUEUE',
//                                 payload: [...this.props.itemQueue, newItem]
//                             });
//                 }
    
//                 return {
//                     selectedWeight: newItem.weight, 
//                     openDropdownIndex: null 
//                 };
//             }
//             return { selectedWeight: weight };
//         });
//     };
    
    
    

//     handleItemSelected = (item) => {
//         this.setState({
//             selectedItem: item,
//             selectedWeight: null
//         });
//     };

//     renderImages = () => {
//         const { selectedWeight, selectedItem } = this.state;
//         let count = 0;

//         if (selectedWeight) {
//             count = parseInt(selectedWeight);
//         }

//         const imageMap = {
//             'Jalebi': JalebiImage,
//             'Laddu': LadduImage,
//             'Roshgulla': RoshgullaImage,
//             'Kajukatli': KajukatliImage
//         };

//         const imageSrc = selectedItem ? imageMap[selectedItem] : null;

//         return Array.from({ length: count / 500 }).map((_, i) => (   
//             imageSrc ? (
//                 <img key={i} src={imageSrc} alt={selectedItem} />
//             ) : null
//         ));
//     };

//     render() {
//         const { openDropdownIndex } = this.state;

//         return (
//             <div className="header">
//                 <div className="taskbar__container">
//                     {this.props.taskBar.map((item, index) => (
//                         <div key={index} className="dropdown-wrapper">
//                             <button
//                                 className='button-task'
//                                 onClick={() => {
//                                     this.toggleDropdown(index);
//                                     this.handleItemSelected(item);
//                                 }}
//                             >
//                                 {item}
//                             </button>
//                             {openDropdownIndex === index && (
//                                 <DropDown onSelectWeight={this.handleWeightSelect}  />
//                             )}
//                         </div>
//                     ))}
//                 </div>
//                 <div className="image-container">
//                     {this.renderImages()}
//                 </div>
//                 <ItemList />
//             </div>
//         );
//     }
// }

// const mapStateToProps = (state) => ({
//     itemQueue: state.itemQueue,
// });

// export default connect(mapStateToProps)(TaskBar);


//********Fetching data ******************/

import React, { useState } from 'react';
import { connect } from 'react-redux';
import DropDown from './DropDown';
import ItemList from './ItemList';
import useFetchMithais from '../hooks/useFetchMithais';
import { Atom } from 'react-loading-indicators';

const TaskBar = ({ itemQueue, dispatch}) => {
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [selectedWeight, setSelectedWeight] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedMithaiImage, setSelectedMithaiImage] = useState(null);
    const [availableWeights, setAvailableWeights] = useState([]);

    //console.log({isLoggedIn});
    

    const { mithais, loading, error } = useFetchMithais(); // Use the hook here

    const toggleDropdown = (index) => {
        setOpenDropdownIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const handleWeightSelect = (weight) => {
        if (selectedItem) {
            const newItem = { item: selectedItem, weight, count: 1};
            const newItemWeight = parseFloat(weight.replace('g', '').trim());

            const currentTotalWeight = itemQueue.reduce((total, entry) => {
                const entryWeight = parseFloat(entry.weight.replace('g', '').trim());
                return total + (entry.count > 0 ? entryWeight * entry.count : 0);
            }, 0);         

            if (currentTotalWeight + newItemWeight > 10000) {
                alert('Max weight limit reached (10,000 g)');
                return;
            }

            const existingItem = itemQueue.find((entry) => 
                entry.item === newItem.item && entry.weight === newItem.weight
            );

            if (existingItem) {
                const updatedQueue = itemQueue.map((entry) =>       //for each entry in itemQueue == i
                    entry.item === existingItem.item && entry.weight === existingItem.weight
                        ? { ...entry, count: entry.count + 1 }          //adds all entry and updates count++
                        : entry
                );

                dispatch({
                    type: 'SET_ITEM_QUEUE',
                    payload: updatedQueue,
                });
            } else {
                dispatch({
                    type: 'SET_ITEM_QUEUE',
                    payload: [...itemQueue, newItem],
                });
            }

            setSelectedWeight(newItem.weight);
            setOpenDropdownIndex(null);
        } else {
            setSelectedWeight(weight);
        }
    };

    const handleItemSelected = (mithai) => {
        
        setSelectedItem(mithai.name);
        setSelectedWeight(null);
        setSelectedMithaiImage(mithai.image);
        setAvailableWeights(getAvailableWeights(mithai));
    };

    const getAvailableWeights = (mithai) => {
        const weights = [];
        if (mithai.availableQuantity250g > 0) weights.push('250g');
        if (mithai.availableQuantity500g > 0) weights.push('500g');
        if (mithai.availableQuantity1000g > 0) weights.push('1000g');
        if (mithai.availableQuantity2000g > 0) weights.push('2000g');
        return weights;
    };

    const renderImages = () => {
        const count = selectedWeight ? parseInt(selectedWeight.replace('g', '')) : 0;

        return Array.from({ length: count / 250 }).map((_, i) => (
            selectedMithaiImage ? (
                <img key={i} src={selectedMithaiImage} alt={selectedItem} />
            ) : null
        ));
    };

    if (loading) return <div className='indic'> <Atom color="#3176cc" size="large" text="" textColor="#b70eb7"/></div>
    if (error) return <div>Error loading mithais: {error}</div>;

    return (
        <div className="header">
            <div className="taskbar__container">
                {mithais.map((mithai, index) => (
                    <div key={mithai.id} className="dropdown-wrapper">
                        <button
                            className='button-task'
                            onClick={() => {
                                toggleDropdown(index);
                                handleItemSelected(mithai);
                            }}
                        >
                            {mithai.name}
                        </button>
                        {openDropdownIndex === index && (
                            <DropDown 
                                onSelectWeight={handleWeightSelect} 
                                weights={availableWeights} 
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className="image-container">
                {renderImages()}
            </div>
            <ItemList mithai={mithais} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    itemQueue: state.itemQueue,
});

export default connect(mapStateToProps)(TaskBar);

