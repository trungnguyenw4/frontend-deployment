import React from 'react';
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';

//import SingleProp from './components/SingleProp';
import NewsBoard from './components/NewsBoard';

import Navbar from "./Navbar"

//import Navbar from "./components/Navbar/NavBar2"

import Pricing from "./components/Pricing"
import InsuranceBrokers from "./components/InsuranceBrokerMap/InsuranceBrokers"
import About from "./components/About"
import Registration from './components/Registration';

import AuthProvider from "./components/authProvider2";
import Customers from './components/Customers/Customers';

// import Unauthorized from './components/Unauthorized';
// //import Lounge from './components/Lounge';
// //import LinkPage from './components/LinkPage';
// import RequireAuth from './components/RequireAuth';


//import AuthProvider from "./provider/authProvider";
//import { Switch } from "react-router-dom"
//import Routes from "./components/routeHook";

// function App() {
//   return (
//     <AuthProvider>
//      <Route path="login" element={<Login />} />
//     </AuthProvider>
//   );
// }

// export default App;

//import { API_BASE_URL } from '../apiConfig';




// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
        
//         <Route path='/' component={<NewsBoard/>} />
//         <Route path='/pricing' component={<Pricing />} />
//         <Route path='/registration' component={<Registration />} />
//         <Route path='/login' component={<AuthProvider>
//                                                <Login />
//                                              </AuthProvider>} />
//         <Route path='/Customers' component={<AuthProvider>
//                                                <Customers />
//                                              </AuthProvider>} />
//         <Route path='/about' component={<About />} />
//       </Routes>
//     </Router>
//   );
// }

//the one below works:



function App() {
  return (
    <>
    <Navbar/>
    
      <div className="container">
        <Routes>
          <Route path="/" element={<NewsBoard/>} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={    <AuthProvider>
                                              <Login />
                                            </AuthProvider>} />
          <Route path="/Logout" element={    <AuthProvider>
                                              <Logout />
                                      </AuthProvider>} />
          
          <Route path="/Registration" element={    <AuthProvider>
                                              <Registration />
          </AuthProvider>} />

          <Route path="/InsuranceBrokers" element={    <AuthProvider>
                                              <InsuranceBrokers />
          </AuthProvider>} />

          <Route path="/InsuranceBrokers" element={ <AuthProvider>
                                                <InsuranceBrokers/>
                                        </AuthProvider> } />

          <Route path= "/Customers"  element={    <AuthProvider>
                                              <Customers />
                                            </AuthProvider>} />

          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    <>
    <>
    <>
        </>
          <p>Something in the middle</p>
        </>
        <>
            <h1>MAPS!</h1>
            <p>Please see map below</p>
            <iframe
              width="600"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              allowfullscreen
              // src="https://www.google.com/maps/embed/v1/place?q=LifeInsurance&key=AIzaSyD3VRRx9jjP6qfGLDK_KYf_EU8OpduSobI"
            />
        </>
    </>
    </>
    
  )
}

export default App






// import React from "react";
// import { Navigate  } from "react-router-dom";

// import CustomRoute from "./components/CustomRoute";
// import MainIndex from "./components/MainIndex";
// import LoginPage from "./components/LoginPage";
// import RestrictedPage from "./components/RestrictedPage";
// import OnlyTeacher from "./components/OnlyTeacher";
// import OnlyStudent from "./components/OnlyStudent";

// // import NewsBoard from './components/NewsBoard';


// export const App = () => {
//   return (
    
//     <>
    
//       <Navigate>
//         <CustomRoute exact path="/index" component={MainIndex} />
//         <CustomRoute
//           condition="signedIn"
//           exact
//           path="/restricted"
//           component={RestrictedPage}
//         />
//         <CustomRoute
//           condition="teacher"
//           exact
//           path="/only-teacher"
//           component={OnlyTeacher}
//         />
//         <CustomRoute
//           condition="student"
//           exact
//           path="/only-student"
//           component={OnlyStudent}
//         />
//         <CustomRoute exact path="/login" component={LoginPage} />
//       </Navigate>
//     </>
//   );
// };

// export default App;



// function App() {

//   return (
//     <Routes>
//       <Route path="/" element={<Layout />}>
//         {/* public routes */}
//         <Route path="login" element={<Login />} />
//         <Route path="register" element={<Register />} />
//         <Route path="linkpage" element={<LinkPage />} />
//         <Route path="unauthorized" element={<Unauthorized />} />

//         {/* we want to protect these routes */}
//         <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
//           <Route path="/" element={<Home />} />
//         </Route>

//         <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
//           <Route path="editor" element={<Editor />} />
//         </Route>


//         <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
//           <Route path="admin" element={<Admin />} />
//         </Route>

//         <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
//           <Route path="lounge" element={<Lounge />} />
//         </Route>

//         {/* catch all */}
//         <Route path="*" element={<Missing />} />
//       </Route>
//     </Routes>
//   );
// }

//export default App;


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/:id" element={<SingleProp />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



