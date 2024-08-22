import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState, AppDispatch} from "../../redux/store";
import {fetchPostsFromAPI} from "../../redux/slices/postsSlices";
import { useNavigate } from "react-router-dom";
import {Card, Icon} from 'semantic-ui-react'

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

    return (
        <>
            <h1 className="main-title">All Posts</h1>
            <div className="main-container">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Card key={post.id} className="card" onClick={() => handleCardClick(post.id)}>
                            {post.cover_image && <img src={post.cover_image} alt={post.title} style={{ width: '100%' }} />}
                            <Card.Content>
                                <Card.Header>{post.title}</Card.Header>
                                <Card.Description>{post.description}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div>
                                    <div className="link" onClick={() => window.open(post.url, '_blank')}>
                                        <Icon name='external alternate' />
                                        Read more
                                    </div>
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