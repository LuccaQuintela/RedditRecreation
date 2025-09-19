import { Link } from "react-router-dom";
import type { Post } from '../types';
import styles from '../styles/PostListItem.module.css';

type PostListItemProps = {
    post: Post;
}

export default function PostListItem({ post }: PostListItemProps) {
    const handleUpvote = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Upvoted post:', post.id);
    };

    const handleDownvote = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Downvoted post:', post.id);
    };

    return (
        <div className={styles.postCard}>
            <div className={styles.votingSection}>
                <button 
                    className={styles.upvoteButton}
                    onClick={handleUpvote}
                    aria-label="Upvote"
                >
                    ▲
                </button>
                <span className={styles.voteCount}>0</span>
                <button 
                    className={styles.downvoteButton}
                    onClick={handleDownvote}
                    aria-label="Downvote"
                >
                    ▼
                </button>
            </div>
            
            <div className={styles.contentSection}>
                <Link 
                    to={`/posts/${post.id}`} 
                    className={styles.postLink}
                >
                    <h2 className={styles.title}>
                        {post.title}
                    </h2>
                    <p className={styles.author}>
                        by {post.user.email}
                    </p>
                </Link>
            </div>
        </div>
    );
}