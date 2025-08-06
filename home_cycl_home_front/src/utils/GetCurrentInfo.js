export function getCurrentUser() {
  try {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    return null;
  }
};

export function getCurrentToken() {
  try {
    const tokenData = localStorage.getItem('token');
    return tokenData ? JSON.parse(tokenData) : null;
  } catch (error) {
    console.error('Erreur lors de la récupération du token:', error);
    return null;
  }
};