import React from 'react'
import "./Navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import { handleSuccess } from '../../utils';

const Navbar = () => {
    const token = localStorage.getItem("token");
    let user = localStorage.getItem("loggedInUser");
    const firstName = user?.split(" ")[0];
    const navigate = useNavigate()
    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess("User Logged Out")
        setTimeout(() => {
          navigate('/login');
        },1000);
    }
  return (
   <div className='navbar'>
    <nav>
        <ul>
        <li><Link to={"/"}>Home</Link></li>
        <li><Link to={"#contact"}>Contact</Link></li>
        <li><Link to={'/posts'} >Recipes</Link></li>
        </ul>
        <div className='login-signup'>
        {
            !token ? (<><li><Link to={'/login'}>Login</Link></li>
                <li><Link to={'/signup'}>Signup</Link></li></>):
                (<>
                    <button onClick={handleLogout}>Logout</button>
                    <button><Link to={"/posts/create"}>Create</Link></button>
                    <p>{firstName}</p>
                </>)
        }
        
        </div>
    </nav>
   </div>
//   
/*  */
  )
}

export default Navbar