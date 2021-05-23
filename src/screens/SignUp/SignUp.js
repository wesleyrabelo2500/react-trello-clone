import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';
import WrappedSignUpForm from './SignUpForm';

class SignUpScreen extends Component {
  async onSubmit(email, password, username) {
    return auth
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        db.doCreateUser(authUser.user.uid, username, email);
        window.history.push(routes.BOARDS);
      });
  }

  render() {
    return <WrappedSignUpForm onSubmit={this.onSubmit} />;
  }
}

export default withRouter(SignUpScreen);
