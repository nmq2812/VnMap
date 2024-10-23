"use client";
import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
    const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => {
            clearInterval(intervalID);
        };
    }, []); // Empty dependency array to run effect only on mount and unmount

    return (
        <div className="Time font-digital font-medium text-xl">
            <p suppressHydrationWarning>{time}</p>
        </div>
    );

    // return "clock"
};

export default Clock;
