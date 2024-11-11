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
