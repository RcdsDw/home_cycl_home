import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Col, Row, DatePicker, message, Card } from 'antd';
import { createIntervention } from '../../actions/interventions';
import SelectTech from '../../utils/SelectTech';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import bikeOptions from '../../data/bikeOptions.json';
import serviceOptions from '../../data/serviceOptions.json';
import { getProducts } from '../../actions/products';

export default function NewIntervention() {
  const [form] = Form.useForm();
  const [price, setPrice] = useState(0);
  const [selectedTechUser, setSelectedTechUser] = useState();
  const [endDate, setEndDate] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));
  const nav = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedProducts]);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      message.error('Erreur lors de la récupération des produits.');
    }
  };

  const calculateTotalPrice = () => {
    const bike = form.getFieldValue('bike');
    const service = form.getFieldValue('service');

    const bikePrice = bikeOptions.find((option) => option.value === bike)?.price || 0;
    const servicePrice = serviceOptions.find((option) => option.value === service)?.price || 0;

    const selectedProductsData = selectedProducts.map((productId) =>
      products.find((product) => product.id === productId)
    );

    const productsPrice = selectedProductsData.reduce(
      (total, product) => total + (product?.price || 0),
      0
    );

    const totalPrice = bikePrice + servicePrice + productsPrice;
    setPrice(totalPrice.toFixed(2));
  };

  const handleProductChange = (selected) => {
    setSelectedProducts(selected);
  };

  const handleChange = () => {
    const service = form.getFieldValue('service');
    const startDate = form.getFieldValue('started_at');
    if (startDate) {
      const startDayjs = dayjs(startDate);
      let endDateCalculated;

      if (service === 'reparation') {
        endDateCalculated = startDayjs.add(1, 'hour').add(30, 'minute');
      } else if (service === 'maintenance') {
        endDateCalculated = startDayjs.add(1, 'hour');
      }

      setEndDate(endDateCalculated);
    }
  };

  const onFinish = async (values) => {
    const interventionData = {
      ...values,
      price,
      tech_id: selectedTechUser,
      client_id: user.id,
      ended_at: endDate ? endDate.toISOString() : null,
      products: selectedProducts.map((productId) => ({
        id: productId,
        quantity: 1,
      })),
    };

    try {
      const res = await createIntervention(interventionData);
      form.resetFields();
      setSelectedProducts([]);
      message.success('Intervention créée avec succès !');
      nav(`/interventions/show/${res.data.id}`);
    } catch (err) {
      message.error('Erreur lors de la création de l\'intervention.');
    }
  };

  const disabledDate = (current) => current && current.day() === 0;

  const disabledTime = () => ({
    disabledHours: () => {
      let hours = [];
      for (let i = 0; i < 9; i++) hours.push(i);
      for (let i = 18; i < 24; i++) hours.push(i);
      return hours;
    },
  });

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
              <Select
                onChange={calculateTotalPrice}
                options={bikeOptions.map((option) => ({
                  label: option.label,
                  value: option.value,
                }))}
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
              <Select
                onChange={calculateTotalPrice}
                options={serviceOptions.map((option) => ({
                  label: option.label,
                  value: option.value,
                }))}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
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
          </Col>

          <Col span={24}>
            <Form.Item label="Date de fin" style={styles.formItem}>
              <Input value={endDate ? endDate.format('YYYY-MM-DD HH:mm') : ''} disabled />
            </Form.Item>
          </Col>

          <Col span={24}>
            <label style={styles.formItem}>Technicien</label>
            <div style={{ marginLeft: -5 }}>
              <SelectTech
                selectedTechUser={selectedTechUser}
                setSelectedTechUser={setSelectedTechUser}
              />
            </div>
          </Col>

          <Col span={24}>
            <Form.Item label="Produits" style={styles.formItem}>
              <Select
                mode="multiple"
                placeholder="Sélectionnez des produits"
                onChange={handleProductChange}
                options={products && products.map((product) => ({
                  label: `${product.name} (${product.price.toFixed(2)} €)`,
                  value: product.id,
                }))}
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
              Soumettre l'intervention
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
