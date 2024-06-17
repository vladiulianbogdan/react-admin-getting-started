import { AuthService } from "@genezio/auth";
import React, { useState } from 'react';
import { useNotify, Notification } from 'react-admin';
import { useNavigate } from 'react-router-dom';
import { sharedStyles as styles } from './styles';

export const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const notify = useNotify();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search); // parse the query parameters
    const token = queryParams.get('token'); // get the token query parameter
    
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            notify('Invalid token', { type: 'error' });
            return;
        }

        AuthService.getInstance().resetPasswordConfirmation(token, password)
        .then(data => {
            console.log(data)
            notify('Password reset successfully');
            navigate('/login');
        })
        .catch((e: any) =>
            notify(e.error.message, {type: 'error'})
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.formWrapper}>
                <h2 style={styles.title}>Reset Password</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputContainer}>
                        <input
                            name="password"
                            type="password"
                            placeholder="New password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Reset</button>
                </form>
            </div>
            <Notification />
        </div>
    );
};