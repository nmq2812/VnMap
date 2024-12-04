import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    MapContainer,
    TileLayer,
    Polyline,
    Marker,
    Popup,
} from "react-leaflet";
import polyline from "@mapbox/polyline";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";

const RouteMap = (param) => {
    const [routeData, setRouteData] = useState(null);

    useEffect(() => {
        // Gọi API bằng axios
        const fetchRoute = async () => {
            const url = param.mapUrl;
            console.log(typeof url, url);
            try {
                const response = await axios.get(url); // Sử dụng axios để gọi API
                setRouteData(response.data.paths[0]); // Lưu tuyến đường vào state
            } catch (error) {
                console.error("Error fetching route data:", error);
            }
        };

        fetchRoute();
    }, []);
    if (!routeData) {
        return <div>Loading map...</div>; // Hiển thị loading khi dữ liệu chưa sẵn sàng
    }

    // Giải mã polyline từ dữ liệu API
    const decodedPoints = polyline.decode(routeData.points);
    const polylinePositions = decodedPoints.map(([lat, lng]) => [lat, lng]);

    // Điểm bắt đầu và kết thúc
    const startPoint = polylinePositions[0];
    const endPoint = polylinePositions[polylinePositions.length - 1];

    return (
        <MapContainer
            center={startPoint}
            zoom={5}
            style={{ height: "500px", width: "100%" }}
        >
            {/* Layer bản đồ */}
            <TileLayer url="https://tmdt.fimo.edu.vn/hot/{z}/{x}/{y}.png" />

            {/* Vẽ tuyến đường */}
            <Polyline positions={polylinePositions} color="blue" weight={4} />

            {/* Marker bắt đầu */}
            <Marker position={startPoint}>
                <Popup>Start Point</Popup>
            </Marker>

            {/* Marker kết thúc */}
            <Marker position={endPoint}>
                <Popup>End Point</Popup>
            </Marker>
        </MapContainer>
    );
};

export default RouteMap;
