/* eslint-disable no-throw-literal */
export async function getProducts() {
    try {
        const response = await fetch(`http://localhost:3333/api/v1/products`, {
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