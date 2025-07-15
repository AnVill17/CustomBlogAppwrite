import React, { useEffect, useState } from 'react'
import service from '../../appwrite/config'
import Container from '../container/Container'
import PostCard from '../PostCard'
import authServices from '../../appwrite/auth'

function AllPosts() {
    const [posts,setPosts]=useState([])
    const [user,setUser]=useState(null)
    useEffect(()=>{
        
        authServices.getCurrentUser()
        .then((user)=>{
            if(user){ 
                service.getPosts()
               .then((postz)=>setPosts(postz.documents))
                setUser(user)}
                else setUser(null)
        })
    },[])
  if(!user) {
    return <div>Login to see content</div>
  }
  return (
   <div className="w-full py-8 
    bg-[url('https://images.pexels.com/photos/29421577/pexels-photo-29421577.jpeg')]  bg-contain bg-center  w-full " >
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts