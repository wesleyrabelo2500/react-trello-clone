import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { Icon } from '@ant-design/compatible';
import { passwordReset } from '../services/auth';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { FormButton } from '../components/common/FormButton';
import { FormContainer } from '../components/common/FormContainer';
import { EMAIL_ERROR_TYPES } from '../constants';

const PasswordForget = (props) => {
    const { onSubmit, form } = props;
    const { getFieldDecorator, validateFields } = form;
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [emailInputErr, setEmailInputErr] = useState({
        status: '',
        message: '',
    });

    const resetEmailInputErr = () => {
        setEmailInputErr({
            status: '',
            message: '',
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        resetEmailInputErr();
        validateFields(async (err) => {
            if (err) {
                setEmailInputErr({
                    status: 'error',
                    message: err.email.errors[0].message,
                });
            } else {
                setEmail('');
                try {
                    await passwordReset(email);
                    setError('');
                } catch (e) {
                    setError(e.message);
                }
            }
        });
    };

    function validateEmail(value) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
    }

    const handleOnChange = (value) => {
        if (value) {
            resetEmailInputErr();
            setEmail(value);
        }
    };

    const handleOnBlur = (value) => {
        const isEmailValid = validateEmail(value);
        if (!isEmailValid) {
            setEmailInputErr({
                status: EMAIL_ERROR_TYPES.INVALID.STATUS,
                message: EMAIL_ERROR_TYPES.INVALID.MESSAGE,
            });
        }
    };

    return (
        <FormContainer>
            <h1 className="title">Password Forget</h1>
            <Form onSubmit={(event) => handleSubmit(event)} className="login-form">
                <Form.Item validateStatus={emailInputErr.status} help={emailInputErr.message}>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: EMAIL_ERROR_TYPES.INVALID.MESSAGE,
                            },
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                            onChange={(event) => handleOnChange(event.target.value)}
                            onBlur={(event) => handleOnBlur(event.target.value)}
                        />
                    )}
                </Form.Item>

                <Form.Item>
                    <FormButton type="primary" htmlType="submit" className="login-form-button">
                        Restore
                    </FormButton>
                </Form.Item>

                <ErrorMessage>{error}</ErrorMessage>
            </Form>
        </FormContainer>
    );
};

export default PasswordForget;
