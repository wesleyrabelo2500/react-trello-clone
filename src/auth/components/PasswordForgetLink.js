import { Link } from 'react-router-dom';
import { PASSWORD_FORGET } from '../../core/routes/routes';
import React from 'react';

export const PasswordForgetLink = () => (
    <p>
        <Link to={PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);
