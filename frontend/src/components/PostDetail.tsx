import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Post } from "../types";
import CommentList from "./CommentList"

import styles from "../styles/PostDetail.module.css";

export default function PostDetail() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const postId = id ? parseInt(id, 10) : null;
    
    useEffect(() => {
        if (!postId) return;

        fetch(`http://localhost:3000/posts/${postId}`)
            .then((res) => res.json())
            .then((data) => {console.log("Fetched post:", data); setPost(data);})
            .catch((err) => {console.error("Error fetching post:", err);});
    }, [postId]);

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
            <div className={styles.commentContainer}>
                <CommentList post_id={ postId! }/>
            </div>
            <div className={styles.addCommentContainer}>
                <Link to={`/posts/${postId}/comments/new`} className={styles.addCommentButton}>
                    Add Comment
                </Link>
            </div>
        </div>
    );
}