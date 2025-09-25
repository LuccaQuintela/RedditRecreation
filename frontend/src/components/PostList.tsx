import { useEffect, useState } from "react";
import type { Post } from "../types";
import PostListItem from "./PostListItem";
import styles from "../styles/PostList.module.css";

export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    console.log(`${API_BASE_URL}/posts`);
    useEffect(() => {
        fetch(`${API_BASE_URL}/posts`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched posts:", data);
                setPosts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching posts:", err);
                setError("Failed to load posts");
                setLoading(false);
            });
    }, []);

    if (loading) return <p className={styles.loading}>Loading posts...</p>;
    if (error) return <p className={styles.error}>Error: {error}</p>;
    if (posts.length === 0) return <p className={styles.empty}>No posts found.</p>;

    return (
        <div className={styles.container}>
            <ul className={styles.postList}>
                {posts.map(post => (
                    <li key={post.id}>
                        <PostListItem post={post}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}