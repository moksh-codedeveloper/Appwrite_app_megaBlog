import React, {useCallback, useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index.js'
import service from '../../appwrite/config.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {addPost} from '../../store/postSlice.js'
export default function PostForm({post}) {
    const {register, handleSubmit, watch, setValue,
        control, getValues} = useForm({
            defaultValues: {
                title: post?.title || '',
                content: post?.content || '',
                status: post?.status || 'active',
            },
        })
        // const featuredImage = service.getFilePreview(post.featuredImage);
        const dispatch = useDispatch();
        const [title, setTitle] = useState('');
        const [content, setContent] = useState('');
        const navigate = useNavigate();
        const userData = useSelector(state => state.auth.userData);
        const submit = async (data, e) => {
            e.preventDefault();
    // Validate input and handle image upload if needed
            const newPost = {
                title,
                content,
            };
            dispatch(addPost(newPost));
            // Clear form fields
            setTitle('');
            setContent('');
            if(post) {
                const file = data.image[0] ? service.uploadFile(data.image[0]) : null;
                if(file) {
                    service.deleteFile(post.featuredImage);
                }
                const dbPost = await service.updatePost(post.$id, {...data, featuredImage: file? file.$id : undefined});

                if(dbPost) {
                    // setValue("image", null);
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = await service.uploadFile(data.image[0]);

                if(file) {
                    const fileID = file.$id;
                    data.featuredImage = fileID
                    const dbPost = await service.createPost({
                        ...data,
                        userId: userData.$id,
                    })

                    if(dbPost) navigate(`/post/${dbPost.$id}`);

                }
            }
        }

        const slugTransform = useCallback((value) => {
            if (value && typeof value === "string")
                return value
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-zA-Z\d\s]+/g, "-")
                    .replace(/\s/g, "-");
    
            return "";
        }, []);
        useEffect(() => {
            const subscription = watch((value, {name}) => {
                if(name === 'title'){
                    setValue('slug', slugTransform(value.title,{shouldValidate: true}));
                }
            });

            return () => {
                subscription.unsubscribe();
            }
        }, [watch, slugTransform, setValue]);

        // logic part ends 
    return (
       <form onSubmit={handleSubmit(submit)} className="flex flex-wrap text-black">
        {/* // left part */}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 hover:bg-blue-600 text-black"
                    onChange={(e) => setTitle(e.target.value)}
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 bg-blue-400 hover:bg-blue-700 text-black"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} onChange={(e) => setContent(e.target.value)}/>
            </div>
            {/* // right part  */}
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 text-justify text-white bg-black hover:bg-black"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4 bg-cyan-600">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg h-11"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 font-thin"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500 text-white" : "bg-black-600 text-white"} onChange={addPost(post)} className="w-full text-white bg-cyan-400">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

// export default PostForm
