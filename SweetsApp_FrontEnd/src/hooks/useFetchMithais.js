// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import useRequest from './useRequest';

// const useFetchMithais = () => {
//     const [mithais, setMithais] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { request } = useRequest()

//     useEffect(() => {
//         const fetchMithais = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await request({methodType: 'GET', endpoint: '/mithai'});
//                 setMithais(response.data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMithais();
//     }, []);

//     return { mithais, loading, error };
// };

// export default useFetchMithais;



//******************************************************************************* */

// import { useState, useEffect } from 'react';
// import useRequest from './useRequest';

// const useFetchMithais = () => {
//     const [mithais, setMithais] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { request } = useRequest();
//     const [pricesPerg, setPricesPerg] = useState({});

//     useEffect(() => {
//         const fetchMithais = async () => {                       //sends a promise
//             setLoading(true);
//             setError(null);
//             try {                                    
//                 const response = await request({ methodType: 'GET', endpoint: '/mithai' });  //if promise is resolved (endpoint met), continues down
//                 setMithais(response.data);

                
//                 const updatedPrices = {};
//                 response.data.forEach(mithai => {
//                     updatedPrices[mithai.name] = mithai.rate; 
//                 });
//                 setPricesPerg(updatedPrices);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);   //indicating the fetch operation is complete. Runs regardless
//             }
//         };

//         fetchMithais();
//     }, []);

//     return { mithais, loading, error, pricesPerg };  //hook return this onbject
// };

// export default useFetchMithais;

import { useState, useEffect } from 'react';
import useRequest from './useRequest';

const useFetchMithais = () => {
    const [mithais, setMithais] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { request } = useRequest();
    const [pricesPerg, setPricesPerg] = useState({});

    const cacheKey = 'mithaiData';
    const cacheTimestampKey = 'mithaiDataTimestamp';
    const cacheDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const fetchMithais = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await request({ methodType: 'GET', endpoint: '/mithai' });
            setMithais(response.data);

            const updatedPrices = {};
            response.data.forEach(mithai => {
                updatedPrices[mithai.name] = mithai.rate; 
            });
            setPricesPerg(updatedPrices);

            // Store data and timestamp in localStorage
            localStorage.setItem(cacheKey, JSON.stringify(response.data));         //to convert objects to string. LocalStorage only takes string values 
            localStorage.setItem(cacheTimestampKey, Date.now().toString());
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        
        const checkCacheAndFetch = () => {
            const cachedData = localStorage.getItem(cacheKey);             //getting previously stored data. array of mithai objects
            const cachedTimestamp = localStorage.getItem(cacheTimestampKey);

            if (cachedData && cachedTimestamp) {
                const age = Date.now() - Number(cachedTimestamp);            //how long ago was data cached
                if (age < cacheDuration) {                                 
                    console.log("Using cached mithais data");
                    setMithais(JSON.parse(cachedData));                 //parse; Converting string back to object
                    setPricesPerg(JSON.parse(cachedData).reduce((acc, mithai) => {       // transform the array of mithai objects into a single object.iterates over each element in the array and accumulates a result.
                        acc[mithai.name] = mithai.rate;
                        return acc;
                    }, {})); // This empty object is the initial value for the accumulator.
                    setLoading(false); // No need to load if using cache
                    return; // Exit early
                }
            }

            //For each mithai object in the array, this line adds a new property to the acc object. The property key is the name of the mithai, 
            //and the value is its corresponding rate. This effectively creates a mapping of mithai names to their rates.


            // If no valid cache, fetch new data: calling the api again
            fetchMithais();
        };

        // Initial data fetch or cache check after mount
        //console.log(isLoggedIn);
        
        
            checkCacheAndFetch();
        

    
        const intervalId = setInterval(() => {
            if(isLoggedIn){
                checkCacheAndFetch();
            }
        }, cacheDuration); // 24 hour  will run checkCacheAndFetch evert 24h

        
        return () => clearInterval(intervalId); // Cleanup interval on component unmount. Clears interval
    }, []); 

    return { mithais, loading, error, pricesPerg , fetchMithais};
};

export default useFetchMithais;

