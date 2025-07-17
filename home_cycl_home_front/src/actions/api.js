const API_URL = process.env.REACT_APP_API_URL;
console.log("🚀 ~ API_URL:", API_URL)

/** method is an string, endpoint is an string, payload is an json object, token is an boolean  */
async function api(method, endpoint, payload, token) {
    const headersWithAuth = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    const headersWithoutAuth = { 'Content-Type': 'application/json' }
    const headers = token ? headersWithAuth : headersWithoutAuth
    console.log("🚀 ~ api ~ headers:", headers)

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: `${method.toUpperCase()}`,
            headers: headers,
            body: JSON.stringify(payload),
        });
        console.log("🚀 ~ api ~ response:", response)

        const data = await response.json();
        console.log("🚀 ~ api ~ data:", data)

        if (!response.ok) {
            throw new Error(data.message || `Error with the ${method} request`);
        }

        return data;
    } catch (err) {
        console.error(err)
    }
}

export function getReq(endpoint, token = true) {
    return api("GET", endpoint, token)
}

export function postReq(endpoint, payload, token = true) {
    return api("POST", endpoint, payload, token)
}

export function patchReq(endpoint, payload, token = true) {
    return api("PATCH", endpoint, payload, token)
}

export function deleteReq(endpoint, token = true) {
    return api("DELETE", endpoint, token)
}