import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import service from '../../appwrite/config'
import Container from '../container/Container'
import PostForm from '../PostForm'

function EditPost() {
    const {slug}=useParams()
    const [post,setPost]=useState(null)
    const [error,setError]=useState(null)
    useEffect(()=>{
        service.getPost(slug)
        .then((p)=>setPost(p))
        .catch((error)=>setError(error))
    },{slug})
    if(error) {
        console.log("error while fetching file",error);
        return null
    }
    
  return (
    <div>
        <Container>
            <PostForm
               {...post}
            />
        </Container>
    </div>
  )
}

export default EditPost