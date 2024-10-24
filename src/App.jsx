
import './App.css';
import Home from './components/Home/Home';
import Posts from './components/Posts/Posts';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login.jsx';
import CreatePost from './components/CreatePost/CreatePost';
import {BrowserRouter as Router , Routes, Route, useNavigate} from "react-router-dom";
import Navbar from './components/Navbar/Navbar.jsx';

function App() {
  
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/posts' element={<Posts/>}/>
          <Route path='/posts/create' element={<CreatePost/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
