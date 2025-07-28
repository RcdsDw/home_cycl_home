import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Form, Input, Button, Col, Row, message, Card } from 'antd';
import { parseID } from '../../utils/ParseID';

import { getInterventionById, updateIntervention } from '../../actions/interventions';
import SelectTech from '../../utils/SelectTech';
import SelectBikes from '../../utils/SelectBikes';
import SelectTypeIntervention from '../../utils/SelectTypeIntervention';

export default function EditIntervention() {
  const [loading, setLoading] = useState(false);

  const [price, setPrice] = useState(0);
  const [intervention, setIntervention] = useState();
  const [selectedTechUser, setSelectedTechUser] = useState();
  const [selectedBike, setSelectedBike] = useState();
  const [selectedTypeIntervention, setSelectedTypeIntervention] = useState();


  const [form] = Form.useForm();
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    fetchIntervention();
  }, []);

  useEffect(() => {
    setFieldsValue();
  }, [intervention]);

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedTypeIntervention]);

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
  }

  const calculateTotalPrice = () => {
    setPrice(selectedTypeIntervention?.price);
  };

  const onFinish = async () => {
    setLoading(true)

    const interventionData = {
      start_date: intervention.start_date,
      end_date: intervention.end_date,
      comment: intervention.comment,
      clientBike: selectedBike['@id'],
      technician: selectedTechUser['@id'],
      typeIntervention: selectedTypeIntervention['@id'],
    };

    try {
      await updateIntervention(id, interventionData);
      message.success('Intervention mise à jour avec succès !');
      nav(`/interventions/show/${id}`);
    } catch (err) {
      message.error("Erreur lors de la mise à jour de l'intervention.");
    } finally {
      setLoading(false)
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
              <SelectBikes
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
            <Form.Item label="Prix total" style={styles.formItem}>
              <Input value={`${price} €`} disabled />
            </Form.Item>
          </Col>

          <Form.Item style={styles.formItem}>
            <Button type="primary" htmlType="submit" style={styles.button} loading={loading}>
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
