import React, { useState, useEffect } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { State } from "country-state-city";
import axios from "axios";

// Function to fetch coordinates for a location using the Nominatim API
async function fetchCoordinates(location) {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            location,
        )}&format=json&addressdetails=1`,
    );
    const data = await response.json();
    return data.length > 0 ? { lat: data[0].lat, lon: data[0].lon } : null;
}

const PostOfficeLookupPage = () => {
    const [city, setCity] = useState("");
    const [allPointInCity, setAllPointInCity] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [routeLink, setRouteLink] = useState("");

    useEffect(() => {
        // Get the user's current position using geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error getting current location", error);
                },
            );
        }
    }, [currentLocation]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Fetch post office information for the selected city
        await axios
            .get(`http://localhost:4000/api/point/city/${city}`)
            .then(async (res) => {
                setAllPointInCity(res.data);

                // For now, fetch coordinates of the first post office in the city
                if (res.data && res.data.length > 0) {
                    const postOfficeAddress = res.data[0].pointAddress;

                    // Fetch destination coordinates (post office)
                    const destinationCoords = await fetchCoordinates(
                        postOfficeAddress,
                    );

                    if (currentLocation && destinationCoords) {
                        // Generate route link
                        const link = `https://www.openstreetmap.org/directions?engine=graphhopper_foot&route=${currentLocation.lat}%2C${currentLocation.lon}%3B${destinationCoords.lat}%2C${destinationCoords.lon}`;
                        setRouteLink(link);
                    }
                }
            });
    };

    return (
        <div>
            <Header />
            <div>
                <div className="block top-16">
                    <img
                        src="https://i.imgur.com/xLuYgb1.jpg"
                        className="object-cover h-[340px] w-full"
                        alt=""
                    />
                </div>
                <div>
                    <div className="max-w-screen-xl px-4 pt-8 mx-auto lg:space-y-20 lg:px-6">
                        <span className="text-[#f7941e] text-4xl items-center lg:font-[500] lg:text-[45px] lg:leading-[55px]">
                            TRA CỨU BƯU CỤC
                        </span>
                    </div>
                    <section className="bg-white">
                        <div className="max-w-screen-md px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:pb-24 lg:pt-10 lg:px-6">
                            <div className="w-[100%] p-[20px] bg-white shadow-[2px_10px_25px_5px_rgba(0,0,0,0.1)] mb-[30px] rounded-lg">
                                <form
                                    onSubmit={handleSubmit}
                                    className="w-full"
                                >
                                    <div className="w-full pb-2">
                                        <label className="block pb-2 text-gray-700 font-medium">
                                            Tỉnh/Thành phố
                                        </label>
                                        <select
                                            name=""
                                            id=""
                                            value={city}
                                            onChange={(e) =>
                                                setCity(e.target.value)
                                            }
                                            className="w-[100%] border h-[40px] rounded-[5px]"
                                        >
                                            <option value="">
                                                Chọn Tỉnh/TP
                                            </option>
                                            {State.getStatesOfCountry("VN").map(
                                                (item) => (
                                                    <option
                                                        key={item.isoCode}
                                                        value={item.isoCode}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                    </div>

                                    <div className="w-full my-4">
                                        <button className="flex items-center justify-center py-4 text-white bg-[#f7941e] hover:bg-[#0072bc] hover:-translate-y-1 transition-all duration-500 leading-6 font-[500] text-[18px] w-full h-full rounded-md">
                                            Tra cứu
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="w-[100%] p-[20px] bg-[#f7f7f7] mb-[30px] rounded-lg">
                                <div>
                                    <h3 className="flex items-center font-[700] text-[20px] leading-[24px] text-[#0054a6] mb-[20px] justify-between">
                                        DANH SÁCH BƯU CỤC
                                        <i className="text-[#313131] text-[16px]">
                                            {allPointInCity.length} bưu cục
                                        </i>
                                    </h3>
                                </div>

                                {allPointInCity &&
                                    allPointInCity.map((pointItem) => (
                                        <div
                                            key={pointItem._id}
                                            className="max-h-[624px]"
                                        >
                                            <a
                                                href={routeLink}
                                                className="p-[21px] solid"
                                            >
                                                <div className="flex items-center mb-[10px]">
                                                    <h3 className="font-[500] text-[18px] leading-[24px] mb-0 ml-2">
                                                        {pointItem.pointName}
                                                    </h3>
                                                </div>
                                                <div className="pl-[20px] mb-[10px]">
                                                    <p className="leading-[21px] text-[#313131] mb-[5px]">
                                                        {pointItem.pointAddress}
                                                    </p>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PostOfficeLookupPage;
