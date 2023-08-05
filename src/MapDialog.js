import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import PropertyCard from "./PropertyCard";

const MapDialog = (props) => {
  const mapIframeSrc = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBCddRMfrTtM1GKebju3KEakf2AHfiw6sg&zoom=12&maptype=roadmap`;

  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null); // State to track the selected property
  const mapRef = useRef(null);

  useEffect(() => {
    if (!isMapLoaded) {
      // Load the Google Maps API
      const scriptTag = document.createElement("script");
      scriptTag.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBCddRMfrTtM1GKebju3KEakf2AHfiw6sg&libraries=places`;
      scriptTag.async = true;
      scriptTag.defer = true;
      scriptTag.onload = () => setIsMapLoaded(true);
      document.head.appendChild(scriptTag);
    } else {
      initializeMap();
    }
  }, [isMapLoaded]);

  const initializeMap = () => {
    const mapOptions = {
      center: {
        lat: props.propertiesData[0].coordinates.lat,
        lng: props.propertiesData[0].coordinates.lng,
      },
      zoom: 12,
    };

    const mapInstance = new window.google.maps.Map(mapRef.current, mapOptions);

    // Add markers for each property
    props.propertiesData.forEach((property) => {
      const marker = new window.google.maps.Marker({
        position: property.coordinates,
        map: mapInstance,
        title: property.price,
      });

      marker.addListener("click", () => {
        // Handle marker click, set the selected property
        setSelectedProperty(property);
      });
    });
  };

  const handleClose = () => {
    setSelectedProperty(null);
    props.handleCloseMapDialog();
  };

  return (
    <Dialog open={true} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>Map View</DialogTitle>
      <DialogContent sx={{ paddingBottom: "20px" }}>
        <div style={{ height: "310px", width: "100%", position: "relative" }}>
          {/* The iframe displaying the Google Map */}
          <iframe
            title="Google Map"
            width="100%"
            height="100%"
            frameBorder="0"
            src={`${mapIframeSrc}&center=${props.propertiesData[0].coordinates.lat},${props.propertiesData[0].coordinates.lng}`}
            allowFullScreen
          ></iframe>
          <div
            ref={mapRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Close
        </Button>
      </DialogActions>
      {/* Render the PropertyCard for the selected property */}
      {selectedProperty && <PropertyCard property={selectedProperty} />}
    </Dialog>
  );
};

export default MapDialog;
