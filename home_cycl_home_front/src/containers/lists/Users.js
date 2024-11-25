import { Space, Table, Tag } from "antd";

export default function Users() {
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
            title: 'Adresse',
            dataIndex: 'address',
            key: 'address',
            render: (text) => <div>{text}</div>,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          render: (text) => <div>{text}</div>,
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          render: (tag) => (
            <Tag color="geekblue" key={tag}>
                {tag.toUpperCase()}
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

      const data = [
        {
          key: '1',
          firstname: 'John',
          lastname: 'Brown',
          email: 32,
          address: 'New York No. 1 Lake Park',
          tags: 'developer',
        },
        {
          key: '2',
          firstname: 'Jim',
          lastname: 'Green',
          email: 42,
          address: 'London No. 1 Lake Park',
          tags: 'loser',
        },
        {
          key: '3',
          firstname: 'Joe',
          lastname: 'Black',
          email: 32,
          address: 'Sydney No. 1 Lake Park',
          tags: 'cool',
        },
    ]

    return (
        <Table columns={columns} dataSource={data} />
    )
}