import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { getProducts } from '../actions/products';
import { parseID } from './ParseID';

const { Option } = Select;

export default function SelectProducts({ selectedProducts, setSelectedProducts }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await getProducts();
            setProducts(res.member);
        } catch (error) {
            console.error("Erreur lors de la récupération des produits", error);
        }
    };

    const handleProductChange = (value) => {
        setSelectedProducts(value);
    };

    return (
        <Select
            mode='multiple'
            value={selectedProducts && selectedProducts.map((product) => parseID(product))}
            onChange={handleProductChange}
            style={{ width: '100%', margin: "5px", color: "black" }}
            placeholder="Sélectionnez un ou plusieurs produits"
        >
            {products && products.map((product) => (
                <Option key={parseID(product)} value={parseID(product)}>
                    {product.name} | {product.price.toFixed(2)} €
                </Option>
            ))}
        </Select>
    );
}
