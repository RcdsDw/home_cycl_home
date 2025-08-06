import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form, Input, Button, Col, Row, message, Card } from 'antd';

import { createTypeIntervention } from '../../actions/typesIntervention';

export default function NewTypeInterventions() {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const nav = useNavigate();

  const onFinish = async (values) => {
    setLoading(true)

    const payload = { ...values }

    if (values.duration) {
      payload.duration = parseInt(values.duration * 60)
      payload.price = parseFloat(values.price)
    }

    try {
      await createTypeIntervention(payload);
      form.resetFields();
      message.success("Type d'nterventions créée avec succès !");
      nav(`/type_intervention`)
    } catch (err) {
      console.error("Erreur lors de la création du type d'intervention:", err);
      message.error("Erreur lors de la création du type d'intervention:");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => nav("/type_intervention")}>
        Retour à la liste
      </Button>
      <Card style={styles.card}>
        <h2 style={styles.title}>Nouveau type d'intervention</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Nom"
                name="name"

                rules={[{ required: true, message: 'Le nom est requis' }]}
              >
                <Input type='text' />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Prix"
                name="price"

                rules={[{ required: true, message: 'Le prix est requis' }]}
              >
                <Input type='number' />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Durée (en minutes)"
                name="duration"

                rules={[{ required: true, message: 'La durée est requise' }]}
              >
                <Input type='number' />
              </Form.Item>
            </Col>
            <Form.Item >
              <Button type="primary" htmlType="submit" loading={loading}>
                Valider
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Card>
    </>
  );
}

const styles = {
  card: {
    maxWidth: 800,
    margin: '0 auto',
    padding: '30px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#000000ff',
  },
};
