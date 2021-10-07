import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { actionTypes } from '../utils/reducer';
import { useStateValue } from '../utils/state-provider';
import { signInWithEmailAndPassword } from '../services/auth';
import { EMAIL_ERROR_TYPES, ROUTES } from '../constants';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [emailInputErr, setEmailInputErr] = useState({
        status: null,
        message: null,
    });
    const [, dispatch] = useStateValue();

    const signInWithGoogle = async (event) => {
        event.preventDefault();
        try {
            const result = await auth.signInWithPopup(provider);
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
            window.location = ROUTES.BOARDS;
        } catch (error) {
            alert(error.message);
        }
    };

    const onFinish = async () => {
        const submitButton = document.querySelector('.login-form-button');
        setEmailInputErr({
            status: '',
            message: '',
        });
        try {
            submitButton.disabled = true;
            await signInWithEmailAndPassword(email, password);
            submitButton.disabled = false;
        } catch (error) {
            submitButton.disabled = false;
            setError(error.message);
        }
    };

    const handleEmailInputBlur = () => {
        setEmailInputErr({
            status: EMAIL_ERROR_TYPES.INVALID.STATUS,
            message: EMAIL_ERROR_TYPES.INVALID.MESSAGE,
        });
    };

    return (
        <div>
            <h1 className={`text-xl mb-3 text-center`}>Sign In</h1>

            <Form onFinish={onFinish}>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                    validateStatus={emailInputErr.status}
                    help={emailInputErr.message}
                >
                    <Input
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                        onChange={(event) => setEmail(event.target.value)}
                        onBlur={handleEmailInputBlur}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <div className="login-buttons">
                        <Button type="primary" htmlType="submit" className={`w-full`}>
                            Log in
                        </Button>
                        or
                        <Button
                            type="danger"
                            htmlType="submit"
                            className={`w-full`}
                            onClick={signInWithGoogle}
                        >
                            Continue with Google
                        </Button>
                    </div>
                </Form.Item>

                <div className={`text-red-500`}>{error}</div>
            </Form>
        </div>
    );
};

export const SignInPage = ({ history }) => (
    <div className={`flex h-full`}>
        <div className={`w-64 m-auto`}>
            <SignInForm history={history} />
            <p>
                Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
            </p>
        </div>
    </div>
);
