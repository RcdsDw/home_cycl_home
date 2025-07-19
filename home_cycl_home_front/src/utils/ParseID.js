export function parseID(user) {
    return user['@id']?.split('/').pop();
}