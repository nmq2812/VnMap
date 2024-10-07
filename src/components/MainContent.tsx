"use client";
import React, { useState } from "react";
import { MapContainer, Marker, ScaleControl, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import SearchBox from "./SearchBox";
import ChangeMapView from "./ChangeMapView";

const VietnamMap: React.FC = () => {
    const [position, setPosition] = useState<[number, number]>([
        21.0278, 105.8342,
    ]);

    return (
        <div className="h-screen flex flex-col">
            <SearchBox setPosition={setPosition} />
            <MapContainer
                center={position}
                zoom={13}
                style={{ height: "100vh", width: "100%", zIndex: 30 }}
            >
                <TileLayer
                    url="https://tmdt.fimo.edu.vn/hot/{z}/{x}/{y}.png"
                    maxZoom={19}
                    referrerPolicy="no-referrer"
                />
                <ScaleControl imperial metric position="bottomleft" />
                <ChangeMapView position={position} />
            </MapContainer>
        </div>
    );
};

export default VietnamMap;
