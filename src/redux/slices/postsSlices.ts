// postsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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

const loadLocalPosts = (): Post[] => {
    try {
        const savePosts = localStorage.getItem('localPosts');
        if (savePosts) {
            return JSON.parse(savePosts);
        }
    }catch (e) {
        console.error( 'Failed to load local posts from localStorage',e);
    }
    return  [];
}

const saveLocalPosts = (posts: Post[]) => {
    try {
        localStorage.setItem('localPosts', JSON.stringify(posts));
    } catch (e) {
        console.error( 'Failed to load save local posts to localStorage',e);
    }
};

const initialState: PostsState = {
    fetchedPosts: [],
    localPosts: loadLocalPosts(),
    nextId: loadLocalPosts().length > 0 ? Math.max(...loadLocalPosts().map((post) => post.id) ) + 1 : 0,
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

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (postId: number, {getState}) => {
        const state = getState() as {posts: PostsState};
        const updateLocalPost = state.posts.localPosts.filter(post => post.id !== postId)
        localStorage.setItem('localPosts', JSON.stringify(updateLocalPost));
        return postId;
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setFetchedPosts: (state, action: PayloadAction<Post[]>) => {
            state.fetchedPosts = action.payload
        },
        addLocalPost: (state, action: PayloadAction<Post>) => {
            state.localPosts.push(action.payload);
            saveLocalPosts(state.localPosts);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPostsFromAPI.fulfilled, (state, action) => {
            state.fetchedPosts = action.payload;
        });

        builder.addCase(createPost.fulfilled, (state, action) => {
            state.localPosts.push(action.payload);
            state.nextId += 1;
            saveLocalPosts(state.localPosts);
        });

        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.localPosts = state.localPosts.filter(post => post.id !== action.payload);
        })
    },
});

export const { setFetchedPosts, addLocalPost } = postsSlice.actions;
export default postsSlice.reducer;
