import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import SelectTech from '../../utils/SelectTech';

export default function ZoneList({
    zones,
    editingZone,
    newZoneName,
    newTechUser,
    onEdit,
    onDelete,
    onSave,
    onCancel,
    setNewZoneName,
    setNewTechUser
}) {
    return (
        <div style={styles.zoneList}>
            <h3>Zones créées</h3>
            <ul>
                {zones && zones.map((zone) => (
                    <li key={zone.id} style={styles.zoneItem}>
                        {editingZone !== zone.id && (
                            <>
                                <div style={styles.flexColumn}>
                                    <span style={styles.zoneName}>{zone.name}</span>
                                    <small style={styles.description}>
                                        Pris en charge par : {(zone.technician?.firstname && zone.technician?.lastname) || 'Inconnu'}
                                    </small>
                                </div>
                                <EditOutlined
                                    style={styles.editIcon}
                                    onClick={() => onEdit(zone)}
                                />
                                <DeleteOutlined
                                    style={styles.deleteIcon}
                                    onClick={() => onDelete(zone.id)}
                                />
                            </>
                        )}
                        {editingZone === zone.id && (
                            <div style={styles.editForm}>
                                <div style={styles.flexColumn}>
                                    <Input
                                        value={newZoneName}
                                        onChange={(e) => setNewZoneName(e.target.value)}
                                        placeholder="Nouveau nom"
                                        style={{ width: '100%', margin: '5px 0' }}
                                    />
                                    <SelectTech
                                        selectedTechUser={newTechUser}
                                        setSelectedTechUser={setNewTechUser}
                                    />
                                </div>
                                <div style={styles.editButtons}>
                                    <button onClick={onSave} style={{ ...styles.button, ...styles.editButton }}>
                                        Modifier
                                    </button>
                                    <button onClick={onCancel} style={{ ...styles.button, ...styles.cancelButton }}>
                                        Annuler
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

const styles = {
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
        fontWeight: "bold"
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
    editForm: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    editButtons: {
        display: "flex",
        justifyContent: "space-between"
    },
    button: {
        height: "35px",
        padding: "0 10px",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    editButton: {
        backgroundColor: "#4CAF50",
    },
    cancelButton: {
        backgroundColor: '#f44336',
    },
    description: {
        fontSize: '12px',
        color: '#888',
    },
};
