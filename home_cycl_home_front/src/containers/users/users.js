import { useNavigate } from "react-router-dom";

import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';

import { Button, message, Modal, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../actions/user";

export default function Users() {
  const [datas, setDatas] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const nav = useNavigate()

    useEffect(() => {
      fetchUsers()
    }, [])

    const fetchUsers = async() => {
      await getUsers().then((res) => setDatas(res.data))
    }

    const showModal = (id) => {
      setCurrentId(id)
      setIsModalOpen(true);
    };
    
    const handleOk = () => {
      handleDelete(currentId)
      message.success("Utilisateur supprimé")
      setCurrentId(null)
      setIsModalOpen(false);
    };

    const handleCancel = () => {
      setCurrentId(null)
      setIsModalOpen(false);
    };

    const handleDelete = (id) => {
      deleteUser(id)
      setDatas((prevDatas) => prevDatas.filter(user => user.id !== id))
    }

    const columns = [
        {
            title: 'Nom',
            dataIndex: 'lastname',
            key: 'lastname',
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Prénom',
            dataIndex: 'firstname',
            key: 'firstname',
            render: (text) => <div>{text}</div>,
        },
        {
          title: 'Numéro',
          dataIndex: 'number',
          key: 'number',
          render: (text) => <div>{text}</div>,
        },
        {
            title: 'Adresse',
            dataIndex: 'address',
            key: 'address',
            render: (text) => <div>{text.value}</div>,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          render: (text) => <div>{text}</div>,
        },
        {
          title: 'Rôle',
          key: 'role',
          dataIndex: 'role',
          render: (role) => (
            <Tag color="geekblue" key={role}>
                {role.toUpperCase()}
            </Tag>
          ),
        },
        {
          key: 'show',
          dataIndex: 'show',
          render: (_, column) => (
            <Button type="primary" onClick={() => nav(`/showUser/${column.id}`)} >
              <EyeOutlined/>
            </Button>
          ),
        },
        {
          key: 'delete',
          dataIndex: 'delete',
          render: (_, column) => (
            <Button type="primary" danger onClick={() => showModal(column.id)} >
              <DeleteOutlined/>
            </Button>
          ),
        },
      ];

    return (
      <>
        <Button type="primary" style={styles.button} onClick={() => nav('/newUser')}>Ajouter</Button>
        <Table columns={columns} dataSource={datas} />
        <Modal okType="danger" okText="Valider" cancelText="Annuler" title="Supprimer définitivement l'utilisateur ?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}/>
      </>
    )
}

const styles = {
  button: {
    marginBottom: 20
  }
}