import React, { useEffect, useState } from 'react';
import { InputNumber, Select } from 'antd';
import { getProducts } from '../actions/products';
import { parseID } from './ParseID';
import { updateInterventionProduct } from '../actions/interventionProduct';

const { Option } = Select;

export default function SelectProducts({
    selectedProducts,
    setSelectedProducts,
    interventionID,
}) {
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

    const handleProductChange = (selectedIds) => {
        const newSelectedProducts = selectedIds.map((productId) => {
            const existingItem = selectedProducts?.find(item =>
                parseID(item.product) === productId
            );

            const product = products.find(p => parseID(p) === productId);

            if (existingItem) {
                return existingItem;
            } else {
                return {
                    product: product,
                    quantity: 1,
                    price: product?.price || 0
                };
            }
        });

        setSelectedProducts(newSelectedProducts);
    };

    const handleQuantityChange = async (productId, newQuantity) => {
        const productToUpdate = selectedProducts.find((item) => parseID(item.product) === productId)

        if (!productToUpdate) {
            console.error(`Produit avec l'ID ${productId} non trouvé`);
            return;
        }

        let itemToUpdate = {
            intervention: interventionID,
            product: productToUpdate.product['@id'],
            quantity: newQuantity,
            product_price: productToUpdate?.product_price
        };

        try {
            await updateInterventionProduct(parseID(productToUpdate), itemToUpdate)
        } catch (err) {
            console.error(err)
        }

        const updatedProducts = selectedProducts.map((item) => {
            if (parseID(item.product) === productId) {
                return {
                    ...item,
                    quantity: newQuantity || 1,

                };
            }
            return item;
        });

        setSelectedProducts(updatedProducts);
    };

    const getSelectedProductIds = () => {
        return selectedProducts?.map(item => parseID(item.product)) || [];
    };

    return (
        <div>
            <Select
                mode="multiple"
                value={getSelectedProductIds()}
                onChange={handleProductChange}
                style={{ width: '100%', marginBottom: 16 }}
                placeholder="Sélectionnez un ou plusieurs produits"
                showSearch
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {products?.map((product) => (
                    <Option key={parseID(product)} value={parseID(product)}>
                        {product.name} | {product.price?.toFixed(2)} €
                    </Option>
                ))}
            </Select>

            {selectedProducts?.length > 0 && (
                <div style={{ marginTop: 16 }}>
                    <h4>Produits sélectionnés :</h4>
                    {selectedProducts.map((item) => {
                        const productId = parseID(item.product);
                        return (
                            <div
                                key={productId}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: 12,
                                    padding: 12,
                                    border: '1px solid #d9d9d9',
                                    borderRadius: 6,
                                    backgroundColor: '#fafafa'
                                }}
                            >
                                <div style={{ flex: 1, marginRight: 12 }}>
                                    <strong>{item.product?.name}</strong>
                                    <div style={{ fontSize: '12px', color: '#666' }}>
                                        Prix unitaire catalogue: {item.product?.price?.toFixed(2)} €
                                    </div>
                                </div>

                                <div style={{ marginRight: 12 }}>
                                    <label style={{ display: 'block', fontSize: '12px', marginBottom: 4 }}>
                                        Quantité
                                    </label>
                                    <InputNumber
                                        min={1}
                                        value={item.quantity}
                                        onChange={(value) => handleQuantityChange(productId, value)}
                                        style={{ width: 80 }}
                                    />
                                </div>

                                <div style={{ minWidth: 80, textAlign: 'right' }}>
                                    <div style={{ fontSize: '12px', color: '#666' }}>Total:</div>
                                    <strong>
                                        {((item.product?.price || 0) * (item.quantity || 1)).toFixed(2)} €
                                    </strong>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}