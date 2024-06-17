// in src/MyLoginPage.js
import { AuthService } from "@genezio/auth";
import React, { useState, CSSProperties } from 'react';
import { useNotify, Notification } from 'react-admin';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { sharedStyles as styles } from './styles';

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const notify = useNotify();
    const navigate = useNavigate();


    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        AuthService.getInstance().register(email, password)
        .then(() => {
            notify('Please check your email to verify your account.');
            navigate('/login');
        })
        .catch((e: any) =>
            notify(e.error.message, {type: 'error'})
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.formWrapper}>
                <h2 style={styles.title}>Create account</h2>
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
                    <button type="submit" style={styles.button}>Let's go</button>
                </form>
                <div style={styles.links}>
                    <Link to="/forgot-password" style={styles.link}>Forgot Password</Link>
                    <Link to="/login" style={styles.link}>Login</Link>
                </div>
            </div>
            <Notification />
        </div>
    );
};