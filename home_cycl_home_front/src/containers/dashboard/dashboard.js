import React, { useEffect, useState } from "react";
import { message, Modal } from "antd";

import Map from "../../components/dashboard/Map";
import ZoneList from "../../components/dashboard/ZoneList";
import AddZoneForm from "../../components/dashboard/AddZoneForm";

import { createZone, deleteZone, getZones } from "../../actions/zones";

export default function Dashboard() {
  const [zones, setZones] = useState([]);
  const [zoneName, setZoneName] = useState("");
  const [currentCoordinates, setCurrentCoordinates] = useState([]);
  const [selectedTechUser, setSelectedTechUser] = useState("");
  const [newZoneName, setNewZoneName] = useState("");
  const [newTechUser, setNewTechUser] = useState("");

  useEffect(() => {
    fetchZones();
  }, []);

  const fetchZones = async () => {
    try {
      const res = await getZones();
      setZones(res.member);
    } catch (error) {
      console.error("Erreur lors de la récupération des zones", error);
    }
  };

  const handleZoneCreated = (e) => {
    const { layer } = e;
    const { _latlngs } = layer;

    setCurrentCoordinates(
      _latlngs[0].map((latlng) => ({
        lat: latlng.lat,
        lng: latlng.lng,
      })),
    );
  };

  const handleAddZone = async () => {
    if (!zoneName.trim()) {
      return message.error("Veuillez saisir un nom pour la zone.");
    }

    if (currentCoordinates.length === 0) {
      return message.error("Veuillez dessiner une zone sur la carte.");
    }

    if (!selectedTechUser) {
      return message.error("Veuillez sélectionner un technicien.");
    }

    const coords = [...currentCoordinates];
    const first = coords[0];
    const last = coords[coords.length - 1];

    if (first.lat !== last.lat || first.lng !== last.lng) {
      coords.push(first);
    }

    const formattedCoords = coords.map((coord) => ({
      lat: parseFloat(coord.lat),
      lng: parseFloat(coord.lng),
    }));

    const zoneData = {
      name: zoneName,
      coordsArray: formattedCoords,
      technician: selectedTechUser["@id"],
    };

    try {
      await createZone(zoneData);
      fetchZones();
      setZoneName("");
      setSelectedTechUser("");
      setCurrentCoordinates([]);
      message.success("Zone ajoutée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la création de la zone", error);
      message.error("Impossible d'ajouter la zone.");
    }
  };

  const handleDeleteZone = async (zoneId) => {
    Modal.confirm({
      title: "Êtes-vous sûr de vouloir supprimer cette zone ?",
      onOk: async () => {
        try {
          await deleteZone(zoneId);
          await fetchZones();
          message.success("Zone supprimée avec succès !");
        } catch (error) {
          console.error("Erreur lors de la suppression de la zone", error);
          message.error("Impossible de supprimer la zone.");
        }
      },
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <Map zones={zones} onZoneCreated={handleZoneCreated} />

        <ZoneList
          zones={zones}
          newZoneName={newZoneName}
          newTechUser={newTechUser}
          onDelete={handleDeleteZone}
          setNewZoneName={setNewZoneName}
          setNewTechUser={setNewTechUser}
        />
      </div>

      <AddZoneForm
        zoneName={zoneName}
        selectedTechUser={selectedTechUser}
        setZoneName={setZoneName}
        setSelectedTechUser={setSelectedTechUser}
        onAddZone={handleAddZone}
      />
    </div>
  );
}
