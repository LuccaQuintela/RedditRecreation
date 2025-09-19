import { useState } from 'react';
import styles from '../styles/CreatePostsView.module.css';

export default function CreatePostView() {
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        user_id: 2
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
        
        // Basic validation
        if (!formData.title.trim() || !formData.body.trim() || !formData.user_id) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: formData.title,
                    body: formData.body,
                    user_id: formData.user_id
                }),
            });

            if (response.ok) {
                alert('Post created successfully!');
                // Reset form
                setFormData({ title: '', body: '', user_id: 2 });

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
                    <label htmlFor="user_id" className={styles.label}>
                        User ID
                    </label>
                    <input
                        type="number"
                        id="user_id"
                        name="user_id"
                        value={formData.user_id}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Enter your id..."
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