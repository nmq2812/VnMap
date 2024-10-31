"use client";
import SearchBar from './ui/search-bar';
import React, { useState } from 'react';
import SearchResults from './ui/search-results';
import { Order } from '@/app/admin/components/data/order';

const data: Order[] = [
    {
        code: "a01",
        customer: {
            name: 'Alice Smith',
            email: 'alice@example.com',
            phone: '111-222-3333',
            address: '456 Elm St, City, Country',
        },
        items: [
            {
                name: 'Product A',
                price: 20,
                quantity: 3,
                office1: "Hà Nội",
                hubs: ["Hà Nội hub", "Đà Nẵng hub"],
                office2: "Đà Nẵng",
            }
        ],
        status: true,
        total: 85,
    },
    {
        code: "a02",
        customer: {
            name: 'Bob Johnson',
            email: 'bob@example.com',
            phone: '444-555-6666',
            address: '789 Oak St, City, Country',
        },
        items: [
            {
                name: 'Product C',
                price: 30,
                quantity: 1,
                office1: "Cần Thơ",
                hubs: ["Cần Thơ hub", "Nam Định hub"],
                office2: "Nam Định",
            },
        ],
        status: true,
        total: 30,
    },
    // Additional orders can be added here
];

export default function Search() {
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

    const handleSearch = (searchTerm: string) => {
        if (searchTerm === '') {
            setFilteredOrders([]); // Clear results when search term is empty
        } else {
            const foundOrders = data.filter(order =>
                order.code.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredOrders(foundOrders);
        }
    };

    return (
        <div className='pt-32 mt-20'> {/* Increased top padding and margin */}
            <div className="h-screen flex items-center justify-center relative" id="search">
                <div className="max-w-md w-full p-4 rounded-lg z-10 bg-white shadow-md">
                    <h1 className="text-2xl font-bold text-center tracking-tight mb-4">Tra cứu vận đơn</h1>
                    <SearchBar orders={data} onSearch={handleSearch} />
                    
                    {/* Results display directly below the search bar */}
                    <div className="mt-4 w-full transition-all duration-300">
                        {filteredOrders.length > 0 ? (
                            <SearchResults results={filteredOrders} />
                        ) : (
                            <p className="text-gray-500 text-center">Không có kết quả nào.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
