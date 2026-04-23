export enum ResponseMessage {
    USER_NOT_FOUND = 'User does not exist',
    INVALID_PARAMETER = 'Invalid limit parameter',
    INTERNAL_SERVER_ERROR = 'An unexpected error occurred',
    UNAUTHORIZED = 'Your authentication token is missing or invalid.',
    FORBIDDEN = 'Permission Denied',
    SUCCESS = 'Successful',
    LOGIN_SUCCESS = 'Login successful',
}   