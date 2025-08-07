import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { Button, Empty, message, Modal, Spin, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { deleteBike, getBikes } from "../../actions/bikes";
import { parseID } from "../../utils/ParseID";

export default function TableBikes({ id }) {
  const [loading, setLoading] = useState(false);
  const [bikes, setBikes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const nav = useNavigate();

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    setLoading(true);
    try {
      const res = await getBikes();
      const filtered = res.member.filter((bike) => parseID(bike.owner) === id);
      setBikes(filtered);
    } catch (error) {
      console.error("Erreur lors de la récupération des vélos :", error);
    } finally {
      setLoading(false);
    }
  };

  const showModal = (id) => {
    setCurrentId(id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleDelete(currentId);
    message.success("Vélo supprimé");
    setCurrentId(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setCurrentId(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteBike(id);
    setBikes((prevDatas) => prevDatas.filter((bike) => parseID(bike) !== id));
  };

  const columns = [
    {
      title: "Nom",
      dataIndex: "name",
      key: "name",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Marque",
      dataIndex: "brand",
      key: "brand",
      render: (text) => <div>{text.name}</div>,
    },
    {
      title: "Modèle",
      dataIndex: "model",
      key: "model",
      render: (text) => <div>{text.name}</div>,
    },
    {
      title: "Taille",
      dataIndex: "size",
      key: "size",
      render: (text) => <Tag color="geekblue">{text}</Tag>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => <Tag color="green">{text}</Tag>,
    },
    {
      title: "Dernière modification",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text) => <div>{dayjs(text).format("DD/MM/YYYY HH:mm")}</div>,
    },
    {
      key: "show",
      dataIndex: "show",
      render: (_, column) => (
        <Button
          type="primary"
          onClick={() => nav(`/bikes/edit/${parseID(column)}`)}
        >
          <EditOutlined />
        </Button>
      ),
    },
    {
      key: "delete",
      dataIndex: "delete",
      render: (_, column) => (
        <Button
          type="primary"
          danger
          onClick={() => showModal(parseID(column))}
        >
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  if (loading) {
    return <Spin size="large" style={styles.spinner} />;
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={bikes}
        locale={{
          emptyText: <Empty description="Aucune vélo trouvé" />,
        }}
      />
      <Modal
        okType="danger"
        okText="Valider"
        cancelText="Annuler"
        title={`"Supprimer définitivement le vélo ?"`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </>
  );
}

const styles = {
  spinner: {
    display: "block",
    margin: "100px auto",
  },
  button: {
    marginBottom: 20,
  },
};
