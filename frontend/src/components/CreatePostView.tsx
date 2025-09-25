import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/CreatePostsView.module.css';

export default function CreatePostView() {
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        body: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.title.trim() || !formData.body.trim()) {
            alert('Please fill in all fields');
            return;
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('You must be logged in to comment');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: formData.title,
                    body: formData.body,
                }),
            });

            if (response.ok) {
                alert('Post created successfully!');
                setFormData({ title: '', body: ''});
                navigate(`/posts/`);
            } else {
                alert('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Error creating post');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create New Post</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="title" className={styles.label}>
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Enter post title..."
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="body" className={styles.label}>
                        Body
                    </label>
                    <textarea
                        id="body"
                        name="body"
                        value={formData.body}
                        onChange={handleInputChange}
                        className={styles.textarea}
                        placeholder="Write your post content here..."
                        rows={8}
                        required
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Create Post
                </button>
            </form>
        </div>
    );
}