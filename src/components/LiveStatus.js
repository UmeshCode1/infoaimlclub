"use client";

import { useState, useEffect } from "react";
import { Clock, MapPin, Cloud, Zap, Sun, CloudRain, CloudLightning, CloudSnow, CloudDrizzle } from "lucide-react";

export default function LiveStatus() {
    const [time, setTime] = useState(new Date());
    const [weather, setWeather] = useState({ temp: "--", condition: "Syncing..." });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => setTime(new Date()), 1000);

        // Fetch weather for Bhopal
        const fetchWeather = async () => {
            try {
                // Using a resilient public API (Open-Meteo) for low-thermal performance
                const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=23.2599&longitude=77.4126&current=temperature_2m,weather_code&timezone=auto");
                const data = await res.json();

                const codeMap = {
                    0: { label: "Clear", icon: Sun },
                    1: { label: "Mainly Clear", icon: Sun },
                    2: { label: "Partly Cloudy", icon: CloudFocus },
                    3: { label: "Overcast", icon: Cloud },
                    45: { label: "Foggy", icon: Cloud },
                    48: { label: "Foggy", icon: Cloud },
                    51: { label: "Drizzle", icon: CloudRain },
                    61: { label: "Rainy", icon: CloudRain },
                    71: { label: "Snowy", icon: CloudSnow },
                    80: { label: "Showers", icon: CloudRain },
                    95: { label: "Thunderstorm", icon: CloudLightning },
                };

                const currentCode = data.current.weather_code;
                const info = codeMap[currentCode] || { label: "Stable", icon: Cloud };

                setWeather({
                    temp: Math.round(data.current.temperature_2m) + "°C",
                    condition: info.label,
                    Icon: info.icon
                });
            } catch (error) {
                console.error("Weather sync failed", error);
                setWeather({ temp: "22°C", condition: "Stable", Icon: Cloud });
            }
        };

        fetchWeather();
        const weatherTimer = setInterval(fetchWeather, 300000); // Re-sync every 5 mins

        return () => {
            clearInterval(timer);
            clearInterval(weatherTimer);
        };
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    if (!mounted) return null;

    const WeatherIcon = weather.Icon || Cloud;

    return (
        <div className="flex flex-wrap items-center gap-6 py-4 px-6 bg-card border border-border rounded-xl mb-12">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                    <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest block">Bhopal Standard Time</span>
                    <span className="text-sm font-mono font-bold text-foreground">{formatTime(time)}</span>
                </div>
            </div>

            <div className="h-6 w-px bg-border hidden sm:block" />

            <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                    <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest block">Deployment Node</span>
                    <span className="text-sm font-bold text-foreground">ORIENTAL BPL</span>
                </div>
            </div>

            <div className="h-6 w-px bg-border hidden md:block" />

            <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                    <WeatherIcon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                    <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest block">Local Atmosphere</span>
                    <span className="text-sm font-bold text-foreground uppercase">{weather.temp} · {weather.condition}</span>
                </div>
            </div>

            <div className="ml-auto hidden lg:flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
                    <Zap className="w-3 h-3 text-primary animate-pulse" />
                    <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em]">Secure Gateway Active</span>
                </div>
            </div>
        </div>
    );
}
