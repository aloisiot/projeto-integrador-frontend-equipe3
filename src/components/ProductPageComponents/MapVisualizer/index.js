import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

import "./style.scss"


export default function MapVisualizer({latitude,longitude}) {
    
    function buildIcon(){
        return L.icon({
            iconUrl: "/iconPng/map-marker-orange.png",
            iconSize: 64
        })
    }

    return (
        <div className="map-holder">
            <MapContainer center={[+latitude,+longitude]} zoom={16}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[+latitude,+longitude]} icon={buildIcon()}>
                    <Popup>
                        <p>Bairro lagoa azul, Rua Tabajara</p>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}