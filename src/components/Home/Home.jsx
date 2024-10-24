import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.css";
import Navbar from '../Navbar/Navbar';

const Home = () => {
  return (
   <>
   <div className='home'>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <Link to={'/'} ><h1 className='main home-name'>GHRANA</h1></Link>
     <Link to={'/posts'}><h3 className='recipe home-name'>RECIPES</h3></Link>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>
     <div className='line'></div>  
   </div>
    
   </>
  )
}

export default Home;