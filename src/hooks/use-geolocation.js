import { useState, useEffect } from "react";

// Custom hook to get user's geolocation coordinates
export function useGeoLocation() {
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to request user's current position
  const getLocation = () => {
    setIsLoading(true);
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
          setError(null);
          setIsLoading(false);
        },
        (error) => {
          setError(error.message);
          setIsLoading(false);
        }
      );
    }
  };

  // Automatically get location on mount
  useEffect(() => {
    getLocation();
  }, []);

  return { coordinates, error, getLocation, isLoading };
}
