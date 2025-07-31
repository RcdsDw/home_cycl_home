import React, { useState, useEffect } from 'react';
import { Row, Select } from 'antd';
import { getBrands } from '../actions/brands';
import { parseID } from './ParseID';

const { Option } = Select;

export default function SelectBrandModel({
    selectedBrand,
    setSelectedBrand,
    selectedModel,
    setSelectedModel,
}) {
    console.log("🚀 ~ SelectBrandModel ~ selectedBrand:", selectedBrand)
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    console.log("🚀 ~ SelectBrandModel ~ models:", models)

    useEffect(() => {
        if (selectedBrand) {
            setModels(selectedBrand.models);
        }
        fetchBrands();
    }, []);

    useEffect(() => {
        setModels(selectedBrand?.models)
    }, [selectedBrand])

    const fetchBrands = async () => {
        try {
            const res = await getBrands();
            setBrands(res.member);
        } catch (error) {
            console.error("Erreur lors de la récupération des marques", error);
        }
    };

    const handleBrandChange = (value) => {
        const brand = brands.find((target) => parseID(target) === value);
        setSelectedBrand(brand);
        setSelectedModel(null);
    };

    const handleModelChange = (value) => {
        const model = models.find((target) => parseID(target) === value);
        setSelectedModel(model);
    };

    return (
        <Row>
            <Select
                value={parseID(selectedBrand)}
                onChange={handleBrandChange}
                placeholder="Sélectionnez une marque"
                allowClear
                style={{ width: '100%', marginBottom: 10 }}
            >
                {brands && brands.map((brand) => (
                    <Option key={parseID(brand)} value={parseID(brand)}>
                        {brand.name}
                    </Option>
                ))}
            </Select>

            <Select
                value={parseID(selectedModel)}
                onChange={handleModelChange}
                placeholder={selectedBrand ? "Sélectionnez un modèle" : "Sélectionnez d'abord une marque"}
                disabled={!selectedBrand}
                allowClear
                style={{ width: '100%' }}
            >
                {models && models.map((model) => (
                    <Option key={parseID(model)} value={parseID(model)}>
                        {model.name}
                    </Option>
                ))}
            </Select>
        </Row>
    );
}
