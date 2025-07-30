/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Descriptions, Empty, Spin, Row, Col, Tag, List, Divider } from "antd";
import { getInterventionById } from "../../actions/interventions";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import dayjs from "dayjs";
import L from "leaflet";
import BikeCard from "../../utils/BikeCard";
import ProductCard from "../../utils/ProductCard";
import ModalProducts from "../../components/interventions/modalProducts";
import { DurationDisplay } from "../../utils/ParseDuration";

export default function ShowIntervention() {
    const [loading, setLoading] = useState(true);
    const [intervention, setIntervention] = useState(null);
    const [client, setClient] = useState(null)
    const [products, setProducts] = useState(null)
    const [isModalProductsOpen, setIsModalProductsOpen] = useState(false);

    const { id } = useParams();
    const nav = useNavigate();

    useEffect(() => {
        fetchIntervention();
    }, [products]);

    const fetchIntervention = async () => {
        try {
            const res = await getInterventionById(id);
            setIntervention(res);
            setClient(res.clientBike?.owner)
            setProducts(res.interventionProducts)
        } catch (error) {
            console.error("Erreur lors de la récupération de l'intervention ou des utilisateurs", error);
        } finally {
            setLoading(false);
        }
    };

    const totalPrice = () => {
        let totalPrice = 0;

        products && products.forEach(product => {
            totalPrice += product.product_price * product.quantity
        });

        return totalPrice
    }

    const showModal = () => {
        setIsModalProductsOpen(true);
    };

    const handleOk = () => {
        setIsModalProductsOpen(false);
    };

    const handleCancel = () => {
        setIsModalProductsOpen(false);
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

    const geoCoords = [client?.address?.coords.lng, client?.address?.coords.lat] || [0, 0];

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
                                {dayjs(intervention.start_date).format("DD/MM/YYYY HH:mm")}
                            </Descriptions.Item>
                            <Descriptions.Item label="Fin">
                                {intervention.end_date
                                    ? dayjs(intervention.end_date).format("DD/MM/YYYY HH:mm")
                                    : "En cours"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Service">
                                <Tag color={"orange"}>
                                    {intervention.typeIntervention.name || "Non renseigné"}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Durée">
                                <DurationDisplay seconds={intervention.typeIntervention.duration} />
                            </Descriptions.Item>
                            <Descriptions.Item label="Prix Total Intervention">
                                {intervention.typeIntervention.price ? `${intervention.typeIntervention.price} €` : "Non renseigné"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Vélo">
                                <BikeCard bike={intervention?.clientBike} />
                            </Descriptions.Item>
                            <Descriptions.Item label="Technicien">
                                {intervention.technician
                                    ? `${intervention.technician.firstname} ${intervention.technician.lastname}`
                                    : "Non renseigné"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Créé le">
                                {dayjs(intervention.created_at).format("DD/MM/YYYY HH:mm")}
                            </Descriptions.Item>
                            <Descriptions.Item label="Dernière mise à jour">
                                {dayjs(intervention.updated_at).format("DD/MM/YYYY HH:mm")}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>

                    <Card
                        title={
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span>Produits Commandés</span>
                                <Button type="primary" onClick={showModal}>
                                    Modifier les produits associés
                                </Button>
                            </div>
                        }
                        style={{ ...styles.card, marginTop: 20 }}
                        bordered
                    >
                        {products.length > 0 && (
                            <>
                                <List
                                    dataSource={products}
                                    renderItem={(product) => (
                                        <List.Item>
                                            <ProductCard product={product} />
                                            <div>
                                                Total: {(product.product.price * product.quantity).toFixed(
                                                    2
                                                )} €
                                            </div>
                                        </List.Item>
                                    )}
                                />
                                <Divider />
                                <h3 style={{ textAlign: "right" }}>
                                    Prix total des produits: {totalPrice().toFixed(2)} €
                                </h3>
                            </>
                        )}
                    </Card>
                </Col>

                <ModalProducts
                    open={isModalProductsOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    currentProducts={products}
                    interventionID={intervention['@id']}
                />

                <Col span={12}>
                    {geoCoords ? (
                        <Card title="Localisation du client" style={styles.card}>
                            <MapContainer
                                center={geoCoords}
                                zoom={13}
                                style={{ height: 400, width: "100%" }}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={geoCoords} icon={markerIcon}>
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
