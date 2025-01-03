import React, { useState } from 'react';
import { Form, Input, Select, Button, Col, Row, DatePicker, message, Card } from 'antd';
import { createIntervention } from '../../actions/interventions';
import SelectTech from '../../utils/SelectTech';
import dayjs from 'dayjs';

const bikeOptions = [
  { label: 'Vélo de course', value: 'course', price: 50 },
  { label: 'Vélo électrique', value: 'electrique', price: 100 },
  { label: 'Vélo de ville', value: 'ville', price: 30 },
];

const serviceOptions = [
  { label: 'Réparation', value: 'reparation', price: 20 },
  { label: 'Maintenance', value: 'maintenance', price: 40 },
];

export default function NewIntervention() {
  const [form] = Form.useForm();
  const [price, setPrice] = useState(0);
  const [selectedTechUser, setSelectedTechUser] = useState();
  const [endDate, setEndDate] = useState(null);

  const handleChange = () => {
    const bike = form.getFieldValue('bike');
    const service = form.getFieldValue('service');
    
    const bikePrice = bikeOptions.find(option => option.value === bike)?.price || 0;
    const servicePrice = serviceOptions.find(option => option.value === service)?.price || 0;

    setPrice(bikePrice + servicePrice);

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
    try {
      const interventionData = {
          ...values,
          price,
          user_id: selectedTechUser,
          ended_at: endDate ? endDate.toISOString() : null,
        };
        console.log("🚀 ~ onFinish ~ interventionData:", interventionData)

      const response = await createIntervention(interventionData);

      if (response.success) {
        message.success('Intervention créée avec succès !');
        form.resetFields();
      } else {
        message.error('Erreur lors de la création de l\'intervention.');
      }

      console.log('Form submitted: ', interventionData);
    } catch (error) {
      message.error('Une erreur est survenue. Veuillez réessayer.');
      console.error('Error: ', error);
    }
  };

  const disabledDate = current => {
    return current && (current.day() === 0);
  };

  const disabledTime = () => {
    return {
      disabledHours: () => {
        let hours = [];
        for (let i = 0; i < 9; i++) hours.push(i);
        for (let i = 18; i < 24; i++) hours.push(i);
        return hours;
      },
      disabledMinutes: (hour) => {
        if (hour === 9) return [...Array(60).keys()].slice(0, 60);
        if (hour === 17) return [...Array(60).keys()].slice(0, 60);
        return [];
      }
    };
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
              <Select
                onChange={handleChange}
                options={bikeOptions.map(option => ({ label: option.label, value: option.value }))}
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
                onChange={handleChange}
                options={serviceOptions.map(option => ({ label: option.label, value: option.value }))}
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
            <Form.Item label="Prix total" style={styles.formItem}>
              <Input value={price} disabled />
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