import { useEffect, useState } from "react";
import { Button, Card, Empty, message, Modal, Table, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteBrand, getBrands } from "../../actions/brands";
import { parseID } from "../../utils/ParseID";
import { deleteModel } from "../../actions/models";
import CreateBrandModal from "../../components/brands/new";
import CreateModelModal from "../../components/models/new";

const { Title } = Typography;

export default function BrandsModels() {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState();
  const [selectedBrand, setSelectedBrand] = useState();
  const [models, setModels] = useState();
  const [currentId, setCurrentId] = useState(null);
  const [isModalBrandOpen, setIsModalBrandOpen] = useState(false);
  const [isModalModelOpen, setIsModalModelOpen] = useState(false);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    setLoading(true);

    try {
      const res = await getBrands();
      setBrands(res.member);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const getModels = (name) => {
    const currentBrand = brands.find((brand) => brand.name === name);
    setSelectedBrand(currentBrand);
    setModels(currentBrand?.models);
  };

  const handleDeleteBrand = async (id) => {
    try {
      await deleteBrand(id);
      fetchBrands();
    } catch (err) {
      message.error("Erreur lors de la suppression");
    }
  };

  const handleDeleteModel = async (id) => {
    try {
      await deleteModel(id);
      fetchBrands();
    } catch (err) {
      message.error("Erreur lors de la suppression");
    }
  };

  const showModal = (value, id) => {
    setCurrentId(id);

    switch (value) {
      case "brand":
        setIsModalBrandOpen(true);
        break;
      case "model":
        setIsModalModelOpen(true);
        break;
      default:
        break;
    }
  };

  const handleOkBrand = () => {
    handleDelete("brand", currentId);
    message.success("Marque supprimée");
    setCurrentId(null);
    setIsModalBrandOpen(false);
  };

  const handleOkModel = () => {
    handleDelete("model", currentId);
    message.success("Modèle supprimé");
    setCurrentId(null);
    setIsModalModelOpen(false);
  };

  const handleCancelBrand = () => {
    setCurrentId(null);
    setIsModalBrandOpen(false);
  };

  const handleCancelModel = () => {
    setCurrentId(null);
    setIsModalModelOpen(false);
  };

  const handleDelete = (value, id) => {
    switch (value) {
      case "brand":
        handleDeleteBrand(id);
        break;
      case "model":
        handleDeleteModel(id);
        break;
      default:
        break;
    }
  };

  const columnsBrands = [
    {
      dataIndex: "name",
      key: "name",
      render: (text, _) => (
        <div onClick={() => getModels(text)} style={{ cursor: "pointer" }}>
          {text}
        </div>
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
          onClick={() => showModal("brand", parseID(column))}
        >
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  const columnsModels = [
    {
      dataIndex: "name",
      key: "name",
      render: (text) => <div>{text}</div>,
    },
    {
      key: "delete",
      dataIndex: "delete",
      align: "right",
      render: (_, column) => (
        <Button
          type="primary"
          danger
          onClick={() => showModal("model", parseID(column))}
        >
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <div style={styles.title}>
          <Title level={4}>Marques</Title>
          <CreateBrandModal fetchBrands={fetchBrands} />
        </div>
        <Table
          columns={columnsBrands}
          dataSource={brands}
          rowKey={(record) => parseID(record)}
          loading={loading}
          locale={{ emptyText: <Empty description="Aucune marque trouvée" /> }}
        />
      </Card>
      <Card style={styles.card}>
        <div style={styles.title}>
          <Title level={4}>Modèles</Title>
          <CreateModelModal
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            fetchBrands={fetchBrands}
          />
        </div>
        <Table
          columns={columnsModels}
          dataSource={models}
          rowKey={(record) => parseID(record)}
          loading={loading}
          locale={{ emptyText: <Empty description="Aucun modèle trouvé" /> }}
        />
      </Card>
      <Modal
        okType="danger"
        okText="Valider"
        cancelText="Annuler"
        title="Supprimer définitivement la marque ?"
        open={isModalBrandOpen}
        onOk={handleOkBrand}
        onCancel={handleCancelBrand}
      />
      <Modal
        okType="danger"
        okText="Valider"
        cancelText="Annuler"
        title="Supprimer définitivement le modèle ?"
        open={isModalModelOpen}
        onOk={handleOkModel}
        onCancel={handleCancelModel}
      />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    margin: 30,
  },
  card: {
    width: "48%",
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    marginBottom: 5,
  },
};
