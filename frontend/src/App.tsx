import { Routes, Route } from "react-router-dom";
import PostDetail from "./components/PostDetail";
import PostList from "./components/PostList";
import Layout from "./components/Layout";
import CreatePostsView from "./components/CreatePostView";
import CreateCommentView from "./components/CreateCommentView";
import './App.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PostList />}/>
        <Route path="/posts" element={<PostList />}/>
        <Route path="/posts/:id" element={<PostDetail />}/>
        <Route path="/posts/new" element={<CreatePostsView />}/>
        <Route path="/posts/:post_id/comments/new" element={<CreateCommentView />}/>
      </Routes>
    </Layout>
  )
}

export default App
