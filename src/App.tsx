import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LatestPosts from "./components/LatestPosts";
import React from "react";
import ViewPost from "./components/ViewPost";
// import ViewPost from './pages/ViewPost';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LatestPosts/>} />
                <Route path="/posts/:postId" element={<ViewPost />} />
            </Routes>
        </Router>
    )
}

export default App;