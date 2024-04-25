import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';




import { useAuth } from "./authProvider";
import './AuthProvider.css';

const Login = () => {
   

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
           
          
            const token = response?.data?.token;
            
           

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

        <div className="auth-container">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
               
            <label htmlFor="Email">Email:</label>
                <h2 >
                
                <input
                    type="text"
                    id="Email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={Email}
                    required
                />

                </h2>
                <label htmlFor="password">Password:</label>
                <h2>
                
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={Password}
                    required
                />
                </h2>
                
                <>
                <button>Login</button>
                </>
               
            </form>
            <p>
                Need an Account?<br />
                
                    <Link to="/registration">Registration</Link>
                
            </p>
        </div>

    )
}

export default Login