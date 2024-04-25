
import { API_BASE_URL } from '../../apiConfig';
import { useRef, useState, useEffect } from "react";
import axios from 'axios';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './AuthProvider.css';

const REGISTER_URL = `${API_BASE_URL}account/register`;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const Password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const Registration = () => {
   

    const userRef = useRef();
    const errRef = useRef();

    const [Email, setEmail] = useState('');

    const [validEmail, setvalidEmail] = useState(false);

    const [userFocus, setEmailFocus] = useState(false);

    const [Password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [PasswordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setvalidEmail(EMAIL_REGEX.test(Email));
        console.log(EMAIL_REGEX.test(Email));
    }, [validEmail])



    useEffect(() => {
        setValidPassword(Password_REGEX.test(Password));
        setValidMatch(Password === matchPassword);
    }, [Password, matchPassword])

    useEffect(() => {
        setErrMsg('');
    }, [validEmail, Password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const v1 = EMAIL_REGEX.test(Email);
        const v2 = Password_REGEX.test(Password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ Email, Password }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
           
            
            setSuccess(true);
            //clear state and controlled inputs
            setvalidEmail('');
            setPassword('');
            setMatchPassword('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Email alreadly Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>A verification link has been sent to your mail box. Please check and follow the instructions."</h1>                
                </section>
            ) : (
                <section className="auth-container">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>

              

                    <label htmlFor="password" >
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !Email ? "hide" : "invalid"} />
                        </label>

                        <h2>
               

                        <input
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={Email}
                            required
                            aria-invalid={Email ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                   

                        </h2>

                        <h2>
                        <p id="uidnote" className={userFocus && Email && !validEmail ? "instructionEmail" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Invalid email format <br />  
                        </p>

                        </h2>


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPassword || !Password ? "hide" : "invalid"} />
                        </label>
                
                        <h2>

                   
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={Password}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="Passwordnote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p id="Passwordnote" className={PasswordFocus && !validPassword ? "instructionPassword" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.
                            Must include uppercase and lowercase letters, 
                             a number and a special character ( !, @, #, $, %)

                        </p>

                        </h2>

                        <label htmlFor="confirm_Password">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
                        </label>

                        <h2>

                
                        <input
                            type="password"
                            id="confirm_Password"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPassword}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                   
                        </h2>
                        
                        <h2>     <p id="confirmnote" className={matchFocus && !validMatch ? "instructionConfirmPassword" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Password must match.
                        </p></h2>


                       

                        <button disabled={!validEmail || !validPassword || !validMatch ? true : false}>Register</button>
                        {/* <button >Sign Up</button> */}
                    </form>
 
                </section>
            )}
        </>
    )
}

export default Registration