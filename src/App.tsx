import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LatestPosts from "./components/LatestPost/LatestPosts";
import ViewPost from "./components/ViewPost/ViewPost";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LatestPosts/>} />
                <Route path="/:postId" element={<ViewPost />} />
            </Routes>
        </Router>
    )
}

export default App;