// /components/ChangeMapView.js
import { useMap } from "react-leaflet";
import { useEffect } from "react";

const ChangeMapView = ({ position }: { position: [number, number] }) => {
    const map = useMap();

    useEffect(() => {
        map.setView(position);
    }, [position]);

    return null; // This component doesn't render anything directly
};

export default ChangeMapView;
