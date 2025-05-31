import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

// Constants for query keys used in react-query hooks
export const WEATHER_KEYS = {
    weather : (coords) => ["weather", coords],
    forecast : (coords) => ["forecast", coords],
    location : (coords) => ["location", coords],
    search : (query) => ["location-search", query],
};

// Hook to fetch current weather data based on coordinates
export function useWeatherQuery(coordinates) {
    return useQuery({
        queryKey : WEATHER_KEYS.weather(coordinates ?? {lat:0,long:0}),
        queryFn : () => coordinates ? weatherAPI.getCurrentData(coordinates) : null,
        enabled : !!coordinates,
    });
}

// Hook to fetch weather forecast data based on coordinates
export function useForecastQuery(coordinates) {
    return useQuery({
        queryKey : WEATHER_KEYS.forecast(coordinates ?? {lat:0,long:0}),
        queryFn : () => coordinates ? weatherAPI.getForecast(coordinates) : null,
        enabled : !!coordinates,
    });
}

// Hook to fetch reverse geocode data based on coordinates
export function useReverseGeocodeQuery(coordinates) {
    return useQuery({
        queryKey : WEATHER_KEYS.location(coordinates ?? {lat:0,long:0}),
        queryFn : () => coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
        enabled : !!coordinates,
    });
}

// Hook to search location based on query string
export function useLocationQuery(query) {
    return useQuery({
        queryKey : WEATHER_KEYS.search(query),
        queryFn : () => weatherAPI.searchLocation(query),
        enabled : query.length >= 3,
    });
}
