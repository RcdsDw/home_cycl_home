import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker, FeatureGroup, Polygon, Popup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import getRandomColor from '../../utils/RandomColor';

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

const storeIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/14/14886.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

export default function MapView({ zones, onZoneCreated }) {
    const mapRef = useRef();

    return (
        <MapContainer
            style={{ width: '100%', height: '500px' }}
            center={[45.750, 4.850]}
            zoom={12}
            scrollWheelZoom={false}
            ref={mapRef}
        >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
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
                    onCreated={onZoneCreated}
                />
            </FeatureGroup>

            {zones && zones.length > 0 && zones.map((zone, index) => {
                if (!Array.isArray(zone.coordinates) || zone.coordinates.length === 0) return null;

                const randomColor = getRandomColor();
                const positions = zone.coordinates.map(coord => [coord.lat, coord.lng]);

                return (
                    <Polygon key={index} positions={positions} color={randomColor}>
                        <Popup>{zone.name}</Popup>
                    </Polygon>
                );
            })}
        </MapContainer>
    );
}
