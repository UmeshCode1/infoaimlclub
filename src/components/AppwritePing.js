"use client";

import { useEffect } from "react";
import { client } from "@/lib/appwrite";

export default function AppwritePing() {
    useEffect(() => {
        const verifyConnection = async () => {
            try {
                await client.ping();
                console.log("%c INFO %c Appwrite Gateway Verified.", "background: #ec4899; color: white; border-radius: 3px; font-weight: bold;", "color: #888;");
            } catch (error) {
                console.error("Appwrite check failed:", error.message);
            }
        };
        verifyConnection();
    }, []);

    return null;
}
