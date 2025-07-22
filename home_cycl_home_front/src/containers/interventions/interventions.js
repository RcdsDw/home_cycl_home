import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Empty, message, Modal, Spin, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { deleteIntervention, getInterventions } from "../../actions/interventions";
import dayjs from "dayjs";

export default function Interventions() {
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const nav = useNavigate();

  useEffect(() => {
    fetchInterventions();
  }, []);

  const fetchInterventions = async () => {
    try {
      const res = await getInterventions();
      setDatas(res.member);
    } catch (error) {
      console.error("Erreur lors de la récupération des interventions :", error);
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
    setDatas((prevDatas) => prevDatas.filter((intervention) => intervention.id !== id));
  };

  const columns = [
    {
      title: 'Début',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (text) => <div>{dayjs(text).format("DD/MM/YYYY HH:mm")}</div>,
    },
    {
      title: 'Fin',
      dataIndex: 'end_date',
      key: 'end_date',
      render: (text) => <div>{dayjs(text).format("DD/MM/YYYY HH:mm")}</div>,
    },
    {
      title: 'Prix',
      dataIndex: 'typeIntervention',
      key: 'price',
      render: (text) => <div>{text?.price} €</div>,
    },
    // {
    //   title: 'Vélo',
    //   dataIndex: 'bike',
    //   key: 'bike',
    //   render: (text) => (
    //     <Tag color={text === "ville" ? "green" : text === "electrique" ? "geekblue" : "orange"} key={text}>
    //       {text}
    //     </Tag>
    //   ),
    // },
    {
      title: 'Service',
      dataIndex: 'typeIntervention',
      key: 'service',
      render: (text) => (
        <Tag color={text?.name === "Réparation" ? "red" : "orange"} key={text}>
          {text?.name}
        </Tag>
      ),
    },
    {
      title: 'Technicien',
      dataIndex: 'technician',
      key: 'technician',
      render: (text) => <div>{`${text.firstname} ${text.lastname}` || "Non renseigné"}</div>,
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      render: (text) => <div>{`${text.firstname} ${text.lastname}` || "Non renseigné"}</div>,
    },
    // {
    //   title: 'Nombre de produits',
    //   dataIndex: 'productsCount',
    //   key: 'products_count',
    //   render: (text) => <div>{text} produit(s)</div>,
    // },
    {
      key: 'show',
      dataIndex: 'show',
      render: (_, column) => (
        <Button type="primary" onClick={() => nav(`/interventions/show/${column.id}`)}>
          <EyeOutlined />
        </Button>
      ),
    },
    {
      key: 'delete',
      dataIndex: 'delete',
      render: (_, column) => (
        <Button type="primary" danger onClick={() => showModal(column.id)}>
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
      <Button type="primary" style={styles.button} onClick={() => nav('/interventions')}>
        Ajouter
      </Button>
      <Table columns={columns} dataSource={datas} locale={{
        emptyText: <Empty description="Aucune intervention trouvée" />,
      }} />
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
    display: 'block',
    margin: '100px auto',
  },
  button: {
    marginBottom: 20,
  },
};
