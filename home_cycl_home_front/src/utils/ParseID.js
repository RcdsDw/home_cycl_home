export function parseID(item) {
    return item['@id']?.split('/').pop();
}