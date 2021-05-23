import React, { useState } from 'react';
// import { byPropKey } from '../../utils';
import { FormContainer } from './FormContainer';
import { Form, Icon, Input } from 'antd';
import { FormButton } from './FormButton';
import { ErrorMessage } from './ErrorMessage';

const SignUpForm = ({ form, onSubmit }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [passwordOne, setPasswordOne] = useState('');
    // eslint-disable-next-line
    const [passwordTwo, setPasswordTwo] = useState('');
    const [error, setError] = useState(null);

    const FormItem = Form.Item;

    const onsubmit = event => {
        onSubmit(email, passwordOne, username).catch(error => {
            setError(error.message);
        });

        event.preventDefault();
    };

    const { getFieldDecorator } = form;

    return (
        <FormContainer>
            <h1 className="title">Sign Up</h1>
            <Form onSubmit={event => onsubmit(event)} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            onChange={event => setUsername(event.target.value)}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                            onChange={event => setEmail(event.target.value)}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('passwordOne', {
                        rules: [{ required: true, message: 'Please input your passwordOne!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            onChange={event => setPasswordOne(event.target.value)}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('passwordTwo', {
                        rules: [{ required: true, message: 'Please input your passwordTwo!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Confirm password"
                            onChange={event => setPasswordTwo(event.target.value)}
                        />
                    )}
                </FormItem>
                <FormItem>
                    <FormButton type="primary" htmlType="submit" className="login-form-button">
                        Sign Up
                    </FormButton>
                </FormItem>
                <ErrorMessage>{error}</ErrorMessage>
            </Form>
        </FormContainer>
    );
};

const WrappedSignUpForm = Form.create()(SignUpForm);

export default WrappedSignUpForm;
