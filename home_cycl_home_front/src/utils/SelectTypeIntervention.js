import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { getTypeInterventions } from '../actions/typesIntervention';
import { parseID } from './ParseID';

const { Option } = Select;

export default function SelectTypeIntervention({ selectedTypeIntervention, setSelectedTypeIntervention }) {
    const [typeIntervention, setTypeInterventions] = useState([]);

    useEffect(() => {
        fetchTypeInterventions();
    }, []);

    const fetchTypeInterventions = async () => {
        try {
            const res = await getTypeInterventions();
            setTypeInterventions(res.member);
        } catch (error) {
            console.error("Erreur lors de la récupération des types d'interventions", error);
        }
    };

    const handleTypeInterventionChange = (value) => {
        const newTypeSelected = typeIntervention.find((target) => parseID(target) === value)
        setSelectedTypeIntervention(newTypeSelected);
    };

    return (
        <Select
            value={parseID(selectedTypeIntervention)}
            onChange={handleTypeInterventionChange}
            allowClear
            style={{ width: '100%', margin: "5px", color: "black" }}
            placeholder="Sélectionnez un type d'intervention"
        >
            {typeIntervention && typeIntervention.map((type) => (
                <Option key={parseID(type)} value={parseID(type)}>
                    {type.name} | {type.duration / 60}min | {type.price} €
                </Option>
            ))}
        </Select>
    );
}
