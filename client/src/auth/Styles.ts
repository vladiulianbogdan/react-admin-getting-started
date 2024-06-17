// in src/MyLoginPage.js
import { CSSProperties } from 'react';

export const sharedStyles: { [key: string]: CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '20px',
        backgroundColor: '#f7f7f7'
    },
    formWrapper: {
        width: '100%',
        maxWidth: '400px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    },
    title: {
        marginBottom: '20px',
        textAlign: 'center'
    },
    form: {
        width: '100%'
    },
    inputContainer: {
        marginBottom: '15px'
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    button: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer'
    },
    links: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px'
    },
    link: {
        textDecoration: 'none',
        color: '#007bff'
    }
};
