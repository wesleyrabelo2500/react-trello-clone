import { Form, Icon, Input } from 'antd';
import React, { useState } from 'react';
import { doSignInWithEmailAndPassword } from '../api/auth';
import { BOARDS } from '../../core/routes/routes';
// import { byPropKey } from '../../utils';
import { FormContainer } from './FormContainer';
import { ErrorMessage } from './ErrorMessage';
import { FormButton } from './FormButton';

const SignInForm = ({ history, form }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const FormItem = Form.Item;

    const onSubmit = async event => {
        event.preventDefault();

        return await doSignInWithEmailAndPassword(email, password)
            .then(() => {
                history.push(BOARDS);
            })
            .catch(error => {
                setError(error.message);
            });
    };

    const { getFieldDecorator } = form;

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={onSubmit}>
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
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            onChange={event => setPassword(event.target.value)}
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </FormItem>
                <FormItem>
                    <FormButton type="primary" htmlType="submit">
                        Log in
                    </FormButton>
                </FormItem>
                <ErrorMessage>{error}</ErrorMessage>
            </Form>
        </FormContainer>
    );
};

export const WrappedSignInForm = Form.create()(SignInForm);
