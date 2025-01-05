/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Descriptions, Empty, Spin, Row, Col, Tag, List, Divider } from "antd";
import { getInterventionById } from "../../actions/interventions";
import { getUserById } from "../../actions/user";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import dayjs from "dayjs";
import L from "leaflet";

export default function ShowIntervention() {
    const [loading, setLoading] = useState(true);
    const [intervention, setIntervention] = useState(null);
    const [client, setClient] = useState(null);
    const [technician, setTechnician] = useState(null);
    const [totalProductsPrice, setTotalProductsPrice] = useState(0);

    const { id } = useParams();
    const nav = useNavigate();

    useEffect(() => {
        fetchIntervention();
    }, []);

    const fetchIntervention = async () => {
        try {
            const res = await getInterventionById(id);
            setIntervention(res.data);

            const clientPromise = getUserById(res.data.clientId);
            const technicianPromise = getUserById(res.data.techId);

            const [clientRes, technicianRes] = await Promise.all([clientPromise, technicianPromise]);
            setClient(clientRes.data);
            setTechnician(technicianRes.data);

            // Calculer le prix total des produits
            const productsPrice = res.data.products?.reduce(
                (total, product) => total + product.price * (product.quantity || 1),
                0
            ) || 0;
            setTotalProductsPrice(productsPrice.toFixed(2));
        } catch (error) {
            console.error("Erreur lors de la récupération de l'intervention ou des utilisateurs", error);
        } finally {
            setLoading(false);
        }
    };

    const markerIcon = new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    if (loading) {
        return <Spin size="large" style={styles.spinner} />;
    }

    if (!intervention) {
        return <Empty description="Intervention non trouvée" style={styles.empty} />;
    }

    const hasGeoCoordinates = client?.address?.geo?.coordinates?.length === 2;
    const [lng, lat] = hasGeoCoordinates ? client.address.geo.coordinates : [0, 0];

    return (
        <>
            <Button type="primary" style={styles.button} onClick={() => nav("/interventions")}>
                Retour à la liste
            </Button>
            <Button
                type="primary"
                style={styles.button}
                onClick={() => nav(`/interventions/edit/${id}`)}
            >
                Modifier
            </Button>
            <Row gutter={32} style={styles.row}>
                <Col span={12}>
                    <Card
                        style={styles.card}
                        title={`Intervention chez ${client?.firstname} ${client?.lastname}`}
                    >
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Début">
                                {dayjs(intervention.startedAt).format("DD/MM/YYYY HH:mm")}
                            </Descriptions.Item>
                            <Descriptions.Item label="Fin">
                                {intervention.endedAt
                                    ? dayjs(intervention.endedAt).format("DD/MM/YYYY HH:mm")
                                    : "En cours"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Prix Total Intervention">
                                {intervention.price ? `${intervention.price} €` : "Non renseigné"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Vélo">
                                <Tag
                                    color={
                                        intervention.bike === "ville"
                                            ? "green"
                                            : intervention.bike === "electrique"
                                            ? "geekblue"
                                            : "orange"
                                    }
                                >
                                    {intervention.bike.toUpperCase() || "Non renseigné"}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Service">
                                <Tag color={intervention.service === "reparation" ? "red" : "orange"}>
                                    {intervention.service.toUpperCase() || "Non renseigné"}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Technicien">
                                {technician
                                    ? `${technician.firstname} ${technician.lastname}`
                                    : "Non renseigné"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Créé le">
                                {dayjs(intervention.createdAt).format("DD/MM/YYYY HH:mm")}
                            </Descriptions.Item>
                            <Descriptions.Item label="Dernière mise à jour">
                                {dayjs(intervention.updatedAt).format("DD/MM/YYYY HH:mm")}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {intervention.products?.length > 0 && (
                        <Card
                            title="Produits utilisés"
                            style={{ ...styles.card, marginTop: 20 }}
                            bordered
                        >
                            <List
                                dataSource={intervention.products}
                                renderItem={(product) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={product.name}
                                            description={`Prix: ${product.price.toFixed(
                                                2
                                            )} € | Quantité: ${1}`}
                                        />
                                        <div>
                                            Total: {(product.price * (1)).toFixed(
                                                2
                                            )} €
                                        </div>
                                    </List.Item>
                                )}
                            />
                            <Divider />
                            <h3 style={{ textAlign: "right" }}>
                                Prix total des produits: {totalProductsPrice} €
                            </h3>
                        </Card>
                    )}
                </Col>

                <Col span={12}>
                    {hasGeoCoordinates ? (
                        <Card title="Localisation du client" style={styles.card}>
                            <MapContainer
                                center={[lat, lng]}
                                zoom={13}
                                style={{ height: 400, width: "100%" }}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[lat, lng]} icon={markerIcon}>
                                    <Popup>
                                        {client.firstname} {client.lastname}
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </Card>
                    ) : (
                        <Empty description="Localisation non disponible" />
                    )}
                </Col>
            </Row>
        </>
    );
}

const styles = {
    button: {
        marginBottom: 20,
        marginRight: 5,
    },
    spinner: {
        display: "block",
        margin: "100px auto",
    },
    empty: {
        marginTop: 100,
    },
    row: {
        marginTop: 50,
    },
    card: {
        maxWidth: 700,
        padding: 20,
    },
};
