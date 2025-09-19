import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Post } from "../types";

import styles from "../styles/PostDetail.module.css";

export default function PostDetail() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    
    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:3000/posts/${id}`)
            .then((res) => res.json())
            .then((data) => {console.log("Fetched post:", data); setPost(data);})
            .catch((err) => {console.error("Error fetching post:", err);});
    }, [id]);

    if (!post) return <p>Loading...</p>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>{post.title}</h1>
                <span className={styles.author}>by {post.user.email}</span>
            </div>
            <div className={styles.content}>
                <p className={styles.body}>{post.body}</p>
            </div>
        </div>
    );
}