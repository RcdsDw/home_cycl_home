import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Form, Input, Button, Col, Row, message, Card, Select } from 'antd';

import { createBike } from '../../actions/bikes';
import { getUserById } from '../../actions/user';
import SelectUser from '../../utils/SelectUser';
import SelectBrandModel from '../../utils/SelectBrandModel';

const { Option } = Select;

export default function NewBike() {
  const [loading, setLoading] = useState(false);

  const [selectedOwner, setSelectedOwner] = useState();
  const [selectedBrand, setSelectedBrand] = useState();
  const [selectedModel, setSelectedModel] = useState();

  const [form] = Form.useForm();
  const nav = useNavigate();
  const { ownerId } = useParams();

  useEffect(() => {
    if (ownerId) {
      fetchUserById(ownerId);
    }
  }, [ownerId]);

  const fetchUserById = async (id) => {
    try {
      const user = await getUserById(id);
      setSelectedOwner(user);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    }
  };

  const bikeTypes = ['VTT', 'Route', 'Urbain', 'Électrique', 'BMX', 'Gravel', 'Cyclocross', 'Fixie', 'Pliant'];
  const bikeSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const onFinish = async (values) => {
    setLoading(true);

    if (!selectedOwner) {
      message.error('Veuillez sélectionner un propriétaire');
      setLoading(false);
      return;
    }

    if (!selectedBrand) {
      message.error('Veuillez sélectionner une marque');
      setLoading(false);
      return;
    }

    if (!selectedModel) {
      message.error('Veuillez sélectionner un modèle');
      setLoading(false);
      return;
    }

    const bikeData = {
      name: values.name,
      size: values.size,
      type: values.type,
      owner: selectedOwner['@id'],
      brand: selectedBrand['@id'],
      model: selectedModel['@id'],
    };

    try {
      await createBike(bikeData);

      form.resetFields();
      setSelectedOwner(null);
      setSelectedBrand(null);
      setSelectedModel(null);

      message.success('Vélo créé avec succès !');
      if (ownerId) {
        nav(`/users/show/${ownerId}`);
      }
      nav(`/users`);
    } catch (err) {
      console.error('Erreur lors de la création du vélo:', err);
      message.error('Erreur lors de la création du vélo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={styles.card}>
      <h2 style={styles.title}>Nouveau Vélo</h2>

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Nom du vélo"
              name="name"
              style={styles.formItem}
              rules={[
                { required: true, message: 'Le nom du vélo est requis' },
                { max: 120, message: 'Le nom ne peut pas dépasser 120 caractères' }
              ]}
            >
              <Input
                placeholder="Ex: Mon vélo de route"
                maxLength={120}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Type de vélo"
              name="type"
              style={styles.formItem}
              rules={[
                { required: true, message: 'Le type de vélo est requis' }
              ]}
            >
              <Select placeholder="Sélectionner un type">
                {bikeTypes.map(type => (
                  <Option key={type} value={type}>{type}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Taille"
              name="size"
              style={styles.formItem}
              rules={[
                { required: true, message: 'La taille est requise' }
              ]}
            >
              <Select placeholder="Sélectionner une taille">
                {bikeSizes.map(size => (
                  <Option key={size} value={size}>{size}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Propriétaire"
              style={styles.formItem}
              required
            >
              <SelectUser
                onShowUser={true}
                selectedUser={selectedOwner}
                setSelectedUser={setSelectedOwner}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Marque"
              style={styles.formItem}
              required
            >
              <SelectBrandModel
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item style={styles.submitContainer}>
              <Button
                type="primary"
                htmlType="submit"
                style={styles.button}
                loading={loading}
              >
                Créer le vélo
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
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
  formItem: {
    marginBottom: 20,
  },
  submitContainer: {
    marginTop: 30,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: '45px',
    fontSize: '16px',
  },
};