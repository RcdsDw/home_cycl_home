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
    <Card style={styles.card}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Nom"
              name="name"
              style={styles.formItem}
              rules={[{ required: true, message: 'Le nom est requis' }]}
            >
              <Input type='text' />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Prix"
              name="price"
              style={styles.formItem}
              rules={[{ required: true, message: 'Le prix est requis' }]}
            >
              <Input type='number' />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Durée (en minutes)"
              name="duration"
              style={styles.formItem}
              rules={[{ required: true, message: 'La durée est requise' }]}
            >
              <Input type='number' />
            </Form.Item>
          </Col>
          <Form.Item style={styles.formItem}>
            <Button type="primary" htmlType="submit" style={styles.button} loading={loading}>
              Soumettre le type d'intervention
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
