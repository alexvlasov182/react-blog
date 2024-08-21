import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState, AppDispatch} from "../redux/store";
import {setPosts} from "../redux/slices/postsSlices";

const LatestPosts: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.posts.posts);


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

    return (
        <div>
            {posts.length > 0 ?(
                posts.map((post) => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                    </div>
                ))
            ) : (
                <p>No posts available</p>
            )}
        </div>
    );
};

export default LatestPosts;