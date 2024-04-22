//import { useState } from "react";
import "../App.css";
import FormInput from "./FormInput";
import { API_BASE_URL } from '../apiConfig';
import { useRef, useState, useEffect } from "react";
import axios from 'axios';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from '../api/axios';
import { Link } from "react-router-dom";

const REGISTER_URL = `${API_BASE_URL}account/register`;

// const Registration = () => {

//     const userRef = useRef();
//     const errRef = useRef();

//     const [errMsg, setErrMsg] = useState('');

//   const [values, setValues] = useState({
//     username: "",
//     email: "",
//     birthday: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const inputs = [
//     {
//       id: 1,
//       name: "username",
//       type: "text",
//       placeholder: "Username",
//       errorMessage:
//         "Username should be 3-16 characters and shouldn't include any special character!",
//       label: "Username",
//       pattern: "^[A-Za-z0-9]{3,16}$",
//       required: true,
//     },
//     {
//       id: 2,
//       name: "email",
//       type: "email",
//       placeholder: "Email",
//       errorMessage: "It should be a valid email address!",
//       label: "Email",
//       required: true,
//     },
//     {
//       id: 3,
//       name: "birthday",
//       type: "date",
//       placeholder: "Birthday",
//       label: "Birthday",
//     },
//     {
//       id: 4,
//       name: "password",
//       type: "password",
//       placeholder: "Password",
//       errorMessage:
//         "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
//       label: "Password",
//       pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
//       required: true,
//     },
//     {
//       id: 5,
//       name: "confirmPassword",
//       type: "password",
//       placeholder: "Confirm Password",
//       errorMessage: "Passwords don't match!",
//       label: "Confirm Password",
//       pattern: values.password,
//       required: true,
//     },
//   ];


//   useEffect(() => {
//     setErrMsg('');
// }, [username, password, matchPassword])

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // if button enabled with JS hack
    
//     try {
//         const response = await axios.post(REGISTER_URL,
//             JSON.stringify({ username, password }),
//             {
//                 headers: { 'Content-Type': 'application/json' },
//                 withCredentials: true
//             }
//         );
//         // TODO: remove console.logs before deployment
//         console.log(JSON.stringify(response?.data));
//         //console.log(JSON.stringify(response))
//         setSuccess(true);
//         //clear state and controlled inputs
//         setEmail('');
//         setPassword('');
//         setMatchPassword('');
//     } catch (err) {
//         if (!err?.response) {
//             setErrMsg('No Server Response');
//         } else if (err.response?.status === 409) {
//             setErrMsg('Username Taken');
//         } else {
//             setErrMsg('Registration Failed')
//         }
//         errRef.current.focus();
//     }
// }

//   const onChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="registration">
//       <form onSubmit={handleSubmit}>
//         <h1>Register</h1>
//         {inputs.map((input) => (
//           <FormInput
//             key={input.id}
//             {...input}
//             value={values[input.name]}
//             onChange={onChange}
//           />
//         ))}
//         <button>Submit</button>
//       </form>
//     </div>
//   );
// };

//  export default Registration;

// import { useRef, useState, useEffect } from "react";
// import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const Password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const REGISTER_URL = '/register';

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
        setvalidEmail(USER_REGEX.test(validEmail));
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
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(validEmail);
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
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
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
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !Email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={Email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && Email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPassword || !Password ? "hide" : "invalid"} />
                        </label>
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
                        <p id="Passwordnote" className={PasswordFocus && !validPassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_Password">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
                        </label>
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
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button disabled={!validEmail || !validPassword || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            <Link to="/">Login</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Registration