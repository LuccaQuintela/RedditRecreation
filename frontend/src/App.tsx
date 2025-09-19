import { Routes, Route } from "react-router-dom";
import PostDetail from "./components/PostDetail";
import PostList from "./components/PostList";
import Layout from "./components/Layout";
import CreatePostsView from "./components/CreatePostView";
import CreateCommentView from "./components/CreateCommentView";
import LoginView from "./components/LoginView"
import ProfileView from "./components/ProfileView"
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
        <Route path="/login" element={<LoginView />} />
        <Route path="/profile" element={<ProfileView />} />
      </Routes>
    </Layout>
  )
}

export default App
