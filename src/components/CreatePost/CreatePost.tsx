import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {createPost} from "../../redux/slices/postsSlices";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

import './CreatePost.css'

import { FormField, Button, Form, FormTextArea } from 'semantic-ui-react'
import {Card} from 'semantic-ui-react';

const CreatePost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!title || !description) {
            setError('Title and Description are required');
            return;
        }
        setError(null);
        const newPost = {title, description, cover_image: coverImage};
        try {
            await dispatch(createPost(newPost));
            navigate('/');
        } catch (err) {
            setError('Failed to create post.');
        }
    };

    return (
        <div>
            <h1 className="main-title">Create New Post</h1>
            <a className="link-create-post" href="/">Back to All Posts</a>
            {error && <p className="error">{error}</p>}

            <div className="main-container">
                <Card className="card-form">
                    <form className="main-from">

                        <label>Post Title</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='title'/>


                        <label>Cover Image</label>
                        <input value={coverImage} onChange={(e) => setCoverImage(e.target.value)}
                               placeholder='cover image'/>

                        <label>Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                                  placeholder='description'/>
                        <button onClick={handleSubmit} type='submit'>Submit</button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default CreatePost;