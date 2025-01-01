import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, FeatureGroup, Polygon, Popup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { createZone, deleteZone, getZones } from '../../actions/zones';
import { message, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import SelectTech from '../../utils/SelectTech';

export default function Map() {
    const [zones, setZones] = useState([]);
    const [zoneName, setZoneName] = useState('');
    const [currentCoordinates, setCurrentCoordinates] = useState([]);
    const [selectedTechUser, setSelectedTechUser] = useState('');
    const mapRef = useRef();

    useEffect(() => {
        fetchZones();
    }, []);

    const fetchZones = async () => {
        try {
            const res = await getZones();
            setZones(res.data);
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
            techUserId: selectedTechUser,
        };
        console.log('Données envoyées à la base de données :', zoneData);

        try {
            const newZone = await createZone(zoneData);

            setZones((prevZones) => [...prevZones, newZone.data]);
            setZoneName('');
            setSelectedTechUser('');
            setCurrentCoordinates([]);
            message.success('Zone ajoutée avec succès !');
        } catch (error) {
            console.error("Erreur lors de la création de la zone", error);
            message.error("Impossible d'ajouter la zone.");
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

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        
        for (let i = 0; i < 6; i++) {
            const randomValue = Math.floor(Math.random() * 128);
            color += letters[randomValue % 16];
        }
    
        return color;
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
                    <Marker title="Magasin" position={[45.750, 4.850]} />

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
                        {zones.map((zone) => (
                            <li key={zone.id} style={styles.zoneItem}>
                                <span style={styles.zoneName}>{zone.name}</span>
                                <DeleteOutlined 
                                    style={styles.deleteIcon} 
                                    onClick={() => handleDeleteZone(zone.id)} 
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Formulaire d'ajout de zone */}
            <div style={styles.formContainer}>
                <h3>Ajouter une nouvelle zone</h3>
                <div style={styles.formField}>
                    <div style={styles.formLabelInput}>
                        <label>Nom de la zone</label>
                        <input
                            type="text"
                            value={zoneName}
                            onChange={(e) => setZoneName(e.target.value)}
                            placeholder="Entrez un nom pour la zone"
                        />
                    </div>
                    <div style={styles.formLabelInput}>
                        <label>Sélectionner un utilisateur Tech</label>
                        <SelectTech selectedTechUser={selectedTechUser} setSelectedTechUser={setSelectedTechUser} />
                    </div>
                    <button style={styles.addButton} onClick={handleAddZone}>
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
        width: "20%",
        padding: "20px",
        backgroundColor: "#f4f4f4",
        borderTop: "1px solid #ddd",
    },
    zoneItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    zoneName: {
        flex: 1,
    },
    deleteIcon: {
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
        flexDirection: "column"
    },
    addButton: {
        padding: "10px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};
