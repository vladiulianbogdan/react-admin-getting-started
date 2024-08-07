// in src/MyLoginPage.js
import React, { useState, CSSProperties } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';
import { Link } from 'react-router-dom';
import { sharedStyles as styles } from './Styles';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        login({ email, password }).catch(() =>
            notify('Invalid email or password', { type: 'error' })
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.formWrapper}>
                <h2 style={styles.title}>Login</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputContainer}>
                        <input
                            name="email"
                            type="email"
                            value={email}
                            placeholder="Email"
                            onChange={e => setEmail(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputContainer}>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Login</button>
                </form>
                <div style={styles.links}>
                    <Link to="/forgot-password" style={styles.link}>Forgot Password</Link>
                    <Link to="/register" style={styles.link}>Create Account</Link>
                </div>
            </div>
            <Notification />
        </div>
    );
};
