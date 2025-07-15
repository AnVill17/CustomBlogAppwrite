import React from 'react'
import authServices from '../appwrite/auth'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({$id,title,featuredImage}) {
   
    
  return (
    <Link to={`/post/${$id}`}>
        <div className="w-full bg-gradient-to-r from-orange-500 rounded-xl p-4 h-72">
            <div className='w-full h-3/4 justify-center mb-4'>
                <img src={service.getFilePreview(featuredImage)} 
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard