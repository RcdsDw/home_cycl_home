import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form, Input, Button, Col, Row, message, Card } from 'antd';
import { parseID } from '../../utils/ParseID';

import { createIntervention } from '../../actions/interventions';
import SelectTech from '../../utils/SelectTech';
import SelectBikes from '../../utils/SelectBikes';
import SelectTypeIntervention from '../../utils/SelectTypeIntervention';
import dayjs from 'dayjs';

export default function NewIntervention() {
  const [loading, setLoading] = useState(false);

  const [price, setPrice] = useState(0);
  const [selectedTechUser, setSelectedTechUser] = useState();
  const [selectedBike, setSelectedBike] = useState();
  const [selectedTypeIntervention, setSelectedTypeIntervention] = useState();

  const [form] = Form.useForm();
  const nav = useNavigate();

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedTypeIntervention]);

  const calculateTotalPrice = () => {
    setPrice(selectedTypeIntervention?.price);
  };

  const onFinish = async (values) => {
    setLoading(true)

    const interventionData = {
      start_date: values.start_date || dayjs(),
      end_date: values.end_date || dayjs(),
      comment: values.comment || "",
      clientBike: selectedBike['@id'],
      technician: selectedTechUser['@id'],
      typeIntervention: selectedTypeIntervention['@id'],
    };

    try {
      const res = await createIntervention(interventionData);

      form.resetFields();
      message.success('Intervention créée avec succès !');

      nav(`/interventions/show/${parseID(res)}`);
    } catch (err) {
      console.error('Erreur lors de la création de l\'intervention:', err);
      message.error('Erreur lors de la création de l\'intervention.');
    } finally {
      setLoading(false);
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
              style={styles.formItem}
            >
              <SelectBikes
                selectedBike={selectedBike}
                setSelectedBike={setSelectedBike}
                clientId={JSON.parse(localStorage.getItem('user')).id}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Service"
              name="service"
              style={styles.formItem}
            >
              <SelectTypeIntervention
                selectedTypeIntervention={selectedTypeIntervention}
                setSelectedTypeIntervention={setSelectedTypeIntervention}
              />
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
            <Form.Item label="Commentaires" name="comments" style={styles.formItem}>
              <Input type='text' />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Prix total" style={styles.formItem}>
              <Input value={`${price} €`} disabled />
            </Form.Item>
          </Col>

          <Form.Item style={styles.formItem}>
            <Button type="primary" htmlType="submit" style={styles.button} loading={loading}>
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
