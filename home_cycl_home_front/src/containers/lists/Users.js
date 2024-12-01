import { Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { getUsers } from "../../actions/user";

export default function Users() {
  const [datas, setDatas] = useState([])
  console.log("🚀 ~ Users ~ datas:", datas)

    useEffect(() => {
      fetchUsers()
    }, [])

    const fetchUsers = async() => {
      await getUsers().then((res) => setDatas(res.data))
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
        <Table columns={columns} dataSource={datas} />
    )
}