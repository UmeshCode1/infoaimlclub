"use client";

import { useEffect } from "react";
import { client } from "@/lib/appwrite";

export default function AppwritePing() {
    useEffect(() => {
        const verifyConnection = async () => {
            try {
                await client.ping();
                console.log("Appwrite connection verified (Ping successful)");
            } catch (error) {
                console.error("Appwrite connection failed:", error);
            }
        };
        verifyConnection();
    }, []);

    return null;
}
