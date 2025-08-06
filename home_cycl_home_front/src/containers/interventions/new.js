import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { Form, Input, Button, Col, Row, message, Card } from "antd";
import { parseID } from "../../utils/ParseID";

import { getCurrentUser } from "../../utils/GetCurrentInfo";
import {
  createIntervention,
  getDisponibilites,
} from "../../actions/interventions";
import SelectTech from "../../utils/SelectTech";
import SelectBikes from "../../utils/SelectBikes";
import SelectTypeIntervention from "../../utils/SelectTypeIntervention";
import { getZoneById } from "../../actions/zones";
import SelectDate from "../../utils/SelectDate";

export default function NewIntervention() {
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [price, setPrice] = useState(0);
  const [selectedTechUser, setSelectedTechUser] = useState();
  const [selectedBike, setSelectedBike] = useState();
  const [selectedTypeIntervention, setSelectedTypeIntervention] = useState();
  const [selectedClient, setSelectedClient] = useState();

  const hasInitialized = useRef(false);

  const [form] = Form.useForm();
  const nav = useNavigate();

  useEffect(() => {
    if (hasInitialized.current) return;

    hasInitialized.current = true;
    getClientTechnician();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedTypeIntervention]);

  const calculateTotalPrice = () => {
    setPrice(selectedTypeIntervention?.price);
  };

  const onFinish = async (values) => {
    setLoading(true);

    const disponibilitiesData = {
      start_date: values.start_date || dayjs(),
      end_date: values.end_date || dayjs(),
      tech_id: parseID(selectedTechUser),
    };

    try {
      const res = await getDisponibilites(disponibilitiesData);

      if (!res.available) {
        message.warning(res.message || "Créneau indisponible");
        setLoading(false);
        return;
      }
    } catch (err) {
      console.error(err);
      return;
    }

    const interventionData = {
      start_date: values.start_date || dayjs(),
      end_date: values.end_date || dayjs(),
      comment: values.comment || "",
      clientBike: selectedBike["@id"],
      technician: selectedTechUser["@id"],
      typeIntervention: selectedTypeIntervention["@id"],
    };

    try {
      const res = await createIntervention(interventionData);

      form.resetFields();
      message.success("Intervention créée avec succès !");

      nav(`/interventions/show/${parseID(res)}`);
    } catch (err) {
      console.error("Erreur lors de la création de l'intervention:", err);
      message.error("Erreur lors de la création de l'intervention.");
    } finally {
      setLoading(false);
    }
  };

  const getClientTechnician = async () => {
    setLoading(true);

    try {
      const user = getCurrentUser();

      if (!user) {
        message.error("Utilisateur non connecté");
        return;
      }

      setSelectedClient(user);

      if (user.clientZone && user.clientZone["@id"]) {
        const zoneData = await getZoneById(parseID(user.clientZone));

        if (zoneData && zoneData.technician) {
          setSelectedTechUser(zoneData.technician);
          setIsDisabled(true);
          message.success(
            `Technicien ${zoneData.technician.firstname} ${zoneData.technician.lastname} automatiquement sélectionné pour votre zone`,
          );
        } else {
          message.warning("Aucun technicien assigné à votre zone");
        }
      } else {
        message.info("Vous n'êtes assigné à aucune zone");
      }
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
      message.error("Erreur lors du chargement des informations");
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
        <h2 style={styles.title}>Nouvel utilisateur</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row gutter={16}>
            {selectedClient && (
              <Col span={24}>
                <Form.Item label="Vélo" name="bike" required>
                  <SelectBikes
                    selectedBike={selectedBike}
                    setSelectedBike={setSelectedBike}
                    clientId={selectedClient.id}
                  />
                </Form.Item>
              </Col>
            )}

            <Col span={24}>
              <Form.Item label="Service" name="service" required>
                <SelectTypeIntervention
                  selectedTypeIntervention={selectedTypeIntervention}
                  setSelectedTypeIntervention={setSelectedTypeIntervention}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Créneau disponible" name="creneau" required>
                <SelectDate
                  form={form}
                  selectedTypeIntervention={selectedTypeIntervention}
                />
              </Form.Item>

              <Form.Item name="start_date" hidden>
                <Input />
              </Form.Item>

              <Form.Item name="end_date" hidden>
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Technicien" name="technician" required>
                <SelectTech
                  isDisabled={isDisabled}
                  selectedTechUser={selectedTechUser}
                  required
                  setSelectedTechUser={setSelectedTechUser}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Commentaires" name="comments">
                <Input type="text" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Prix total">
                <Input
                  value={price ? `${price} €` : "Non disponible"}
                  disabled
                />
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
