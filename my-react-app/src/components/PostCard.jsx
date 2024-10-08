import React from 'react'
import appwriteService from '../appwrite/config';
import {Link} from 'react-router-dom'
import Post from '../pages/Post';
import postSlice from '../store/postSlice';
function PostCard({
    $id, 
    title,
    featuredImage
}) {
    return (
        <Link to={`/post/${$id}`}>
            <div
            className='w-full bg-gray-100 rounded-xl p-4'
            >
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                    className='rounded-xl'/>

                </div>
            </div>
            <h2
            className='text-xl font-bold hover:text-white hover:underline '
            >
            {title}
            </h2>

        </Link>
    )
}

export default PostCard
