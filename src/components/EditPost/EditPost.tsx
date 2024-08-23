import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from "../../redux/store";
import {updatePost} from "../../redux/slices/postsSlices";
import {Card, Form, Button} from "semantic-ui-react";

import "./EditPost.css";

interface Post {
  id: number;
  title: string;
  description: string;
  cover_image?: string;
}

const EditPost: React.FC = () => {
  const {postId} = useParams<{postId: string}>();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const post = useSelector((state: RootState): Post | undefined => {
    return postId ? state.posts.localPosts.find(p => p.id === parseInt(postId)) : undefined;
  });

  const [title, setTitle] = useState<string>(post?.title || '');
  const [description, setDescription] = useState<string>(post?.description || '');
  const [coverImage, setCoverImage] = useState<string>(post?.cover_image || '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setDescription(post.description);
      setCoverImage(post.cover_image || '');

    } else {
      setError('Post not found')
      navigate('/');
    }

  }, [post, navigate]);

  const handleSubmit = async () => {
    if (!title || !description) {
      setError('Title and Description are required');
      return;
    }
    if (!post) {
      setError('Post not found');
      return;
    }
    setError(null);

    const updatedPost = {id: post.id, title, description, cover_image: coverImage};

    try {
      await dispatch(updatePost(updatedPost))
      navigate('/')
    }catch (err) {
      setError('Failed to update post');
    }
  };

  return (
    <div className="edit-post-container">
      <h1 className="main-title">Edit Post</h1>
      <a className="link-update-post" href="/">Back to All Posts</a>

      {error && <p className="error">{error}</p>}

      <div className="main-container">
        <Card className="card-form">
          <form className="main-form" onSubmit={(e) => {e.preventDefault(); handleSubmit();}} action="">
            <label htmlFor="">Post Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} autoComplete="off" placeholder="Title" />

            <label htmlFor="">Cover Image</label>
            <input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} autoComplete="off" placeholder="Cover Image" />

            <label >Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
            <button type="submit">Submit</button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default  EditPost;