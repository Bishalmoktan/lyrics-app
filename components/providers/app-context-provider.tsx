"use client"
import React, { useState } from "react";
import { createContext } from "react";

export type AppContextType = {
    timestamp: number,
    setTimestamp: React.Dispatch<React.SetStateAction<number>>
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({
    children
} : {
    children: React.ReactNode
}) => {
    const [timestamp, setTimestamp] = useState<number>(0);
    return <AppContext.Provider
    value={{
        timestamp,
        setTimestamp
    }}
    >{children}</AppContext.Provider>
}