import { useNavigate, useParams } from "react-router-dom";

import { Button, Card, Descriptions, Empty, Tag } from "antd";
import { getUserById } from "../../actions/user";
import AddressSearch from "../../utils/AdressSearch";
import { useEffect, useState } from "react";

export default function ShowUser() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()
    const { id } = useParams();
    const nav = useNavigate()

    useEffect(() => {
        fetchUsers()
      }, [])
  
    const fetchUsers = async() => {
        await getUserById(id).then((res) => {
            setUser(res.data)
            setLoading(false)
        })
        console.log("user", user)
    }

    if (loading) {
        return <Empty/>
    }

    return (
        <Card style={{ maxWidth: 600, margin: "auto"}}>
            <Button onClick={nav("/users")}>Retour</Button>
            <Descriptions title="Informations" items={user} />;

            <Descriptions.Item label="Prénom">{user.firstname}</Descriptions.Item>
            <Descriptions.Item label="Nom">{user.lastname}</Descriptions.Item>
            <Descriptions.Item label="Rôle">
                <Tag color="geekblue">
                    {user.role}
                </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Numéro">{user.number}</Descriptions.Item>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Adresse">
                {/* {user.address.value} */}
            </Descriptions.Item>;
        </Card>
    )
}

// erreur : mergedItems.map is not a function