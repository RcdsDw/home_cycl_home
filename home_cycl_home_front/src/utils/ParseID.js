export function parseID(obj) {
    if (!obj || typeof obj !== 'object' || !obj['@id']) {
        console.warn('parseID: Objet invalide ou propriété @id manquante', obj);
        return null;
    }

    return obj['@id'].split('/').pop();
}