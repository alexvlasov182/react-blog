import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {createPost} from "../../redux/slices/postsSlices";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

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
            <h1>Create New Post1111</h1>
            {error && <p className="error">{error}</p>}
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="Cover Image URL" />
            <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
        </div>
    );
};

export default CreatePost;