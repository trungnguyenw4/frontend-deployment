import { useRef, useState, useEffect } from 'react';


import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';
//import axios from '../api/axios';



import { useAuth } from "./authProvider2";

// const Login = () => {
//   const { setToken } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     setToken("this is a test token");
//     navigate("/", { replace: true });
//   };

//   setTimeout(() => {
//     handleLogin();
//   }, 3 * 1000);

//   return <>Login Page</>;
// };

// export default Login;



const Login = () => {
    //const { setAuth } = useAuth();

    const { setToken } = useAuth();
  

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();



    const [Email, setEmail] = useState('');
    const [Password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [Email, Password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_BASE_URL}account/login`,
                JSON.stringify({ Email, Password }),
                {
                    headers: { 'Content-Type': 'application/json' }
                    
                }
            );
            console.log(JSON.stringify(response?.config));
            //console.log(JSON.stringify(response));
            const token = response?.data?.token;
            
            //const roles = response?.data?.roles;

            console.log(JSON.stringify(token));
            //setAuth({ user, pwd, roles, accessToken });

            //setAuth({ Email, Password, accessToken });
            sessionStorage.setItem('token', JSON.stringify(token))
            
            setToken('');
            setEmail('');
            setPwd('');
           
            navigate(from, { replace: true });
            window.location.reload();
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }



    return (

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Email">Email:</label>
                <input
                    type="text"
                    id="Email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={Email}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={Password}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                
                    {/* <Link to="/register">Sign Up</Link> */}
                    <Link to="/registration">Registration</Link>
                
            </p>
        </section>

    )
}

export default Login