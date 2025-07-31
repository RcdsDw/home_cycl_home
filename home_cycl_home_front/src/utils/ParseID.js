export function parseID(obj) {
    if (!obj) return null;

    if (typeof obj === 'string') {
        const parts = obj.split('/');
        return parts.length > 0 ? parts.pop() : null;
    }

    if (typeof obj === 'object' && obj['@id']) {
        const parts = obj['@id'].split('/');
        return parts.length > 0 ? parts.pop() : null;
    }

    console.warn('parseID: Format non reconnu', obj);
    return null;
}