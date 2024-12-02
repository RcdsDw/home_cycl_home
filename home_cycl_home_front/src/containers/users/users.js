import { useNavigate } from "react-router-dom";

import { DeleteOutlined } from '@ant-design/icons';

import { Button, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../actions/user";

export default function Users() {
  const [datas, setDatas] = useState([])
  const nav = useNavigate()

    useEffect(() => {
      fetchUsers()
    }, [])

    const fetchUsers = async() => {
      await getUsers().then((res) => setDatas(res.data))
    }

    const handleDelete = () => {
      deleteUser()
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
          key: 'delete',
          dataIndex: 'delete',
          render: () => (
            <Button type="danger" onClick={() => handleDelete} >
              <DeleteOutlined/>
            </Button>
          ),
        },
        // {
        //   title: 'Action',
        //   key: 'action',
        //   render: (_, record) => (
        //     <Space size="middle">
        //       <a>Invite {record.name}</a>
        //       <a>Delete</a>
        //     </Space>
        //   ),
        // },
      ];

    return (
      <>
        <Button style={styles.button} type="primary" onClick={() => nav('/newUser')}>Ajouter</Button>
        <Table columns={columns} dataSource={datas} />
      </>
    )
}

const styles = {
  button: {
    marginBottom: 20
  }
}