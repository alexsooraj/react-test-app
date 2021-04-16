const baseUrl = process.env.REACT_APP_DEV_SERVER_BASE_URL ? process.env.REACT_APP_DEV_SERVER_BASE_URL : '/';

export const APIEndpoints = {
    LOGIN: baseUrl + 'api/login',
    CHARTS_DATA: baseUrl + 'api/data',
    TODOS: baseUrl + 'api/todos'
};