const API_URL = process.env.REACT_APP_API_URL;

async function api(method, endpoint, payload, token) {
  let contentType = "application/ld+json";

  if (method.toUpperCase() === "PATCH") {
    contentType = "application/merge-patch+json";
  }

  const headers = {
    "Content-Type": contentType,
    ...(token && { Authorization: `Bearer ${localStorage.getItem("token")}` }),
  };

  const options = {
    method: method.toUpperCase(),
    headers,
  };

  if (!["GET", "DELETE"].includes(method.toUpperCase()) && payload !== null) {
    options.body = JSON.stringify(payload);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    let data = null;
    if (response.status !== 204) {
      try {
        data = await response.json();
      } catch (parseError) {
        data = null;
      }
    }

    if (!response.ok) {
      const error = new Error(data?.message || "Erreur serveur");
      error.status = response.status;
      error.details = data;
      throw error;
    }

    return data;
  } catch (err) {
    throw err;
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
 * @param {string} method - "PUT"
 * @param {string} endpoint - "/route"
 * @param {object|null} payload - datas to send (default = null)
 * @param {boolean} token - default = true
 */
export function putReq(endpoint, payload, token = true) {
  return api("PUT", endpoint, payload, token);
}
/**
 * @param {string} method - "DELETE"
 * @param {string} endpoint - "/route"
 * @param {boolean} token - default = true
 */
export function deleteReq(endpoint, token = true) {
  return api("DELETE", endpoint, null, token);
}
