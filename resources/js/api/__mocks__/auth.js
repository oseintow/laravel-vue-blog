const userData =  {token: 'mocked token', user: 'mocked user object'};

export function login() {
    return Promise.resolve({data: userData });
}

export function register() {
    return Promise.resolve({data: userData});
}

export function logout() {
    return Promise.resolve();
}