/* eslint-disable no-throw-literal */
export async function createUser(values) {
    try {
        const response = await fetch(`http://localhost:3333/api/v1/users/new`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
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
        const response = await fetch(`http://localhost:3333/api/v1/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
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
        const response = await fetch(`http://localhost:3333/api/v1/users/${id}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
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
        const response = await fetch(`http://localhost:3333/api/v1/users`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
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
        const response = await fetch(`http://localhost:3333/api/v1/users/${id}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
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
        const response = await fetch(`http://localhost:3333/api/v1/users/tech`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
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