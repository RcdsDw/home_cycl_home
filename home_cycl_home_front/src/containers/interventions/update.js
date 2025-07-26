import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Form, Input, Button, Col, Row, message, Card } from 'antd';
import SelectTech from '../../utils/SelectTech';
import { parseID } from '../../utils/ParseID';

import { getInterventionById, updateIntervention } from '../../actions/interventions';
import { getProducts } from '../../actions/products';
import SelectMyBikes from '../../utils/SelectMyBikes';
import SelectTypeIntervention from '../../utils/SelectTypeIntervention';
import SelectProducts from '../../utils/SelectProducts';

export default function EditIntervention() {
  const [loading, setLoading] = useState(false);

  const [price, setPrice] = useState(0);
  const [intervention, setIntervention] = useState();
  console.log("🚀 ~ EditIntervention ~ intervention:", intervention)
  const [selectedTechUser, setSelectedTechUser] = useState();
  const [selectedBike, setSelectedBike] = useState();
  const [selectedTypeIntervention, setSelectedTypeIntervention] = useState();
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [products, setProducts] = useState([]);
  const [endDate, setEndDate] = useState(null);

  const [form] = Form.useForm();
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    fetchIntervention();
    fetchProducts();
  }, []);

  useEffect(() => {
    setFieldsValue();
  }, [intervention]);

  // useEffect(() => {
  //   calculateTotalPrice();
  // }, [selectedProducts]);

  const fetchProducts = async () => {
    setLoading(true)

    try {
      const res = await getProducts();
      setProducts(res.member);
    } catch (err) {
      message.error('Erreur lors de la récupération des produits.');
    } finally {
      setLoading(false)
    }
  };

  const fetchIntervention = async () => {
    setLoading(true)

    try {
      const res = await getInterventionById(id)
      setIntervention(res)
    } catch (err) {
      message.error('Erreur lors de la récupération de l\'intervention.');
    } finally {
      setLoading(false)
    }
  };

  const setFieldsValue = () => {
    if (!intervention) {
      return
    }

    form.setFieldsValue({
      bike: intervention?.clientBike?.type || '',
      service: intervention?.typeIntervention?.name || '',
    });

    if (intervention.technician) {
      setSelectedTechUser(intervention.technician);
    }

    if (intervention.typeIntervention) {
      setSelectedTypeIntervention(intervention.typeIntervention);
    }

    if (intervention.clientBike) {
      setSelectedBike(intervention.clientBike);
    }

    if (intervention.interventionProducts && Array.isArray(intervention.interventionProducts)) {
      setSelectedProducts(intervention.interventionProducts.map((product) => product.product).filter(Boolean));
    }

    // // Gérer le prix de manière sécurisée
    // if (intervention.price !== undefined && intervention.price !== null) {
    //   setPrice(intervention.price.toFixed(2));
    // }
  }

  const calculateTotalPrice = () => {
    const selectedProductsData = selectedProducts.map((productId) =>
      products.find((product) => product.id === productId)
    );

    const productsPrice = selectedProductsData.reduce(
      (total, product) => total + (product?.price || 0),
      0
    );

    const totalPrice = productsPrice;
    setPrice(totalPrice.toFixed(2));
  };

  const onFinish = async (values) => {
    const interventionData = {
      ...values,
      price,
      tech_id: parseID(selectedTechUser),
      ended_at: endDate ? endDate.toISOString() : null,
      products: selectedProducts.map(({ id, quantity }) => ({
        id,
        quantity,
      })),
    };

    try {
      await updateIntervention(id, interventionData);
      message.success('Intervention mise à jour avec succès !');
      nav(`/interventions/show/${id}`);
    } catch (err) {
      message.error("Erreur lors de la mise à jour de l'intervention.");
    }
  };

  return (
    <Card style={styles.card}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Type de vélo"
              name="bike"
              rules={[{ required: true, message: 'Veuillez choisir un type de vélo' }]}
              style={styles.formItem}
            >
              <SelectMyBikes
                selectedBike={selectedBike}
                setSelectedBike={setSelectedBike}
                clientId={intervention && parseID(intervention?.clientBike?.owner)}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Service"
              name="service"
              rules={[{ required: true, message: 'Veuillez choisir un type de service' }]}
              style={styles.formItem}
            >
              <SelectTypeIntervention
                loading={loading}
                selectedTypeIntervention={selectedTypeIntervention}
                setSelectedTypeIntervention={setSelectedTypeIntervention}
              />
            </Form.Item>
          </Col>

          {/* <Col span={24}>
            <Form.Item
              label="Date de début"
              name="started_at"
              rules={[{ required: true, message: 'Veuillez choisir une date de début' }]}
              style={styles.formItem}
            >
              <DatePicker
                showTime
                onChange={handleChange}
                format="YYYY-MM-DD HH:mm"
                disabledDate={disabledDate}
                disabledTime={disabledTime}
              />
            </Form.Item>
          </Col> */}

          {/* <Col span={24}>
            <Form.Item label="Date de fin" style={styles.formItem}>
              <Input value={endDate ? endDate.format('YYYY-MM-DD HH:mm') : ''} disabled />
            </Form.Item>
          </Col> */}

          <Col span={24}>
            <label style={styles.formItem}>Technicien</label>
            <div style={{ marginLeft: -5 }}>
              <SelectTech
                loading={loading}
                selectedTechUser={selectedTechUser}
                setSelectedTechUser={setSelectedTechUser}
              />
            </div>
          </Col>

          <Col span={24}>
            <Form.Item label="Produits" style={styles.formItem}>
              <SelectProducts
                loading={loading}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Prix total" style={styles.formItem}>
              <Input value={`${price} €`} disabled />
            </Form.Item>
          </Col>

          <Form.Item style={styles.formItem}>
            <Button type="primary" htmlType="submit" style={styles.button}>
              Mettre à jour l'intervention
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Card>
  );
}

const styles = {
  card: {
    maxWidth: 800,
    margin: '0 auto',
    padding: '20px',
  },
  formItem: {
    marginBottom: 20,
  },
  button: {
    width: '100%',
  },
};
