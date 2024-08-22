// postsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Post {
    id: number;
    title: string;
    description: string;
    cover_image: string;
    url?: string;
}

interface PostsState {
    fetchedPosts: Post[]; // Posts fetched from DEV API
    localPosts: Post[];   // Posts created locally
    nextId: number;       // ID for the next locally created post
}

const initialState: PostsState = {
    fetchedPosts: [],
    localPosts: [],
    nextId: 1, // Start with an ID of 1 for new posts
};

export const fetchPostsFromAPI = createAsyncThunk(
    'posts/fetchPostsFromAPI',
    async () => {
        const response = await fetch("https://dev.to/api/articles");
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }
        return (await response.json()) as Post[];
    }
);

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (post: Omit<Post, 'id'>, { getState }) => {
        const state = getState() as { posts: PostsState };
        const newPost = {
            ...post,
            id: state.posts.nextId,
        };
        return newPost;
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostsFromAPI.fulfilled, (state, action) => {
            state.fetchedPosts = action.payload;
        });

        builder.addCase(createPost.fulfilled, (state, action) => {
            state.localPosts.push(action.payload);
            state.nextId += 1;
        });
    },
});

export default postsSlice.reducer;
