
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './redux/store';
// import 'normalize.css/normalize.css';
// import './styles/styles.scss';
// import Login from './components/Login';
// import InnoteMithai from './components/InnoteMithai';
// import CheckOut from './components/CheckOut';
// import Success from './components/success';


// const App = () => (
//     <Provider store={store}>
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Login />} />


//                 <Route path="/mithaiwala" element={<InnoteMithai />} />
//                 <Route path="/checkout" element={<CheckOut/>} />
//                 <Route path="/success" element={<Success />} /> 
//             </Routes>
//         </Router>
//     </Provider>
// );

// ReactDOM.render(<App />, document.getElementById('app'));

//************************************************** */

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './redux/store';
// import 'normalize.css/normalize.css';
// import './styles/styles.scss';
// import Login from './components/Login';
// import InnoteMithai from './components/InnoteMithai';
// import CheckOut from './components/CheckOut';
// import Success from './components/success';
// import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute

// const App = () => {
//     return (
//         <Provider store={store}>
//             <Router>
//                 <Routes>
//                     <Route path="/" element={<Login />} />
//                     <Route
//                         path="/mithaiwala"
//                         element={
//                             <ProtectedRoute>
//                                 <InnoteMithai />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/checkout"
//                         element={
//                             <ProtectedRoute>
//                                 <CheckOut />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/success"
//                         element={
//                             <ProtectedRoute>
//                                 <Success />
//                             </ProtectedRoute>
//                         }
//                     />
//                 </Routes>
//             </Router>
//         </Provider>
//     );
// };
    
   

// ReactDOM.render(<App />, document.getElementById('app'));

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import Login from './components/Login';
import InnoteMithai from './components/InnoteMithai';
import CheckOut from './components/CheckOut';
import Success from './components/success';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {


    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route 
                        path="/" 
                        element={<Login/>} 
                    />
                    <Route
                        path="/mithaiwala"
                        element={
                            <ProtectedRoute>
                                <InnoteMithai /> 
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            <ProtectedRoute>
                                <CheckOut />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/success"
                        element={
                            <ProtectedRoute>
                                <Success />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));

