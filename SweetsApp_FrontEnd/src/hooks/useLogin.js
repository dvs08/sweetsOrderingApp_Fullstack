// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const useLogin = () => {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleLogin = async (username, password) => {             //async func returns a promise
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await axios.post('http://10.10.5.25:3000/login', {        // await waits till promise is either resolved or rejected
//                 username,
//                 password,
//             });
            
//             const { token } = response.data;                                      
//             console.log("Login successful, token:", token);
//             localStorage.setItem('token', token);
//             navigate('/mithaiwala');
//         } catch (err) {
//             setError('Invalid credentials');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { handleLogin, loading, error };
// };

// export default useLogin;
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useFetchMithais from './useFetchMithais';

const useLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {fetchMithais} = useFetchMithais();

    const handleLogin = (username, password) => {
        setLoading(true);
        setError(null);

        axios.post('http://10.10.5.36:5002/login', {
            username,
            password,
        })
        .then(response => {
            const { token } = response.data;
            console.log("Login successful, token:", token);
            localStorage.setItem('token', token);
            fetchMithais();
            navigate('/mithaiwala');
        })
        .catch(() => {
            setError('Invalid credentials');
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return { handleLogin, loading, error };
};

export default useLogin;

