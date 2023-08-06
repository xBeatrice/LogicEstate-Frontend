import React from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PropertyDialog = (props) => {
  return (
    <Dialog
      open={props.isDialogOpen}
      onClose={props.handleCloseDialog}
      maxWidth="1800px"
      overflow="hidden"
    >
      <DialogTitle variant="h4">
        {props.property.title}
        <div style={{ textAlign: "end" }}>
          <Button
            variant="contained"
            sx={{ mr: "4px" }}
            onClick={props.handleOpenDeleteDialog}
          >
            {" "}
            Delete
          </Button>
          <Button
            variant="contained"
            sx={{ mr: "4px" }}
            onClick={props.handleOpenEditDialog}
          >
            {" "}
            Edit
          </Button>
        </div>
      </DialogTitle>
      <DialogContent sx={{ overflowX: "hidden" }}>
        <DialogContentText>
          <div style={{ position: "relative" }}>
            <img
              src={props.property.images[props.currentImageIndex]}
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
              {props.currentImageIndex !== props.property.images.length - 1 && (
                <IconButton
                  onClick={props.handleImageNavigation}
                  size="large"
                  color="black"
                  sx={{ width: "60px", height: "60px" }}
                >
                  <ArrowForwardIosIcon sx={{ width: "50px", height: "50px" }} />
                </IconButton>
              )}
              {props.currentImageIndex === props.property.images.length - 1 && (
                <IconButton
                  onClick={props.handleImageNavigation}
                  size="large"
                  color="black"
                  sx={{ width: "60px", height: "60px" }}
                >
                  <ArrowBackIosIcon sx={{ width: "50px", height: "50px" }} />
                </IconButton>
              )}
            </Box>
          </div>
          <Typography variant="h5">{props.property.description}</Typography>
          <Typography variant="h6">
            Year of construction: {props.property.constructionYear}
          </Typography>
          <Typography variant="h6">Floor: {props.property.floor}</Typography>
          <Typography variant="h6">
            No. of rooms: {props.property.numberOfRooms}
          </Typography>
          <Typography variant="h6">
            Surface: {props.property.surfaceSquareMeters} square meters
          </Typography>
          <Typography variant="h6">City: {props.property.city}</Typography>
          <Typography
            color="primary"
            variant="h5"
            sx={{ textAlign: "right", mb: "10px" }}
          >
            {props.property.price} EUR
          </Typography>
        </DialogContentText>
        {/* Google Maps map with the pin */}
        <div style={{ width: "100%", height: "400px" }}>
          {props.isDialogOpen && (
            <iframe
              title="Google Map"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?q=${props.property.coordinates.lat},${props.property.coordinates.lng}&key=AIzaSyBCddRMfrTtM1GKebju3KEakf2AHfiw6sg`}
              allowFullScreen
            ></iframe>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.handleCloseDialog}
          variant="contained"
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PropertyDialog;
