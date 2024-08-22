import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState, AppDispatch} from "../../redux/store";
import {setPosts} from "../../redux/slices/postsSlices";
import { useNavigate } from "react-router-dom";

import './LatestPost.css'


import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
} from 'semantic-ui-react'

const LatestPosts: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.posts.posts);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("https://dev.to/api/articles");
                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }
                const data = await response.json();
                dispatch(setPosts(data))
            }catch (error) {
                console.log('Fetch error', error);
            }
        };

        fetchPosts();
    }, [dispatch]);

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
                            {post.cover_image && <Image src={post.cover_image} wrapped ui={false}/>}
                            <Card.Content>
                                <Card.Header>{post.title}</Card.Header>
                                <Card.Description>{post.description}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <a href={post.url} target="_blank" rel="noopener noreferrer">
                                    <Icon name='external alternate'/>
                                    Read more
                                </a>
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