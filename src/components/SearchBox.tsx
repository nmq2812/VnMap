"use client";
import { useState } from "react";

interface SearchBoxProps {
    setPosition: (position: [number, number]) => void;
    setZoom: (zoom: number) => void;
    setMarkerPosition: (position: [number, number]) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
    setPosition,
    setZoom,
    setMarkerPosition,
}) => {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    query,
                )}`,
            );
            if (!response.ok) {
                throw new Error("Lỗi khi tìm kiếm");
            }
            const data = await response.json();
            if (data.length > 0) {
                setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
                setZoom(12);
                setMarkerPosition([
                    parseFloat(data[0].lat),
                    parseFloat(data[0].lon),
                ]);
            } else {
                alert("Không tìm thấy kết quả");
            }
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Đã xảy ra lỗi khi tìm kiếm");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSearch}
            className="fixed w-full bg-black z-50 p-4 flex flex-col sm:flex-row items-center focus-within:border-blue-500 text-black"
        >
            <h1 className="text-center p-2 font-bold text-white mb-2 sm:mb-0 sm:mr-4">
                Bản đồ Việt Nam
            </h1>
            <div className="flex w-full sm:w-auto">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Tìm kiếm địa điểm"
                    className="flex-grow border-none p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
                >
                    {isLoading ? "Đang tìm..." : "Tìm kiếm"}
                </button>
            </div>
        </form>
    );
};

export default SearchBox;
