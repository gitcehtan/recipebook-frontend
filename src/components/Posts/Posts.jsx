import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils';
import {ToastContainer} from 'react-toastify';

const Posts = () => {

  const [loggedInUser, setLoggedInUser] = useState('');
  const [posts, setPosts] = useState();

  const navigate = useNavigate();

  useEffect(() => {
      setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, [])

  const handleLogout = (e) => {
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      handleSuccess("User Logged Out")
      setTimeout(() => {
        navigate('/login');
      },1000);
  }


  const fetchPosts = async () => {
    try {
      const url  = "http://localhost:8080/posts";
      const headers = {
        headers: {
          "Authorization" : localStorage.getItem('token')
        }
      }
        const response = await fetch(url, headers);
        const result = await response.json();
        console.log(result);
        setPosts(result);
      
    } catch (error) {
      handleError(error);
    }
  }


  useEffect(() => {
    fetchPosts();
  },[]);


// loggedInUser localStorage.getItem('loggedInUser'),
const currUser = localStorage.getItem('loggedInUser');



const handleDelete = async(postId) => {
      // console.log(e);
     
    try {
      const url = "http://localhost:8080/posts/delete";
      const response = await fetch(url,
        {
          method: "DELETE",
          body: JSON.stringify({
                postId : postId.toString()
                }),
          headers: {
            "Content-Type" : "application/json",
           "Authorization" : localStorage.getItem('token')
          }
        }
      );
      
      const result = await response.json();
      const {success,message, error} = result;

      if(success){

        handleSuccess(message);
      }else if (error){
        handleError(error)
      }else if(!success){
        handleError(message);
      }
      
    } catch (error) {
      handleError(error);
    }



}

  return (
    <div className='posts-page'>
       
      {/* <div className="logout">
        <h1>{loggedInUser}</h1>
        <button onClick={handleLogout}>Logout</button>
        <button><Link to={"/posts/create"}>Create</Link></button>
      </div> */}
      <div className='posts'>
        {
           posts && posts?.map((item, index) => {
           return ( <ul key={index}>

              <div className='post'>
                  <h2 className="title">{item.title}</h2>
                  <div className='blog'>
                    <div className='photo'>
                      <img src={`/uploads/${item.photo}`} height={150} width={250}/>
                    </div>
                    <div className='content'>{item.content}</div>
                  </div>
                  <div className='name'>{item.userId.name}</div>
                 { currUser === item.userId.name ? <button className='deleteBtn' onClick={()=> {handleDelete(item._id)}}>Delete</button> : null }

              </div>
            </ul>)
          })
        }
      </div>
      
      <ToastContainer/>
    </div>
  )
}

export default Posts