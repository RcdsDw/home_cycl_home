/* eslint-disable no-throw-literal */
const API_URL = process.env.REACT_APP_API_URL;

export async function createUser(values) {
    try {
        const response = await fetch(`${API_URL}/users/new`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                data: data,
            };
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export async function updateUser(id, values) {
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                data: data,
            };
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export async function deleteUser(id) {
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                data: data,
            };
        }

        return data;
    } catch (error) {
        throw error;
    }
}


export async function getUsers() {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                data: data,
            };
        }
        
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getUserById(id) {
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                data: data,
            };
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export async function getTechUsers() {
    try {
        const response = await fetch(`${API_URL}/users/tech`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                data: data,
            };
        }
        
        return data;
    } catch (error) {
        throw error;
    }
}