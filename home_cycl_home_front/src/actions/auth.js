const API_URL = process.env.REACT_APP_API_URL;

export async function authRegister(values) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      console.log("DATA REGISTER", data)

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

export async function authLogin(values) {
    try {
      console.log('je suis bien dans le code', values)
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      const data = await response.json();
      console.log("DATA RESPONSE", data)

      if (response.ok) {
          localStorage.setItem('user', JSON.stringify(data.user));
      } else {
          throw new Error(data.message || 'Erreur lors de la connexion');
      }
      
      console.log("DATA LOGiN", data)
      return data;
    } catch (error) {
      throw error;
    }
  }
  
export async function authLogout() {
    try {
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      throw error;
    }
  }
  