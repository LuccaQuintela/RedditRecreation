import { useState } from 'react';
import type { Comment as CommentType } from '../types';
import styles from '../styles/CommentItem.module.css';

type CommentProps = {
    comment: CommentType;
    onReply?: (parentId: number) => void;
    depth?: number;
}

export default function CommentItem({ comment, onReply, depth = 0 }: CommentProps) {
    const [showReplies, setShowReplies] = useState(true);

    const handleUpvote = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Upvoted comment:', comment.id);
    };

    const handleDownvote = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Downvoted comment:', comment.id);
    };

    const handleReply = () => {
        if (onReply) {
            onReply(comment.id);
        }
    };

    const toggleReplies = () => {
        setShowReplies(!showReplies);
    };

    return (
        <div className={styles.commentCard}>
            <div className={styles.commentSection}>
                <div className={styles.commentHeader}>
                    <span className={styles.author}>
                        {comment.user.email}
                    </span>
                </div>

                <div className={styles.commentBody}>
                    {comment.body}
                </div>
            </div>
        </div>
        // <div className={`${styles.commentCard} ${depth > 0 ? styles.nestedComment : ''}`} style={{ marginLeft: `${depth * 1.5}rem` }}>
        //     <div className={styles.votingSection}>
        //         <button 
        //             className={styles.upvoteButton}
        //             onClick={handleUpvote}
        //             aria-label="Upvote comment"
        //         >
        //             ▲
        //         </button>
        //         <span className={styles.voteCount}>0</span>
        //         <button 
        //             className={styles.downvoteButton}
        //             onClick={handleDownvote}
        //             aria-label="Downvote comment"
        //         >
        //             ▼
        //         </button>
        //     </div>
            
        //     <div className={styles.contentSection}>
        //         <div className={styles.commentHeader}>
        //             <span className={styles.author}>
        //                 {comment.user.email}
        //             </span>
        //             <span className={styles.timestamp}>
        //                 {/* You can add timestamp logic here */}
        //                 just now
        //             </span>
        //         </div>
                
        //         <div className={styles.commentBody}>
        //             {comment.body}
        //         </div>
                
        //         <div className={styles.commentActions}>
        //             <button 
        //                 className={styles.actionButton}
        //                 onClick={handleReply}
        //             >
        //                 Reply
        //             </button>
        //             <button 
        //                 className={styles.actionButton}
        //             >
        //                 Share
        //             </button>
        //             <button 
        //                 className={styles.actionButton}
        //             >
        //                 Report
        //             </button>
        //         </div>

        //         {comment.replies && comment.replies.length > 0 && (
        //             <div className={styles.repliesSection}>
        //                 <button 
        //                     className={styles.toggleRepliesButton}
        //                     onClick={toggleReplies}
        //                 >
        //                     {showReplies ? '▼' : '▶'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
        //                 </button>
                        
        //                 {showReplies && (
        //                     <div className={styles.replies}>
        //                         {comment.replies.map((reply) => (
        //                             <CommentItem 
        //                                 key={reply.id} 
        //                                 comment={reply} 
        //                                 onReply={onReply}
        //                                 depth={depth + 1}
        //                             />
        //                         ))}
        //                     </div>
        //                 )}
        //             </div>
        //         )}
        //     </div>
        // </div>
    );
}
