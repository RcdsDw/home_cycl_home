import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Empty, message, Modal, Spin, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import {
  deleteTypeIntervention,
  getTypeInterventions,
} from "../../actions/typesIntervention";
import { DurationDisplay } from "../../utils/ParseDuration";
import { parseID } from "../../utils/ParseID";

export default function TypeInterventions() {
  const [loading, setLoading] = useState(true);
  const [typeInterventions, setTypeInterventions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const nav = useNavigate();

  useEffect(() => {
    fetchTypeInterventions();
  }, [typeInterventions]);

  const fetchTypeInterventions = async () => {
    try {
      const res = await getTypeInterventions();
      setTypeInterventions(res.member);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des types d'interventions :",
        error,
      );
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
    message.success("Type d'intervention supprimé");
    setCurrentId(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setCurrentId(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteTypeIntervention(id);
    setTypeInterventions((prevDatas) =>
      prevDatas.filter((typeIntervention) => parseID(typeIntervention) !== id),
    );
  };

  const columns = [
    {
      title: "Nom",
      dataIndex: "name",
      key: "name",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Prix",
      dataIndex: "price",
      key: "price",
      render: (text) => (
        <Tag color={"geekblue"} key={text}>
          {text} €
        </Tag>
      ),
    },
    {
      title: "Durée",
      dataIndex: "duration",
      key: "duration",
      render: (text) => <DurationDisplay seconds={text} />,
    },
    {
      key: "edit",
      dataIndex: "edit",
      align: "right",
      render: (_, column) => (
        <Button
          type="primary"
          onClick={() => nav(`/type_intervention/edit/${parseID(column)}`)}
        >
          <EditOutlined />
        </Button>
      ),
    },
    {
      key: "delete",
      dataIndex: "delete",
      align: "right",
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
      <Button
        type="primary"
        style={styles.button}
        onClick={() => nav("/type_intervention/new")}
      >
        Ajouter
      </Button>
      <Table
        columns={columns}
        dataSource={typeInterventions}
        locale={{
          emptyText: <Empty description="Aucun type d'intervention trouvé" />,
        }}
      />
      <Modal
        okType="danger"
        okText="Valider"
        cancelText="Annuler"
        title="Supprimer définitivement le type d'intervention ?"
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
