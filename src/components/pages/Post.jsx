import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../../appwrite/config'
import Container from '../container/Container'
import parse from "html-react-parser";
import Button from '../Button'
import { Link } from 'react-router-dom'
function Post() {
   const userData = useSelector((state) => state.auth.userData);
   
    const {slug}=useParams()
    const [post,setPost]=useState(null)
    const [imgSrc,setImgSrc]=useState(null)
   
    const navigate=useNavigate()
    useEffect(()=>{
         const fetchPost = async () => {
        try {
            const p = await service.getPost(slug);
            setPost(p);

            if (p?.featuredImage) {
                const url =  service.getFilePreview(p.featuredImage);
                setImgSrc(url);
            }
        } catch (error) {
            console.log("Error while fetching the post:", error);
        }
    };

    fetchPost(); 
    },[slug,navigate])
      const isAuthor = post && userData ? post.userId === userData.$id : false;
     

    const deletePost=()=>{
        service.deletePost(slug)
        .then((status)=>{if(status) {service.deleteFile(post.featuredImage)
            navigate("/")
        }})
    }
    
    if(!post) return null
   
    console.log("link:",imgSrc);
    
    
  return (
    <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={imgSrc}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
  )
}

export default Post