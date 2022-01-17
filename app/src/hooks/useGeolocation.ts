import { useEffect, useState } from "react";

interface UseGeolocationReturn {
  requested: boolean;
  geolocation: Readonly<GeolocationCoordinates> | undefined;
}

/**
 * Geolocation hook
 */
export const useGeolocation = (): UseGeolocationReturn => {
  const [ requested, setRequested ] = useState(false);
  const [ geolocation, setGeolocation ] = useState<Readonly<GeolocationCoordinates>>();

  // On mount, attempt to get the users geolocation
  useEffect(() => {
    // Check that the device has geolocation capability
    if (navigator.geolocation) {
      // If the user's geolocation has not been requested, prompted the user
      // for it
      if (!requested) {
        // Update the requested state
        setRequested(true);

        // Prompt the user for their geolocation
        navigator.geolocation.getCurrentPosition(position => {
          // Update the geolocation state
          setGeolocation(position.coords);
        });
      }
    } else {
      // If the device does not have geolocation capability, update the
      // requested state that a geolocation attempt has been made
      setRequested(true);
    }
  // On mount only
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    requested,
    geolocation
  };
};