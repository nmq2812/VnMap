"use client";
import React, { useState } from "react";
import { MapContainer, Marker, ScaleControl, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import SearchBox from "./SearchBox";
import ChangeMapView from "./ChangeMapView";

// Thêm đoạn mã này để định nghĩa biểu tượng mặc định

const VietnamMap: React.FC = () => {
    const [position, setPosition] = useState<[number, number]>([15.7, 108.22]);
    const [zoom, setZoom] = useState<number>(6);
    const [markerPosition, setMarkerPosition] = useState<[number, number]>([
        21.0285, 105.8542,
    ]);

    console.log(zoom);

    return (
        <div className="h-screen flex flex-col">
            <SearchBox
                setPosition={setPosition}
                setZoom={setZoom}
                setMarkerPosition={setMarkerPosition}
            />
            <MapContainer
                center={position}
                zoom={zoom}
                style={{ height: "100vh", width: "100%", zIndex: 30 }}
            >
                <TileLayer
                    url="https://tmdt.fimo.edu.vn/hot/{z}/{x}/{y}.png"
                    maxZoom={19}
                    referrerPolicy="no-referrer"
                />
                {markerPosition && <Marker position={markerPosition} />}
                <ScaleControl imperial metric position="bottomleft" />
                <ChangeMapView position={position} zoom={zoom} />
            </MapContainer>
        </div>
    );
};

export default VietnamMap;
