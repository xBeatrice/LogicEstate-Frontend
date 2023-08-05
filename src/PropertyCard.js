import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  CardActionArea,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const PropertyCard = ({ property }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isNextButton, setNextButton] = useState(true);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleImageNavigation = () => {
    if (isNextButton) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
      );
    }
    setNextButton((prevIsNextButton) => !prevIsNextButton);
  };

  return (
    <>
      <Grid
        item
        xs={12}
        sm={4}
        md={4}
        lg={4}
        onClick={handleOpenDialog}
        sx={{ m: "auto", mt: "18px" }}
      >
        <Card
          elevation={9}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: 500,
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              image={property.images[0]} // Assuming the first image in the array is the main image
              alt={property.title}
              style={{ objectFit: "cover", height: 300, position: "relative" }}
            />
            <CardContent>
              <Typography variant="h5" sx={{ ml: 0, mr: "auto" }}>
                {property.title}
              </Typography>
              <Typography variant="h5" sx={{ mr: 0, ml: "auto" }}>
                {property.price} EUR
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="1800px"
        overflow="hidden"
      >
        <DialogTitle variant="h4">{property.title}</DialogTitle>
        <DialogContent sx={{ overflowX: "hidden" }}>
          <DialogContentText>
            <div style={{ position: "relative" }}>
              <img
                src={property.images[currentImageIndex]}
                alt="property"
                height="700px"
                width="1100px"
                margin="16px"
              />
              {/* Slideshow controls */}
              <Box
                position="absolute"
                top="50%"
                left="45%"
                transform="translateY(50%)"
                display="flex"
                justifyContent="center"
                width="100%"
                overflow="hidden"
                p={2}
              >
                {currentImageIndex !== property.images.length - 1 && (
                  <IconButton
                    onClick={handleImageNavigation}
                    size="large"
                    color="black"
                    sx={{ width: "60px", height: "60px" }}
                  >
                    <ArrowForwardIosIcon
                      sx={{ width: "50px", height: "50px" }}
                    />
                  </IconButton>
                )}
                {currentImageIndex === property.images.length - 1 && (
                  <IconButton
                    onClick={handleImageNavigation}
                    size="large"
                    color="black"
                    sx={{ width: "60px", height: "60px" }}
                  >
                    <ArrowBackIosIcon sx={{ width: "50px", height: "50px" }} />
                  </IconButton>
                )}
              </Box>
            </div>
            <Typography variant="h5">{property.description}</Typography>
            <Typography variant="h6">
              Year of construction: {property.constructionYear}
            </Typography>
            <Typography variant="h6">Floor: {property.floor}</Typography>
            <Typography variant="h6">
              No. of rooms: {property.numberOfRooms}
            </Typography>
            <Typography variant="h6">
              Surface: {property.surfaceSquareMeters} square meters
            </Typography>
            <Typography variant="h6">City: {property.city}</Typography>
            <Typography
              color="primary"
              variant="h5"
              sx={{ textAlign: "right", mb: "10px" }}
            >
              {property.price} EUR
            </Typography>
          </DialogContentText>
          {/* Google Maps map with the pin */}
          <div style={{ width: "100%", height: "400px" }}>
            {isDialogOpen && (
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/place?q=${property.coordinates.lat},${property.coordinates.lng}&key=AIzaSyBCddRMfrTtM1GKebju3KEakf2AHfiw6sg`}
                allowFullScreen
              ></iframe>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PropertyCard;
