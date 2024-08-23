import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState, AppDispatch} from "../../redux/store";
import {deletePost, fetchPostsFromAPI} from "../../redux/slices/postsSlices";
import { useNavigate } from "react-router-dom";
import {Card, Icon, Button} from 'semantic-ui-react';

import './LatestPost.css'

const LatestPosts: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const fetchedPosts = useSelector((state: RootState) => state.posts.fetchedPosts);
  const localPosts = useSelector((state: RootState) => state.posts.localPosts);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPostsFromAPI());
  }, [dispatch]);

  const posts = [...localPosts, ...fetchedPosts];

  const handleCardClick = (postId: number) => {
    navigate(`/${postId}`);
  }

  const handleNavigateEdit = (postId: number) => {
    navigate(`/edit/${postId}`);
  }

  const handleDeleteClick = (postId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(deletePost(postId));
  }

  return (
    <>
      <h1 className="main-title">All Posts</h1>
      <a className="link-create-post" href="/create">Create Post</a>
      <div className="main-container">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.id} className="card">
              {post.cover_image && <img onClick={() => handleCardClick(post.id)} src={post.cover_image} alt={post.title} style={{width: '100%'}}/>}
              <Card.Content onClick={() => handleCardClick(post.id)}>
                <Card.Header>{post.title}</Card.Header>
                <Card.Description>{post.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="card-footer-container">
                  {!localPosts.find((p) => p.id === post.id) && (
                    <div className="link" onClick={() => window.open(post.url, '_blank')}>
                      <Icon name='external alternate'/>
                      Read more
                    </div>
                  )}

                  {localPosts.find(p => p.id === post.id) && (
                    <>
                      <button className="edit-button" onClick={() => handleNavigateEdit(post.id)}>Edit</button>
                      <button className="delete-button" onClick={(e) => handleDeleteClick(post.id, e)}>Delete</button>
                    </>

                  )}
                </div>
              </Card.Content>
            </Card>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </>
  );
};

export default LatestPosts;