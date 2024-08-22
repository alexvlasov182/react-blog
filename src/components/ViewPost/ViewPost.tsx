import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import "./ViewPost.css";

import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
} from 'semantic-ui-react'

interface Post {
    id: number;
    title: string;
    description: string;
    cover_image?: string;
}

const ViewPost: React.FC = () => {
    const {postId} = useParams<{postId: string}>();
    const [post, setPost] = useState<Post | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (!postId) {
                    setError('Post ID is missing');
                    return;
                }
                const response = await fetch(`https://dev.to/api/articles`);
                if(!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Post[] = await response.json();

                // Find the post by ID
                const foundPost = data.find(post => post.id === parseInt(postId, 10));
                if (foundPost) {
                    setPost(foundPost);
                } else {
                    setError('Post not found');
                }
            } catch (error) {
                setError('Failed to load post');
                console.error('Fetch error: ', error);
            }
        };
        fetchPost();
    }, [postId]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <h1 className="main-title">One Post</h1>
            <div className="one-card">

                {post ? (
                    <Card className="card-content">
                        {post.cover_image && <Image src={post.cover_image} wrapped ui={false} />}
                        <Card.Content>
                            <Card.Header>{post.title}</Card.Header>
                            <Card.Description>{post.description}</Card.Description>
                        </Card.Content>
                    </Card>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
};

export default ViewPost;