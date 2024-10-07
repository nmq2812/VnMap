"use client";
import { useMap } from "react-leaflet";
import { useEffect } from "react";

const ChangeMapView = ({
    position,
    zoom,
}: {
    position: [number, number];
    zoom: number;
}) => {
    const map = useMap();

    useEffect(() => {
        map.setView(position, zoom);
    }, [position, zoom]);

    return null; // This component doesn't render anything directly
};

export default ChangeMapView;
