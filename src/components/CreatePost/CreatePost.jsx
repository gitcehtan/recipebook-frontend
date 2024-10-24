import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils';
import {ToastContainer} from 'react-toastify';

const CreatePost = () => {

  const [loggedInUser, setLoggedInUser] = useState('');
  
  const navigate = useNavigate();
  
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, [])
  const [post, setPost] = useState({title:"", content:""});
  const [photo, setPhoto] = useState(null);

  const handleLogout = (e) => {
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      handleSuccess("User Logged Out")
      setTimeout(() => {
        navigate('/login');
      },1000);
  }


  const handleChange = (e) => {
      const {name,value} = e.target;
      const copyPost = {...post};
      copyPost[name] = value;
      setPost(copyPost);
      
  }

  const handleImageChange = (e) => {
    setPhoto(e?.target?.files[0]);
  }
  const createPost = async (e) => {
    e.preventDefault();

    const {title,content} = post;

    if(!title || !photo || !content){
      return handleError("Title , Photo and Recipe Content are compulsory ");
    }
    
    const formData = new FormData();
    console.log("Form Data",formData);
    
    formData.append("title",post.title);
    formData.append("photo", photo);
    formData.append("content",post.content);

    try {
      const url = "https://recipebook-backend-gc42.onrender.com/posts/create";
      const Headers = {
       
          "Authorization" : localStorage.getItem('token'),
        
      }
       const response = await fetch(url,
             {
                 method: "POST",
                 body: formData,
                 headers:Headers
             }
         );
 
        const result = await response.json();
 
        const {success, message, error} = result;
 
        if(success){
          handleSuccess(message);
          setTimeout(()=>{
             navigate('/posts');
          },1000);
        } else if(error){
         const detail = error.details[0].message;
         handleError(detail);
        } else if(!success){
         handleError(message);
        }
 
        console.log(result);
        
 
     } catch (error) {
         handleError(error);
     }

  }


  // useEffect(() => {
  //   fetchProducts();
  // },[]);

  return (
    <div className='posts-page'>
      <div className="logout">
        <h1>{loggedInUser}</h1>
        <button onClick={handleLogout}>Logout</button>
        <button><Link to={"/posts"}>Posts</Link></button>
      </div>
 
      <div className='create'>
        <form onSubmit={createPost} className='create-form'>
            <label htmlFor="title">Title</label>
            <input placeholder='Enter the title of recipe'
                   onChange={handleChange}
                   type='text'
                   name='title'
                   autoFocus
                   value={post.title}
            />
            <label htmlFor="photo">Photo</label>
            <input onChange={handleImageChange}
                   type='file'
                   accept='image/*'
                   name='uploaded_file'
                   autoFocus
                  
            />
            <label htmlFor="content">Title</label>
            <textarea 
                   placeholder='Enter the recipe of recipe'
                   onChange={handleChange}
                   type='text'
                   name='content'
                   autoFocus
                   value={post.content}
                   rows="7" 
                   
            />
            <button className='createBtn'>Create</button>
        </form>
      </div>
      
      <ToastContainer/>
    </div>
  )
}

export default CreatePost