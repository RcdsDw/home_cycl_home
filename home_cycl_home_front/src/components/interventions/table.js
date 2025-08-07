import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Empty, message, Modal, Spin, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import {
  deleteIntervention,
  getInterventions,
} from "../../actions/interventions";
import dayjs from "dayjs";
import BikeCard from "../../utils/BikeCard";
import UserCard from "../../utils/UserCard";
import { parseID } from "../../utils/ParseID";
import { DurationDisplay } from "../../utils/ParseDuration";

export default function TableInterventions() {
  const [loading, setLoading] = useState(false);
  const [interventions, setInterventions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const nav = useNavigate();

  useEffect(() => {
    fetchInterventions();
  }, []);

  const fetchInterventions = async () => {
    setLoading(true);
    try {
      const res = await getInterventions();
      setInterventions(res.member);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des interventions :",
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
    message.success("Intervention supprimée");
    setCurrentId(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setCurrentId(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteIntervention(id);
    setInterventions((prevDatas) =>
      prevDatas.filter((intervention) => parseID(intervention) !== id),
    );
  };

  const columns = [
    {
      title: "Début",
      dataIndex: "start_date",
      key: "start_date",
      render: (text) => <div>{dayjs(text).format("DD/MM/YYYY HH:mm")}</div>,
    },
    {
      title: "Fin",
      dataIndex: "end_date",
      key: "end_date",
      render: (text) => <div>{dayjs(text).format("DD/MM/YYYY HH:mm")}</div>,
    },
    {
      title: "Vélo",
      dataIndex: "clientBike",
      key: "clientBike",
      render: (text) => <BikeCard bike={text} />,
    },
    {
      title: "Service",
      dataIndex: "typeIntervention",
      key: "service",
      render: (text) => (
        <Tag color={text?.name === "Réparation" ? "red" : "orange"} key={text}>
          {text?.name}
        </Tag>
      ),
    },
    {
      title: "Durée",
      dataIndex: "typeIntervention",
      key: "duration",
      render: (text) => <DurationDisplay seconds={text.duration} />,
    },
    {
      title: "Prix",
      dataIndex: "typeIntervention",
      key: "price",
      render: (text) => <div>{text?.price} €</div>,
    },
    {
      title: "Technicien",
      dataIndex: "technician",
      key: "technician",
      render: (text) => <UserCard user={text} />,
    },
    {
      title: "Client",
      dataIndex: "clientBike",
      key: "owner",
      render: (text) => <UserCard user={text.owner} />,
    },
    {
      key: "show",
      dataIndex: "show",
      align: "right",
      render: (_, column) => (
        <Button
          type="primary"
          onClick={() => nav(`/interventions/show/${parseID(column)}`)}
        >
          <EyeOutlined />
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
      <Table
        columns={columns}
        dataSource={interventions}
        locale={{
          emptyText: <Empty description="Aucune intervention trouvée" />,
        }}
      />
      <Modal
        okType="danger"
        okText="Valider"
        cancelText="Annuler"
        title="Supprimer définitivement l'intervention ?"
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
