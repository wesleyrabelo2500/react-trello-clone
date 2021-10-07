import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { createUser, createUserWithEmailAndPassword } from '../services/auth';

const SignUpForm = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await onSubmit(email, newPassword, username);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className={`text-xl mb-3 text-center`}>Sign Up</h1>
            <Form onFinish={(event) => handleSubmit(event)} className="login-form">
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name="newPassword"
                    rules={[{ required: true, message: 'Please input your new password!' }]}
                >
                    <Input
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        onChange={(event) => setNewPassword(event.target.value)}
                    />
                </Form.Item>

                <Form.Item className={`my-3`}>
                    <Button type="primary" htmlType="submit" className={`w-full`} loading={loading}>
                        Sign Up
                    </Button>
                </Form.Item>

                <div className={`text-red-500`}>{error}</div>
            </Form>
        </div>
    );
};

export const SignUpPage = withRouter(() => {
    const onSubmit = async (email, password, username) => {
        const authUser = await createUserWithEmailAndPassword(email, password);
        await createUser(authUser.user.uid, username, email);
    };

    return (
        <div className={`flex h-full`}>
            <div className={`w-64 m-auto`}>
                <SignUpForm onSubmit={onSubmit} />
            </div>
        </div>
    );
});
