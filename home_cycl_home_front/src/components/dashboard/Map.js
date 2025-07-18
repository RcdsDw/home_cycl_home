import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, FeatureGroup, Polygon, Popup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { createZone, deleteZone, getZones, updateZone } from '../../actions/zones';
import { message, Modal, Input } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import SelectTech from '../../utils/SelectTech';
import { getUserById } from '../../actions/user';
import L from 'leaflet';
import getRandomColor from '../../utils/RandomColor';

export default function Map() {
    const [zones, setZones] = useState([]);
    const [zoneName, setZoneName] = useState('');
    const [techUsers, setTechUsers] = useState({})
    const [currentCoordinates, setCurrentCoordinates] = useState([]);
    const [selectedTechUser, setSelectedTechUser] = useState();

    const [editingZone, setEditingZone] = useState(null);
    const [newZoneName, setNewZoneName] = useState('');
    const [newTechUser, setNewTechUser] = useState('');

    const mapRef = useRef();

    const storeIcon = new L.Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/14/14886.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    useEffect(() => {
        fetchZones();
    }, []);

    const fetchZones = async () => {
        try {
            const res = await getZones();
            setZones(res.data);

            const techData = {};
            for (let zone of res.data) {
                if (zone.userId) {
                    const tech = await getUserById(zone.userId);
                    techData[zone.userId] = `${tech.data.firstname} ${tech.data.lastname}`;
                }
            }
            setTechUsers(techData);
        } catch (error) {
            console.error("Erreur lors de la récupération des zones", error);
        }
    };

    const handleZoneCreated = (e) => {
        const { layer } = e;
        const { _latlngs } = layer;
        setCurrentCoordinates(_latlngs[0].map(latlng => ({
            lat: latlng.lat,
            lng: latlng.lng,
        })));
    };

    const handleAddZone = async () => {
        if (!zoneName.trim()) {
            message.error("Veuillez saisir un nom pour la zone.");
            return;
        }

        if (currentCoordinates.length === 0) {
            message.error("Veuillez dessiner une zone sur la carte.");
            return;
        }

        if (!selectedTechUser) {
            message.error("Veuillez sélectionner un technicien.");
            return;
        }

        const formattedCoordinates = currentCoordinates.map(coord => ({
            lat: parseFloat(coord.lat),
            lng: parseFloat(coord.lng),
        }));

        const zoneData = {
            name: `Zone ${zoneName}`,
            coordinates: formattedCoordinates,
            user_id: selectedTechUser,
        };

        try {
            await createZone(zoneData);

            fetchZones();
            setZoneName('');
            setSelectedTechUser('');
            setCurrentCoordinates([]);
            message.success('Zone ajoutée avec succès !');
        } catch (error) {
            console.error("Erreur lors de la création de la zone", error);
            message.error("Impossible d'ajouter la zone.");
        }
    };

    const handleEditZone = (zone) => {
        setEditingZone(zone.id);
        setNewZoneName(zone.name);
        setNewTechUser(zone.userId);
    };

    const handleCancelEdit = () => {
        setEditingZone(null);
    };

    const handleSaveZone = async () => {
        if (!newZoneName.trim()) {
            message.error("Veuillez saisir un nom pour la zone.");
            return;
        }

        if (!newTechUser) {
            message.error("Veuillez sélectionner un technicien.");
            return;
        }

        const updatedZone = {
            name: newZoneName,
            user_id: newTechUser,
        };

        try {
            await updateZone(editingZone, updatedZone);
            fetchZones();
            setEditingZone(null);
            message.success('Zone modifiée avec succès !');
        } catch (error) {
            console.error("Erreur lors de la modification de la zone", error);
            message.error("Impossible de modifier la zone.");
        }
    };

    const handleDeleteZone = async (zoneId) => {
        Modal.confirm({
            title: 'Êtes-vous sûr de vouloir supprimer cette zone?',
            onOk: async () => {
                try {
                    await deleteZone(zoneId);
                    setZones((prevZones) => prevZones.filter(zone => zone.id !== zoneId));
                    message.success('Zone supprimée avec succès !');
                } catch (error) {
                    console.error("Erreur lors de la suppression de la zone", error);
                    message.error("Impossible de supprimer la zone.");
                }
            },
        });
    };

    const renderZones = () => {
        return zones.map((zone, index) => {
            if (!Array.isArray(zone.coordinates) || zone.coordinates.length === 0) return null;

            const randomColor = getRandomColor();

            const positions = zone.coordinates.map(coord => [coord.lat, coord.lng])

            return (
                <Polygon
                    key={index}
                    positions={positions}
                    color={randomColor}
                >
                    <Popup>{zone.name}</Popup>
                </Polygon>
            );
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
                {/* Carte */}
                <MapContainer
                    style={styles.map}
                    center={[45.750, 4.850]}
                    zoom={12}
                    scrollWheelZoom={false}
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker title="Magasin" position={[45.750, 4.850]} icon={storeIcon} />

                    <FeatureGroup>
                        <EditControl
                            position="topright"
                            draw={{
                                rectangle: false,
                                circle: false,
                                circlemarker: false,
                                marker: false,
                            }}
                            onCreated={handleZoneCreated}
                        />
                    </FeatureGroup>

                    {zones && zones.length > 0 && renderZones()}
                </MapContainer>

                {/* Liste des zones */}
                <div style={styles.zoneList}>
                    <h3>Zones créées</h3>
                    <ul>
                        {zones && zones.map((zone) => (
                            <li key={zone.id} style={styles.zoneItem}>
                                {editingZone !== zone.id && (
                                    <>
                                        <div style={styles.flexColumn}>
                                            <span style={styles.zoneName}>
                                                {zone.name}
                                            </span>
                                            <small style={styles.description}>Pris en charge par : {techUsers[zone.userId] || 'Inconnu'}</small>
                                        </div>
                                        <EditOutlined
                                            style={styles.editIcon}
                                            onClick={() => handleEditZone(zone)}
                                        />
                                        <DeleteOutlined
                                            style={styles.deleteIcon}
                                            onClick={() => handleDeleteZone(zone.id)}
                                        />
                                    </>
                                )}
                                {editingZone === zone.id && (
                                    <div style={styles.editForm}>
                                        <div style={styles.flexColumn}>
                                            <Input
                                                value={newZoneName}
                                                onChange={(e) => setNewZoneName(e.target.value)}
                                                placeholder="Entrez un nouveau nom pour la zone"
                                                style={{ width: '100%', margin: "5px" }}
                                            />
                                            <SelectTech
                                                selectedTechUser={newTechUser}
                                                setSelectedTechUser={setNewTechUser}
                                            />
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <button onClick={handleSaveZone} style={{ ...styles.button, ...styles.editButton }}>Modifier</button>
                                            <button onClick={handleCancelEdit} style={{ ...styles.button, ...styles.cancelButton }}>Annuler</button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div style={styles.formContainer}>
                <h3>Ajouter une nouvelle zone</h3>
                <div style={styles.formField}>
                    <div style={styles.formLabelInput}>
                        <Input
                            value={zoneName}
                            onChange={(e) => setZoneName(e.target.value)}
                            placeholder="Entrez un nom pour la zone"
                            style={{ width: '100%' }}
                        />
                        <small style={styles.description}>Veuillez entrer un nom descriptif pour la zone.</small>
                    </div>
                    <div style={styles.formLabelInput}>
                        <SelectTech selectedTechUser={selectedTechUser} setSelectedTechUser={setSelectedTechUser} />
                        <small style={styles.description}>Choisissez un technicien à affecter à cette zone.</small>
                    </div>
                    <button style={{ ...styles.button, ...styles.addButton }} onClick={handleAddZone}>
                        Ajouter Zone
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    map: {
        width: "100%",
        height: "500px",
    },
    zoneList: {
        width: "30%",
        padding: "20px",
        backgroundColor: "#f4f4f4",
        borderTop: "1px solid #ddd",
        height: "500px",
        overflowY: "auto",
    },
    zoneItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 0',
        borderBottom: '1px solid #ddd',
    },
    flexColumn: {
        display: "flex",
        flexDirection: "column"
    },
    zoneName: {
        flex: 1,
    },
    editIcon: {
        width: "40px",
        cursor: 'pointer',
        color: 'orange',
    },
    deleteIcon: {
        width: "40px",
        cursor: 'pointer',
        color: 'red',
    },
    formContainer: {
        width: "100%",
        padding: "20px",
        backgroundColor: "#f4f4f4",
        borderTop: "1px solid #ddd",
        marginTop: "20px",
    },
    formField: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
    },
    formLabelInput: {
        display: "flex",
        flexDirection: "column",
        marginBottom: '15px',
    },
    button: {
        height: "40px",
        padding: "10px",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    addButton: {
        backgroundColor: "#4CAF50",
    },
    editButton: {
        margin: "5px",
        backgroundColor: "#4CAF50",
    },
    cancelButton: {
        margin: "5px",
        backgroundColor: '#f44336',
    },
    description: {
        fontSize: '12px',
        color: '#888',
        marginTop: '5px',
    },
};

