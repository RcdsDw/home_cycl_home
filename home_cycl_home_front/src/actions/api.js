const API_URL = process.env.REACT_APP_API_URL;

async function api(method, endpoint, payload = null, token = true) {
    console.log(localStorage.getItem('token'))
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${localStorage.getItem('token')}` }),
    };

    const options = {
        method: method.toUpperCase(),
        headers,
    };

    if (!['GET', 'DELETE'].includes(method.toUpperCase()) && payload !== null) {
        options.body = JSON.stringify(payload);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Error with the ${method} request`);
        }

        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

/**
 * @param {string} method - "GET"
 * @param {string} endpoint - "/route"
 * @param {boolean} token - default = true
 */
export function getReq(endpoint, token = true) {
    return api("GET", endpoint, null, token);
}
/**
 * @param {string} method - "POST"
 * @param {string} endpoint - "/route"
 * @param {object|null} payload - datas to send (default = null)
 * @param {boolean} token - default = true
 */
export function postReq(endpoint, payload, token = true) {
    return api("POST", endpoint, payload, token);
}
/**
 * @param {string} method - "PATCH"
 * @param {string} endpoint - "/route"
 * @param {object|null} payload - datas to send (default = null)
 * @param {boolean} token - default = true
 */
export function patchReq(endpoint, payload, token = true) {
    return api("PATCH", endpoint, payload, token);
}
/**
 * @param {string} method - "DELETE"
 * @param {string} endpoint - "/route"
 * @param {boolean} token - default = true
 */
export function deleteReq(endpoint, token = true) {
    return api("DELETE", endpoint, null, token);
}
