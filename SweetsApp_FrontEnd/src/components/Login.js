
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import logoImg from '../images/innovaccer_logo_rsz.jpg';

// const Login = () => {
//     const navigate = useNavigate();

//     const handleLogin = (event) => {
//         event.preventDefault();


//         const username = event.target.username.value;
//         const password = event.target.password.value;

    
//         if (username === 'user' && password === 'password') {
//             navigate('/mithaiwala');
//         } else {
//             alert('Invalid credentials');
//         }
//     };

//     return (
//         <div className="login-container">
//             <h1>Welcome to Innovaccer Mithaiwala</h1>
//             <img src={logoImg} className="logo" />
            
//             <form className="login-form" onSubmit={handleLogin}>
//                 <label>Username:</label>
//                 <input type="text" id="username" name="username" />

//                 <label>Password:</label>
//                 <input type="password" id="password" name="password" />

//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;

// Login.js
import React from 'react';
import useLogin from '../hooks/useLogin'; // Import the custom hook
import logoImg from '../images/innovaccer_logo_rsz.jpg'; // Update this path as necessary

const Login = () => {
    const { handleLogin, loading, error } = useLogin(); // Use the custom hook

    const onSubmit = (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        handleLogin(username, password); // Call the handleLogin function
    };

    return (
        <div className="login-container">
            <h1>Welcome to Innovaccer Mithaiwala</h1>
            <img src={logoImg} className="logo" />
            
            <form className="login-form" onSubmit={onSubmit}>
                <label>Username:</label>
                <input type="text" id="username" name="username" required autoComplete='username'/>

                <label>Password:</label>
                <input type="password" id="password" name="password" required autoComplete='new-password'/>

                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
};

export default Login;

