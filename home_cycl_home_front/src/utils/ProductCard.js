import { useNavigate } from "react-router-dom";
import { Button, Popover, Tag } from "antd";
import { parseID } from "./ParseID";

export default function ProductCard({ product }) {
    const nav = useNavigate()

    return (
        <Popover
            title={product.product.name}
            content={
                <div>
                    <p><b>Prix :</b> {product.product_price.toFixed(2)} €</p>
                    <p><b>Description :</b> {product.product.description}</p>
                    <p><Tag color="geekblue">Catégorie : {product.product.category}</Tag></p>
                    <Button size="small" type="link" onClick={() => nav(`/bikes/${parseID(product.product)}`)}>
                        Voir le produit
                    </Button>
                </div>
            }
        >
            <Tag color="geekblue" style={{ cursor: 'pointer' }}>
                {product.product.name} | Prix : {product.product_price.toFixed(2)} € | Quantité : {product.quantity}
            </Tag>
        </Popover>
    )
}