import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { getBrands } from '../actions/brands';
import { parseID } from './ParseID';

const { Option } = Select;

export default function SelectBrands({ selectedBrand, setSelectedBrand }) {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const res = await getBrands();
            console.log("🚀 ~ fetchBrands ~ res:", res)
            setBrands(res.member);
        } catch (error) {
            console.error("Erreur lors de la récupération des marques", error);
        }
    };

    const handleBrandChange = (value) => {
        const newTechSelected = brands.find((target) => parseID(target) === value)
        setSelectedBrand(newTechSelected);
    };

    return (
        <Select
            value={parseID(selectedBrand)}
            onChange={handleBrandChange}
            allowClear
            style={{ width: '100%', margin: "5px" }}
            placeholder="Sélectionnez une marque"
        >
            <Option disabled value={null}>Sélectionnez une marque</Option>

            {brands && brands.map((brand) => (
                <Option key={parseID(brand)} value={parseID(brand)}>
                    {brand.name}
                </Option>
            ))}
        </Select>
    );
}
