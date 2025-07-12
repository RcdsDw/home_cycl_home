/* eslint-disable no-throw-literal */
const API_URL = process.env.REACT_APP_API_URL;

export async function createIntervention(values) {
    try {
        const response = await fetch(`${API_URL}/interventions`, {
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

export async function updateIntervention(id, values) {
    try {
        const response = await fetch(`${API_URL}/interventions/${id}`, {
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

export async function deleteIntervention(id) {
    try {
        const response = await fetch(`${API_URL}/interventions/${id}`, {
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

export async function getInterventionById(id) {
    try {
        const response = await fetch(`${API_URL}/interventions/${id}`, {
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

export async function getInterventions() {
    try {
        const response = await fetch(`${API_URL}/interventions`, {
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
