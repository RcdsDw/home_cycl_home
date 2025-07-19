/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Card, Descriptions, Empty, Tag, Spin, Row, Col } from "antd";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import dayjs from "dayjs";

import { getUserById } from "../../actions/user";
import TagRoles from "../../utils/TagRoles";

export default function ShowUser() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const nav = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await getUserById(id);
            setUser(res);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur", error);
        } finally {
            setLoading(false);
        }
    };

    const defaultPosition = [48.8566, 2.3522]; // Paris par défaut
    const userPosition = user?.address?.geo?.coordinates ? [user.address.geo.coordinates[1], user.address.geo.coordinates[0]] : defaultPosition;

    const markerIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    if (loading) {
        return <Spin size="large" style={styles.spinner} />;
    }

    if (!user) {
        return (
            <Empty
                description="Utilisateur non trouvé"
                style={styles.empty}
            />
        );
    }

    return (
        <>
            <Button type="primary" style={styles.button} onClick={() => nav("/users")}>
                Retour à la liste
            </Button>
            <Button
                type="primary"
                color="danger"
                style={styles.button}
                onClick={() => nav(`/users/edit/${id}`)}
            >
                Modifier
            </Button>
            <Row gutter={32} style={styles.row}>
                <Col span={12}>
                    <Card
                        style={styles.card}
                        title={`${user.firstname} ${user.lastname}`}
                    >
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Prénom">
                                {user.firstname || "Non renseigné"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Nom">
                                {user.lastname || "Non renseigné"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Rôle">
                                <TagRoles roles={user.roles} />
                            </Descriptions.Item>
                            <Descriptions.Item label="Numéro de téléphone">
                                {user.number || "Non renseigné"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Adresse email">
                                {user.email || "Non renseigné"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Adresse">
                                {user.address.street + ", " + user.address.code + " " + user.address.city || "Non renseignée"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Date de création">
                                {dayjs(user.created_at).format("DD/MM/YYYY HH:mm")}
                            </Descriptions.Item>
                            <Descriptions.Item label="Dernière modification">
                                {dayjs(user.updated_at).format("DD/MM/YYYY HH:mm")}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
                <Col span={11}>
                    <MapContainer center={userPosition} zoom={13} style={styles.map}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={userPosition} icon={markerIcon}>
                            <Popup>
                                {user.address?.value || "Adresse non renseignée"}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </Col>
            </Row>
        </>
    );
}

const styles = {
    button: {
        marginBottom: 20,
        marginRight: 5
    },
    spinner: {
        display: 'block',
        margin: '100px auto'
    },
    empty: {
        marginTop: 100
    },
    row: {
        marginTop: 50
    },
    card: {
        maxWidth: 700,
        padding: 20
    },
    map: {
        height: 500,
        width: '100%'
    }
};
