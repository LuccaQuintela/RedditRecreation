import styles from "../styles/CommentList.module.css";
import { useEffect, useState } from "react";
import CommentItem from "./CommentItem"
import type { Comment } from "../types"

type CommentListProps = {
    post_id: number;
}

export default function CommentList({ post_id }: CommentListProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${post_id}/comments`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched comments: ", comments);
                setComments(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching comments:", err);
                setError("Failed to load posts");
                setLoading(false);
            });
    }, []);

    if (loading) return <p className={styles.loading}>Loading comments...</p>;
    if (error) return <p className={styles.error}>Error: {error}</p>;
    if (comments.length === 0) return <p className={styles.emptyState}>No comments found.</p>;
    
    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {comments.map(comment => (
                    <li key={comment.id}>
                        <CommentItem comment={comment}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}