import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import propertiesData from "./propertiesMock";
import cityMock from "./cityMock";
import axios from "axios";

export default function PropertyForm() {
  const [property, setProperty] = useState({
    id: propertiesData.length + 1,
    title: "",
    images: [],
    description: "",
    coordinates: { lat: "", lng: "" },
    city: "",
    price: "",
    constructionYear: "",
    floor: "",
    numberOfRooms: "",
    surfaceSquareMeters: "",
  });

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    loadGoogleMapsAPI();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // For the "images" field, convert the string of URLs to an array
    if (name === "images") {
      const imageUrlsArray = value
        .split("\n")
        .filter((url) => url.trim() !== "");
      setProperty((prevProperty) => ({
        ...prevProperty,
        [name]: imageUrlsArray,
      }));
    } else {
      setProperty((prevProperty) => ({
        ...prevProperty,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Extract latitude and longitude from the coordinates object
    const { lat, lng } = property.coordinates;

    // Convert the images array to a comma-separated string
    const imagesString = property.images.join(",");

    // Prepare the newProperty object with the updated values
    const newProperty = {
      ...property,
      latitude: lat,
      longitude: lng,
      images: imagesString,
    };

    try {
      // Make the POST request to the backend API
      const response = await axios.post(
        "https://localhost:44333/Homes/Create",
        newProperty,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Handle the response as needed
      console.log("New property created:", response.data);

      // Reset the form fields or perform any other actions as necessary
      setProperty({
        title: "",
        images: [],
        description: "",
        coordinates: { lat: "", lng: "" },
        city: "",
        price: "",
        constructionYear: "",
        floor: "",
        numberOfRooms: "",
        surfaceSquareMeters: "",
      });
      if (markerRef.current) {
        markerRef.current.setMap(null); // Remove the previous marker from the map
      }
    } catch (error) {
      // Handle errors if the request fails
      console.error("Error creating property:", error);
    }
  };

  const createMap = () => {
    const newMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 44.4266, lng: 26.1066 }, // Default center (Bucharest, Romania)
      zoom: 13,
    });

    newMap.addListener("click", (event) => {
      const latLng = event.latLng;
      setProperty((prevProperty) => ({
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
    script.onload = createMap;
    document.head.appendChild(script);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Title"
              variant="outlined"
              fullWidth
              value={property.title}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              fullWidth
              value={property.description}
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
              value={property.city}
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
              value={property.price}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="constructionYear"
              label="Construction Year"
              variant="outlined"
              fullWidth
              value={property.constructionYear}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="floor"
              label="Floor"
              variant="outlined"
              fullWidth
              value={property.floor}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="numberOfRooms"
              label="Number of Rooms"
              variant="outlined"
              fullWidth
              value={property.numberOfRooms}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="surfaceSquareMeters"
              label="Surface Square Meters"
              variant="outlined"
              fullWidth
              value={property.surfaceSquareMeters}
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
              value={property.images.join("\n")} // Convert the array of image URLs to a string
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <div style={{ width: "100%", height: "400px" }} ref={mapRef} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Property
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
