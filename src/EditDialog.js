import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Select,
  InputLabel,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import cityMock from "./cityMock";
import axios from "axios";

const EditDialog = (props) => {
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setEditedProperty((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));
  };

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { lat, lng } = props.editedProperty.coordinates;

    const imagesString = props.editedProperty.images.join(",");

    const updatedProperty = {
      ...props.editedProperty,
      latitude: lat,
      longitude: lng,
      images: imagesString,
    };

    // Remove the 'coordinates' property from the updatedProperty
    const { coordinates, ...newProperty } = updatedProperty;

    try {
      const response = await axios.post(
        `https://localhost:44333/Homes/Edit/${newProperty.id}`,
        newProperty,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Property updated:", response.data);

      props.onClose();
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  const createMap = () => {
    const newMap = new window.google.maps.Map(mapRef.current, {
      center: props.editedProperty.coordinates, // Default center (Bucharest, Romania)
      zoom: 13,
    });

    newMap.addListener("click", (event) => {
      const latLng = event.latLng;
      props.setEditedProperty((prevProperty) => ({
        ...prevProperty,
        coordinates: { lat: latLng.lat(), lng: latLng.lng() },
      }));
      if (markerRef.current) {
        markerRef.current.setMap(null); // Remove the previous marker from the map
      }
      // Drop a new marker at the clicked location
      const newMarker = new window.google.maps.Marker({
        position: latLng,
        map: newMap,
        draggable: true,
      });
      markerRef.current = newMarker;
    });
  };

  const loadGoogleMapsAPI = () => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBCddRMfrTtM1GKebju3KEakf2AHfiw6sg&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsGoogleMapsLoaded(true);
      createMap(); // Call createMap after the API has loaded
    };
    document.head.appendChild(script);
  };

  // const handleDialogOpen = () => {
  //   if (!isGoogleMapsLoaded) {
  //     loadGoogleMapsAPI();
  //   } else {
  //     createMap();
  //   }
  // };

  // useEffect(() => {
  //   if (mapRef.current) {
  //     loadGoogleMapsAPI();
  //   }
  // }, []);

  // useEffect(() => {
  //   if (mapRef.current && props.isOpen) {
  //     handleDialogOpen();
  //   }
  // }, [props.isOpen]);

  useEffect(() => {
    loadGoogleMapsAPI();
  }, []);
  return (
    <Dialog open={props.isOpen} onClose={props.onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Property</DialogTitle>
      <DialogContent>
        <Container>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={props.editedProperty.title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  value={props.editedProperty.description}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="city-label">City</InputLabel>
                <Select
                  name="city"
                  labelId="city-label"
                  label="City"
                  variant="outlined"
                  fullWidth
                  value={props.editedProperty.city}
                  onChange={handleInputChange}
                >
                  {cityMock.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="price"
                  label="Price"
                  variant="outlined"
                  fullWidth
                  value={props.editedProperty.price}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="constructionYear"
                  label="Construction Year"
                  variant="outlined"
                  fullWidth
                  value={props.editedProperty.constructionYear}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="floor"
                  label="Floor"
                  variant="outlined"
                  fullWidth
                  value={props.editedProperty.floor}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="numberOfRooms"
                  label="Number of Rooms"
                  variant="outlined"
                  fullWidth
                  value={props.editedProperty.numberOfRooms}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="surfaceSquareMeters"
                  label="Surface Square Meters"
                  variant="outlined"
                  fullWidth
                  value={props.editedProperty.surfaceSquareMeters}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="images"
                  label="Image URLs"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={props.editedProperty.images.join("\n")} // Convert the array of image URLs to a string
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <div style={{ width: "100%", height: "400px" }} ref={mapRef} />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
