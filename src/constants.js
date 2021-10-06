export const DEFAULT_COLOR = '#0079BF';

export const LABELS = [
    { color: 'yellow', text: 'Low' },
    { color: 'orange', text: 'Middle' },
    { color: 'red', text: 'High' },
];

export const ItemTypes = {
    CARD: 'card',
};

export const EMAIL_ERROR_TYPES = {
    INVALID: {
        STATUS: 'warning',
        MESSAGE: 'Please enter a valid email address',
    },
};

export const ROUTES = {
    SIGN_UP: '/signup',
    SIGN_IN: '/signin',
    LANDING: '/',
    BOARDS: '/boards',
    ACCOUNT: '/account',
    BOARD: '/b/:board',
};
