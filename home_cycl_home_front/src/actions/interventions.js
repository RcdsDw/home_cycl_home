/* eslint-disable no-throw-literal */

// Fonction pour créer une intervention
export async function createIntervention(values) {
    try {
        const response = await fetch(`http://localhost:3333/api/v1/interventions`, {
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

// Fonction pour mettre à jour une intervention
export async function updateIntervention(id, values) {
    try {
        const response = await fetch(`http://localhost:3333/api/v1/interventions/${id}`, {
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

// Fonction pour supprimer une intervention
export async function deleteIntervention(id) {
    try {
        const response = await fetch(`http://localhost:3333/api/v1/interventions/${id}`, {
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

// Fonction pour récupérer une intervention par son ID
export async function getInterventionById(id) {
    try {
        const response = await fetch(`http://localhost:3333/api/v1/interventions/${id}`, {
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

// Fonction pour récupérer toutes les interventions
export async function getInterventions() {
    try {
        const response = await fetch(`http://localhost:3333/api/v1/interventions`, {
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
