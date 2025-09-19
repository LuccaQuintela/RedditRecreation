import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/CreateCommentView.module.css';

export default function CreateCommentView() {
    const { post_id } = useParams<{ post_id: string }>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        body: '',
        parent_id: null as number | null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!post_id) {
            alert('Missing post id');
            return;
        }

        if (!formData.body.trim()) {
            alert('Please enter a comment');
            return;
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('You must be logged in to comment');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/posts/${post_id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    body: formData.body,
                    parent_id: formData.parent_id,
                }),
            });

            if (response.ok) {
                navigate(`/posts/${post_id}`);
            } else {
                alert('Failed to create comment');
            }
        } catch (error) {
            console.error('Error creating comment:', error);
            alert('Error creating comment');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Add a Comment</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <textarea
                        id="body"
                        name="body"
                        value={formData.body}
                        onChange={handleInputChange}
                        className={styles.textarea}
                        placeholder="Write your comment here..."
                        rows={1}
                        required
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Post Comment
                </button>
            </form>
        </div>
    );
}


