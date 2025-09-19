import { useState } from 'react';
import styles from '../styles/LoginView.module.css';
import { useNavigate } from 'react-router-dom';

export default function LoginView() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!credentials.email.trim() || !credentials.password.trim()) {
            alert('Please enter your email and password');
            return;
        }

        try {
            setSubmitting(true);
            const response = await fetch('http://localhost:3000/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || 'Failed to log in');
            }

            const data = await response.json();
            if (data?.token) {
                localStorage.setItem('authToken', data.token);
                window.dispatchEvent(new Event('authChanged'));
            }
            navigate(`/posts`);
        } catch (error) {
            console.error('Login error:', error);
            alert(error instanceof Error ? error.message : 'Login failed');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Login</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="you@example.com"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button type="submit" className={styles.submitButton} disabled={submitting}>
                    {submitting ? 'Logging in...' : 'Log In'}
                </button>
            </form>
        </div>
    );
}

