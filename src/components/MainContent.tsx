"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";

import "leaflet/dist/leaflet.css";
const SearchBox = dynamic(() => import("./SearchBox"), {
    ssr: false,
    loading: () => <p>Đang tải...</p>,
});
const ChangeMapView = dynamic(() => import("./ChangeMapView"), {
    ssr: false,
    loading: () => <p>Đang tải...</p>,
});

const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false, loading: () => <p>Đang tải bản đồ...</p> },
);

const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    { ssr: false },
);

const ScaleControl = dynamic(
    () => import("react-leaflet").then((mod) => mod.ScaleControl),
    { ssr: false },
);

const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false },
);

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
