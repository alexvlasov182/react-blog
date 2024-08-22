import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LatestPosts from "./components/LatestPost/LatestPosts";
import ViewPost from "./components/ViewPost/ViewPost";
//import EditPost from "./components/EditPost/EditPost";
import CreatePost from "./components/CreatePost/CreatePost";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LatestPosts/>} />
                <Route path="/:postId" element={<ViewPost />} />
                <Route path="/create" element={<CreatePost />} />
                {/*<Route path="/edit/:postId" element={<EditPost />} />*/}
            </Routes>
        </Router>
    )
}

export default App;