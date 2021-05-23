import { Link } from 'react-router-dom';
import { SIGN_UP } from '../../core/routes/routes';
import React from 'react';

export const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={SIGN_UP}>Sign Up</Link>
    </p>
);
