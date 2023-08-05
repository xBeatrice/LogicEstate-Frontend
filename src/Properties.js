// Properties.js
import React, { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import {
  Button,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  FormLabel,
  Autocomplete,
  ListItemText,
} from "@mui/material";
import MapDialog from "./MapDialog";

import axios from "axios";

const Properties = () => {
  const [isMapDialogVisible, setIsMapDialogVisible] = useState(false);
  const [sortingOption, setSortingOption] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [properties, setProperties] = useState([]); // State to hold fetched property data

  const handleShowMapDialog = () => {
    setIsMapDialogVisible(true);
  };

  const handleCloseMapDialog = () => {
    setIsMapDialogVisible(false);
  };

  useEffect(() => {
    // Fetch all properties from the backend API
    axios
      .get("https://localhost:44333/Homes/Index")
      .then((response) => {
        // Format the data here before setting it to state
        const formattedProperties = response.data.map((property) => ({
          id: property.Id,
          title: property.Title,
          images: [property.Images],
          description: property.Description,
          coordinates: { lat: property.Latitude, lng: property.Longitude },
          city: property.City,
          price: property.Price,
          constructionYear: property.ConstructionYear,
          floor: property.Floor,
          numberOfRooms: property.NumberOfRooms,
          surfaceSquareMeters: property.SurfaceSquareMeters,
        }));

        setProperties(formattedProperties);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  }, []);

  // Function to filter properties based on selected sorting option
  const filterProperties = () => {
    let filteredProperties = properties.slice();

    switch (sortingOption) {
      case "price-asc":
        filteredProperties = filteredProperties.sort(
          (a, b) => a.price - b.price
        );
        break;
      case "price-desc":
        filteredProperties = filteredProperties.sort(
          (a, b) => b.price - a.price
        );
        break;
      default:
        break;
    }

    if (selectedRooms.length > 0 && !selectedRooms.includes("All")) {
      filteredProperties = filteredProperties.filter((property) =>
        selectedRooms.includes(property.numberOfRooms)
      );
    }

    if (selectedYears.length > 0 && !selectedYears.includes("All")) {
      filteredProperties = filteredProperties.filter((property) =>
        selectedYears.includes(property.constructionYear)
      );
    }

    if (selectedCities.length > 0 && !selectedCities.includes("All")) {
      filteredProperties = filteredProperties.filter((property) =>
        selectedCities.includes(property.city)
      );
    }

    return filteredProperties;
  };

  const filteredProperties = filterProperties();

  // Arrays for room counts and construction years with "All" option
  const roomCounts = ["All", 1, 2, 3, 4];
  const constructionYears = ["All", 2005, 2010, 2015];
  const cityCountsSet = new Set(properties.map((property) => property.city));
  const cityCounts = Array.from(cityCountsSet);
  cityCounts.push("All");

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "90%",
        }}
      >
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      <div style={{ width: "10%" }}>
        <Button
          variant="contained"
          onClick={handleShowMapDialog}
          sx={{
            fontSize: "16px",
            mb: "10px",
            mt: "20px",
            width: "160px",
          }}
        >
          Show Map
        </Button>
        {isMapDialogVisible && (
          <MapDialog
            propertiesData={properties}
            handleCloseMapDialog={handleCloseMapDialog}
          />
        )}

        <FormControl sx={{ width: "160px", mb: "10px" }}>
          <FormLabel component="legend">Sort By</FormLabel>
          <Select
            value={sortingOption}
            onChange={(event) => setSortingOption(event.target.value)}
            variant="outlined"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="price-asc">Price (Ascending)</MenuItem>
            <MenuItem value="price-desc">Price (Descending)</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ width: "160px", mb: "10px" }}>
          <FormLabel component="legend">Number of Rooms</FormLabel>
          <Select
            multiple
            value={selectedRooms}
            onChange={(event) => setSelectedRooms(event.target.value)}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
            variant="outlined"
          >
            {roomCounts.map((roomCount) => (
              <MenuItem key={roomCount} value={roomCount}>
                <Checkbox checked={selectedRooms.includes(roomCount)} />
                <ListItemText
                  primary={roomCount === "All" ? "All" : roomCount}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: "160px", mb: "10px" }}>
          <FormLabel component="legend">City</FormLabel>
          <Select
            multiple
            value={selectedCities}
            onChange={(event) => setSelectedCities(event.target.value)}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
            variant="outlined"
          >
            {cityCounts.map((cityCount) => (
              <MenuItem key={cityCount} value={cityCount}>
                <Checkbox checked={selectedCities.includes(cityCount)} />
                <ListItemText
                  primary={cityCount === "All" ? "All" : cityCount}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: "160px", mb: "10px" }}>
          <FormLabel component="legend">Construction Year</FormLabel>
          <Select
            multiple
            value={selectedYears}
            onChange={(event) => setSelectedYears(event.target.value)}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
            variant="outlined"
          >
            {constructionYears.map((year) => (
              <MenuItem key={year} value={year}>
                <Checkbox checked={selectedYears.includes(year)} />
                <ListItemText primary={year === "All" ? "All" : year} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Properties;
