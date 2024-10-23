"use client"
import SearchBar from './ui/search-bar'
import React, { useState, useEffect } from 'react';
import SearchResults from './ui/search-results';
import { Order } from '@/app/admin/components/data/order'
import { useRouter } from 'next/router';


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
            office2: "Dà Nẵng"
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
            office2: "Nam Định"
            },
        ],
        status: true,
        total: 30,
    },
    // Thêm các đơn hàng khác ở đây nếu bạn cần
  ];

export default function Search() {
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

    const handleSearch = (searchTerm: string) => {
        if (searchTerm === '') {
            setFilteredOrders([]);
        } else {
            const foundOrders = data.filter(order =>
                order.code.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredOrders(foundOrders);
        }
    };

    return (
        
        <div className="h-screen mx-auto grid place-items-center" id="search">
            <div className="p-4 rounded-lg">
                <h1 className="grid place-items-center text-3xl font-bold tracking-tight m-1">Tra cứu vận đơn</h1>
                <SearchBar orders={data} onSearch={handleSearch} />
                {filteredOrders.length > 0 && (
                    <SearchResults results={filteredOrders}></SearchResults>
                )}
            </div>
        </div>
    );
}