import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { getTechUsers } from '../actions/user';

const { Option } = Select;

export default function SelectTech({selectedTechUser, setSelectedTechUser}) {
    const [techUsers, setTechUsers] = useState([]);

    useEffect(() => {
        fetchTechUsers();
    }, []);

    const fetchTechUsers = async () => {
        try {
            const res = await getTechUsers();
            setTechUsers(res.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des techniciens", error);
        }
    };

    const handleTechUserChange = (value) => {
        setSelectedTechUser(value);
    };

    return (
        <Select
            value={selectedTechUser}
            onChange={handleTechUserChange}
            style={{ width: '100%', margin: "5px" }}
            placeholder="Sélectionnez un utilisateur"
        >
            <Option disabled value={null}>Sélectionnez un utilisateur</Option>

            {techUsers && techUsers.map((user) => (
                <Option key={user.id} value={user.id}>
                    {user.firstname} {user.lastname}
                </Option>
            ))}
        </Select>
    );
}
