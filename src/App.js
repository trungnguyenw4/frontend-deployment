import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import Login from './components/Authentication/Login';
import Logout from './components/Authentication/Logout';


import NewsBoard from './components/NewsBoard/NewsBoard';
import Navbar from "./components/NavBar/Navbar"
import InsuranceBrokers from "./components/InsuranceBrokerMap/InsuranceBrokers"
import Registration from './components/Authentication/Registration';
import AuthProvider from "./components/Authentication/authProvider";
import Customers from './components/Customers/Customers';




function App() {
  return (
    <>

    <Navbar/>
    

      <div className="container">


        <Routes>
        
        <Route
        path="*"
        element={<Navigate to="/home" replace />}
        />

          <Route  path="/home" element={<NewsBoard/>} />
        
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

         
        </Routes>
      </div>
    </>
    
    
  )
}

export default App









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



