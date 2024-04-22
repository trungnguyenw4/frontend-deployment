import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";


import './index.css';
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(<App />, document.getElementById('root'));


//this one works
root.render(
  
    <BrowserRouter>
      <App />
    </BrowserRouter>
 
);

// import React from "react"
// import ReactDOM from "react-dom/client"
// import App from "./App"
// import "./styles.css"


// const root = ReactDOM.createRoot(document.getElementById("root"))
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// )