import { Link, useMatch, useResolvedPath } from "react-router-dom"
import './Navbar.css' 


export default function Navbar() {
  return (

    <nav className="nav">
      <Link to="/home" className="site-title">
        Health&Insurance
      </Link>
      {
sessionStorage.getItem('token')?
<> 
<ul>
       
        <CustomLink to="/home">Home</CustomLink>  
        <CustomLink to="/InsuranceBrokers">InsuranceBrokers</CustomLink>
        <CustomLink to="/Customers">Customers</CustomLink>
        <CustomLink to="/logout">Logout</CustomLink>
</ul>
</>
:
<>
        

        <CustomLink to="/login">Login</CustomLink>
</>

      }
      
      
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

