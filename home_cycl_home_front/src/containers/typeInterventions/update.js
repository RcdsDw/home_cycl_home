import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Form, Input, Button, Col, Row, message, Card } from "antd";

import {
  getTypeInterventionById,
  updateTypeIntervention,
} from "../../actions/typesIntervention";

export default function EditTypeInterventions() {
  const [loading, setLoading] = useState(false);
  const [typeIntervention, setTypeIntervention] = useState();

  const [form] = Form.useForm();
  const nav = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchTypeIntervention();
  }, []);

  useEffect(() => {
    setFieldsValue();
  }, [typeIntervention]);

  const fetchTypeIntervention = async () => {
    setLoading(true);

    try {
      await getTypeInterventionById(id).then((res) => {
        res.duration = res.duration / 60;
        setTypeIntervention(res);
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const setFieldsValue = () => {
    if (!typeIntervention) {
      return;
    }

    form.setFieldsValue({
      name: typeIntervention?.name,
      price: typeIntervention?.price,
      duration: typeIntervention?.duration,
    });
  };

  const onFinish = async (values) => {
    setLoading(true);

    const payload = values;

    if (values.duration) {
      payload.duration = values.duration * 60;
    }

    try {
      await updateTypeIntervention(payload);

      form.resetFields();
      message.success("Type d'nterventions modifié avec succès !");
    } catch (err) {
      console.error("Erreur lors de la création du type d'intervention:", err);
      message.error("Erreur lors de la création du type d'intervention:");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => nav("/users")}>
        Retour à la liste
      </Button>
      <Card style={styles.card}>
        <h2 style={styles.title}>Modifier le type d'intervention</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Nom" name="name">
                <Input type="text" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Prix (en €)" name="price">
                <Input type="number" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Durée (en minutes)" name="duration">
                <Input type="number" />
              </Form.Item>
            </Col>
            <Form.Item>
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
    margin: "0 auto",
    padding: "30px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#000000ff",
  },
};
