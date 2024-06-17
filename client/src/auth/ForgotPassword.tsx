import { AuthService } from "@genezio/auth";
import React, { useState } from 'react';
import { useNotify, Notification } from 'react-admin';
import { Link, useNavigate } from 'react-router-dom';
import { sharedStyles as styles } from './styles';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const notify = useNotify();
    const navigate = useNavigate();

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        AuthService.getInstance().resetPassword(email)
        .then(data => {
            notify('Please check your email to reset your password.');
            navigate('/login');
        })
        .catch((e: any) =>
            notify(e.error.message, {type: 'error'})
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.formWrapper}>
                <h2 style={styles.title}>Forgot Password</h2>
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
                    <button type="submit" style={styles.button}>Send recovery email</button>
                </form>
                <div style={styles.links}>
                    <Link to="/login" style={styles.link}>Login</Link>
                    <Link to="/register" style={styles.link}>Create Account</Link>
                </div>
            </div>
            <Notification />
        </div>
    );
};