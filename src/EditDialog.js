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
  const [mapsApiLoaded, setMapsApiLoaded] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setEditedProperty((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    props.onSaveChanges();
  };

  const handleCloseClick = () => {
    props.onClose();
  };
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    loadGoogleMapsAPI();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Extract latitude and longitude from the coordinates object
    const { lat, lng } = props.editedProperty.coordinates;

    // Convert the images array to a comma-separated string
    const imagesString = props.editedProperty.images.join(",");

    // Prepare the updatedProperty object with the updated values
    const updatedProperty = {
      ...props.editedProperty,
      latitude: lat,
      longitude: lng,
      images: imagesString,
    };

    try {
      // Make the PUT request to the backend API to update the property
      const response = await axios.put(
        `https://localhost:44333/Homes/Edit/${updatedProperty.id}`,
        updatedProperty,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Handle the response as needed
      console.log("Property updated:", response.data);

      // Call the onUpdate callback to inform the parent component of the update
      props.onUpdate(props.editedProperty);

      // Close the dialog
      props.onClose();
    } catch (error) {
      // Handle errors if the request fails
      console.error("Error updating property:", error);
    }
  };

  const createMap = () => {
    if (!mapRef.current) return;

    const newMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 44.4266, lng: 26.1066 }, // Default center (Bucharest, Romania)
      zoom: 13,
    });

    newMap.addListener("click", (event) => {
      const latLng = event.latLng;
      props.setEditedProperty((prevProperty) => ({
        ...prevProperty,
        coordinates: { lat: latLng.lat(), lng: latLng.lng() },
      }));
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      const newMarker = new window.google.maps.Marker({
        position: latLng,
        map: newMap,
        draggable: true,
      });
      markerRef.current = newMarker;
    });
  };
  const loadGoogleMapsAPI = () => {
    if (mapsApiLoaded) return; // Check if the API is already loaded

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBCddRMfrTtM1GKebju3KEakf2AHfiw6sg&libraries=places&callback=createMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    setMapsApiLoaded(true); // Set the flag to true once the API is loaded
  };

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
