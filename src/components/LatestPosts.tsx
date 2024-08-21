import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState, AppDispatch} from "../redux/store";
import {setPosts} from "../redux/slices/postsSlices";

const LatestPosts: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.posts.posts);


    useEffect(() => {
        // Fetch posts from the API and dispatch setPosts action
        const fetchPosts = async () => {
            const response = await fetch('https://dev.to/api/articles');
            const data = await response.json();
            dispatch(setPosts(data))
        };

        fetchPosts();
    }, [dispatch]);

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>{post.title}</div>
            ))}
        </div>
    );
};

export default LatestPosts;