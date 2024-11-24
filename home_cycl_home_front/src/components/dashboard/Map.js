import React, { useEffect, useState } from 'react';
import { Circle, MapContainer, Marker, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

export default function Map({ newZone }) {
    const [zones, setZones] = useState([])
    console.log("FINAL", newZone)

    useEffect(() => {
        console.log("NewZone :", newZone)
        if (newZone && newZone.lat !== undefined && newZone.lng !== undefined) {
             console.log("here")
            setZones((prevZones) => [...prevZones, newZone]);
            renderZone(zones)
        }
    }, [newZone])

    const renderZone = () => {
        return zones.map((z, i) => {
            if (!z || z.lat === undefined || z.lng === undefined) return null;
            return <Circle key={i} center={[z.lat, z.lng]} radius={300} />
        })
    }

    return (
        <MapContainer style={styles.map} center={[45.750, 4.850]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker title='Magasin' position={[45.750, 4.850]}/>
            {zones.length > 0 && renderZone(zones)}
        </MapContainer>
    )
}

const styles = {
    map: {
        width: "80%",
        height: "500px",
        margin: "0 auto",
    }
}