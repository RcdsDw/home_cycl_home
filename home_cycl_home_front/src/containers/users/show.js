import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Descriptions, Empty, Tag, Spin } from "antd";
import { getUserById } from "../../actions/user";
import { useEffect, useState } from "react";

export default function ShowUser() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const nav = useNavigate();

    useEffect(() => {
        fetchUser();
    });

    const fetchUser = async () => {
        try {
            const res = await getUserById(id);
            setUser(res.data);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;
    }

    if (!user) {
        return (
            <Empty
                description="Utilisateur non trouvé"
                style={{ marginTop: 100 }}
            />
        );
    }

    return (
        <Card
            style={{ maxWidth: 700, margin: "50px auto", padding: 20 }}
            title={`${user.firstname} ${user.lastname}`}
            extra={
                <Button type="primary" onClick={() => nav("/users")}>
                    Retour à la liste
                </Button>
            }
        >
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Prénom">
                    {user.firstname || "Non renseigné"}
                </Descriptions.Item>

                <Descriptions.Item label="Nom">
                    {user.lastname || "Non renseigné"}
                </Descriptions.Item>

                <Descriptions.Item label="Rôle">
                    <Tag color={user.role === "admin" ? "red" : user.role === "tech" ? "orange" : "geekblue"}>
                        {user.role.toUpperCase()}
                    </Tag>
                </Descriptions.Item>

                <Descriptions.Item label="Numéro de téléphone">
                    {user.number || "Non renseigné"}
                </Descriptions.Item>

                <Descriptions.Item label="Adresse email">
                    {user.email || "Non renseigné"}
                </Descriptions.Item>

                <Descriptions.Item label="Adresse">
                    {user.address?.value || "Non renseignée"}
                </Descriptions.Item>

                <Descriptions.Item label="Date de création">
                    {new Date(user.created_at).toLocaleDateString()}
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
}
