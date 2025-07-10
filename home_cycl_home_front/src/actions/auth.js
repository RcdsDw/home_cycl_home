export async function authRegister(values) {
    try {
      const response = await fetch('http://localhost/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log("DATA REGISTER", data)
      return data;
    } catch (error) {
      throw error;
    }
  }

export async function authLogin(values) {
    try {
      console.log('je suis bien dans le code')
      const response = await fetch('http://localhost/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
              console.log("DATA RESPONSE", data)
        localStorage.setItem('user', JSON.stringify(data.user));
    } else {
        throw new Error(data.message || 'Erreur lors de la connexion');
    }
      
      const data = await response.json();
      console.log("DATA LOGiN", data)
      return data;
    } catch (error) {
      throw error;
    }
  }
  
export async function authLogout() {
    try {
      await fetch('http://localhost/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      throw error;
    }
  }
  