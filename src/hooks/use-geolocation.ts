"use client";

import { useEffect, useState } from "react";

// Define the shape of the location
interface Location {
  lat: string;
  long: string;
}

export function useGeolocation(): Location {
  // State
  const [location, setLocation] = useState<Location>({ lat: "", long: "" });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude.toString(),
          long: position.coords.longitude.toString(),
        });
      });
    }
  }, []);

  return location;
}