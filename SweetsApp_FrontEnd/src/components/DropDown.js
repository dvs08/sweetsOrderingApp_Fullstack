// import React from 'react';

// const weights = ['500g', '1000g', '1500g', '2000g']; 

// const DropDown = ({ onSelectWeight }) => {
//     return (
//         <div className='dropdown-content'>
//             <ul>
//                 {weights.map(weight => (
//                     <li key={weight}>
//                         <button className='button-Gram' onClick={() => onSelectWeight(weight)}>
//                             {weight}
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default DropDown;

import React from 'react';

const DropDown = ({ onSelectWeight, weights }) => {
    return (
        <div className='dropdown-content'>
            <ul>
                {weights.map(weight => (
                    <li key={weight}>
                        <button className='button-Gram' onClick={() => onSelectWeight(weight)}>
                            {weight}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DropDown;
