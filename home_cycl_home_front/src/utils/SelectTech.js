import React, { useEffect, useState } from 'react';
import { getTechUsers } from '../actions/user';

export default function SelectTech() {
    const [techUsers, setTechUsers] = useState([]);
    const [selectedTechUser, setSelectedTechUser] = useState('');

    useEffect(() => {
        fetchTechUsers();
    }, []);

    const fetchTechUsers = async () => {
        try {
            const users = await getTechUsers();
            setTechUsers(users);
        } catch (error) {
            console.error("Erreur lors de la récupération des techniciens", error);
        }
    };

    const handleTechUserChange = (e) => {
        setSelectedTechUser(e.target.value);
    };

    return (
        <select onChange={handleTechUserChange} value={selectedTechUser}>
            <option value="">Sélectionnez un utilisateur</option>
            {techUsers.map((user) => (
                <option key={user.id} value={user.id}>
                    {user.name}
                </option>
            ))}
        </select>
    );
}
