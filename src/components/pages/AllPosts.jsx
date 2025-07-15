import React, { useEffect, useState } from 'react'
import service from '../../appwrite/config'
import Container from '../container/Container'
import PostCard from '../PostCard'

function AllPosts() {
    const [posts,setPosts]=useState([])
    useEffect(()=>{
        try {
            service.getPosts()
            .then((postz)=>{if (postz && postz.documents) {
                setPosts(postz.documents);
            } else {
                setPosts([]); // fallback to empty array
            }})
        } catch (error) {
            console.log("error while fetching posts",error);
            
        }
    },[])
   if (!posts || posts.length === 0) {
    return <Container>No posts found.</Container>;
}

  return (
   <div className='w-full py-8'>
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