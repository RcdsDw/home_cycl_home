import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { getModels } from '../actions/models';
import { parseID } from './ParseID';

const { Option } = Select;

export default function SelectModels({ selectedModel, setSelectedModel }) {
    const [models, setModels] = useState([]);

    useEffect(() => {
        fetchModels();
    }, []);

    const fetchModels = async () => {
        try {
            const res = await getModels();
            console.log("🚀 ~ fetchModels ~ res:", res)
            setModels(res.member);
        } catch (error) {
            console.error("Erreur lors de la récupération des modèles", error);
        }
    };

    const handleModelChange = (value) => {
        const newTechSelected = models.find((target) => parseID(target) === value)
        setSelectedModel(newTechSelected);
    };

    return (
        <Select
            value={parseID(selectedModel)}
            onChange={handleModelChange}
            allowClear
            style={{ width: '100%', margin: "5px" }}
            placeholder="Sélectionnez un modèle"
        >
            <Option disabled value={null}>Sélectionnez un modèle</Option>

            {models && models.map((model) => (
                <Option key={parseID(model)} value={parseID(model)}>
                    {model.name}
                </Option>
            ))}
        </Select>
    );
}
