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
        return data;
    } catch (error) {
        throw error;
    }
}

