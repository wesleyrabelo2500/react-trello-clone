import React from 'react';

import { AuthUserContext } from '../auth/utils/AuthUserContext';
import AuthorizedNavigation from './AuthorizedNavigation';
import UnauthorizedNavigation from './UnauthorizedNavigation';

export const Navigation = () => (
    <AuthUserContext.Consumer>
        {authUser => (authUser ? <AuthorizedNavigation /> : <UnauthorizedNavigation />)}
    </AuthUserContext.Consumer>
);
