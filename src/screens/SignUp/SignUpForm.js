import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

import { byPropKey } from '../../utils/index';
import styled from 'styled-components';

const FormItem = Form.Item;

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit(event) {
    const { email, passwordOne, username } = this.state;

    this.props.onSubmit(email, passwordOne, username).catch(error => {
      this.setState(byPropKey('error', error.message));
    });

    event.preventDefault();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { error } = this.state;

    return (
      <StyledSignUpForm>
        <h1 className="title">Sign Up</h1>
        <Form onSubmit={event => this.onSubmit(event)} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Username"
                onChange={event =>
                  this.setState(byPropKey('username', event.target.value))
                }
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Email"
                onChange={event =>
                  this.setState(byPropKey('email', event.target.value))
                }
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('passwordOne', {
              rules: [
                { required: true, message: 'Please input your passwordOne!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
                onChange={event =>
                  this.setState(byPropKey('passwordOne', event.target.value))
                }
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('passwordTwo', {
              rules: [
                { required: true, message: 'Please input your passwordTwo!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Confirm password"
                onChange={event =>
                  this.setState(byPropKey('passwordTwo', event.target.value))
                }
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign Up
            </Button>
          </FormItem>
          <Error>{error}</Error>
        </Form>
      </StyledSignUpForm>
    );
  }
}

const StyledSignUpForm = styled.div`
  min-width: 300px;
  margin: auto;
`;

const Error = styled.div`
  color: red;
`;

const WrappedSignUpForm = Form.create()(SignUpForm);

export default WrappedSignUpForm;
