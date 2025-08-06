import { useNavigate } from "react-router-dom";
import { Button, Popover, Tag } from "antd";
import { parseID } from "./ParseID";

export default function BikeCard({ bike }) {
    const nav = useNavigate()
    if (!bike) {
        return
    }

    return (
        <Popover
            title={bike.name}
            content={
                <div>
                    <p><b>Taille :</b> {bike.size}</p>
                    <p><b>Type :</b> {bike.type}</p>
                    <p><b>Marque :</b> {bike.brand?.name}</p>
                    <p><b>Modèle :</b> {bike.model?.name}</p>
                    <Button size="small" type="link" onClick={() => nav(`/users/show/${parseID(bike.owner)}`)}>
                        Voir le détenteur
                    </Button>
                </div>
            }
        >
            <Tag color="geekblue" style={{ cursor: 'pointer' }}>
                {bike.name}
            </Tag>
        </Popover>
    )
}