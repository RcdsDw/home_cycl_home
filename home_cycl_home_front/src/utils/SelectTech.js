import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { getTechUsers } from '../actions/user';
import { parseID } from './ParseID';

const { Option } = Select;

export default function SelectTech({ selectedTechUser, setSelectedTechUser }) {
    const [techUsers, setTechUsers] = useState([]);

    useEffect(() => {
        fetchTechUsers();
    }, []);

    const fetchTechUsers = async () => {
        try {
            const res = await getTechUsers();
            setTechUsers(res.member);
        } catch (error) {
            console.error("Erreur lors de la récupération des techniciens", error);
        }
    };

    const handleTechUserChange = (value) => {
        const newTechSelected = techUsers.find((target) => parseID(target) === value)
        setSelectedTechUser(newTechSelected);
    };

    return (
        <Select
            value={parseID(selectedTechUser)}
            onChange={handleTechUserChange}
            allowClear
            style={{ width: '100%', margin: "5px" }}
            placeholder="Sélectionnez un utilisateur"
        >
            <Option disabled value={null}>Sélectionnez un utilisateur</Option>

            {techUsers && techUsers.map((user) => (
                <Option key={parseID(user)} value={parseID(user)}>
                    {user.firstname} {user.lastname}
                </Option>
            ))}
        </Select>
    );
}
