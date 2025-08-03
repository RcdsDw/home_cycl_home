import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import SelectTech from '../../utils/SelectTech';
import TestAddress from '../../utils/TestAddress'
import { getTechUsers } from '../../actions/user';
import { testAddress } from '../../actions/zones';

export default function AddZoneForm({
    zoneName,
    selectedTechUser,
    setZoneName,
    setSelectedTechUser,
    onAddZone
}) {
    return (
        <div style={styles.formContainer}>
            <h3>Ajouter une nouvelle zone</h3>
            <div style={styles.formFields}>
                <div style={styles.formLabelInput}>
                    <Input
                        value={zoneName}
                        onChange={(e) => setZoneName(e.target.value)}
                        placeholder="Nom de la zone"
                        style={styles.input}
                    />
                    <small style={styles.description}>Entrez un nom pour la zone.</small>
                </div>
                <div style={styles.formLabelInput}>
                    <SelectTech
                        selectedTechUser={selectedTechUser}
                        setSelectedTechUser={setSelectedTechUser}
                    />
                    <small style={styles.description}>Choisissez un technicien pour cette zone.</small>
                </div>
                <button style={{ ...styles.button, ...styles.addButton }} onClick={onAddZone}>
                    Ajouter Zone
                </button>
            </div>
        </div>
    );
}

const styles = {
    formContainer: {
        width: "100%",
        padding: "20px",
        backgroundColor: "#f4f4f4",
        borderTop: "1px solid #ddd",
        marginTop: "20px",
        display: 'flex',
        flexDirection: 'column',
    },
    formFields: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '15px',
        width: '100%',
    },
    formLabelInput: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px'
    },
    input: {
        width: '100%',
        maxWidth: '400px',
    },
    button: {
        height: "35px",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        padding: "0 20px"
    },
    addButton: {
        backgroundColor: "#4CAF50",
    },
    description: {
        fontSize: '12px',
        color: '#888',
    },
};
