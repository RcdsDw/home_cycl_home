// const API_URL = process.env.REACT_APP_API_URL;

// export async function authRegister(values) {
//   try {
//     const response = await fetch(`${API_URL}/register`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(values),
//     });

//     const data = await response.json();
//     console.log("DATA REGISTER", data)
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function authLogin(values) {
//   try {
//     const response = await fetch(`${API_URL}/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(values),
//     });

//     const data = await response.json();
//     let user

//     if (response.ok) {
//       localStorage.setItem('token', data.token);
//       const res = await fetch(`${API_URL}/me`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       user = await res.json()
//     } else {
//       throw new Error(user.message || 'Erreur lors de la connexion');
//     }

//     localStorage.setItem("user", JSON.stringify(user))
//     return user;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function authLogout() {
//   try {
//     await fetch(`${API_URL}/logout`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   } catch (error) {
//     throw error;
//   }
// }


import { getReq, postReq } from "./api";

export async function authRegister(values) {
  return await postReq("/register", values, false)
}

export async function authLogin(values) {
  const data = await postReq("/login", values, false);
  let currentUser;

  if (data) {
    localStorage.setItem('token', data.token);
    currentUser = await getReq("/me");
    localStorage.setItem("user", JSON.stringify(currentUser));
  }

  return currentUser;
}

export async function authLogout() {
  await getReq("/logout", false)
}
