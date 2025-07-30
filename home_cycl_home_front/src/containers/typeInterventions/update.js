import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Form, Input, Button, Col, Row, message, Card } from 'antd';

import { getTypeInterventionById, updateTypeIntervention } from '../../actions/typesIntervention';

export default function EditTypeInterventions() {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {
    fetchTypeIntervention()
  }, [])

  const fetchTypeIntervention = async () => {
    setLoading(true)

    try {
      await getTypeInterventionById(id).then((res) => {
        res.duration = res.duration / 60
        form.setFieldValue(res)
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const onFinish = async (values) => {
    setLoading(true)

    const payload = values

    if (values.duration) {
      payload.duration = values.duration * 60
    }

    try {
      await updateTypeIntervention(payload);

      form.resetFields();
      message.success("Type d'nterventions créée avec succès !");
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
            <Form.Item label="Nom" name="name" style={styles.formItem}>
              <Input type='text' />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Prix" name="price" style={styles.formItem}>
              <Input type='number' />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Durée (en minutes)" name="duration" style={styles.formItem}>
              <Input type='number' />
            </Form.Item>
          </Col>
          <Form.Item style={styles.formItem}>
            <Button type="primary" htmlType="submit" style={styles.button} loading={loading}>
              Modifier le type d'intervention
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
