import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import PropertyDialog from "./PropertyDialog";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";

const PropertyCard = ({ property }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isNextButton, setNextButton] = useState(true);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handlePropertyDelete = () => {
    // Replace this with your actual delete logic.
    // For example, you can call an API to delete the property from the server.
    console.log("Property deleted!");
    handleCloseDeleteDialog();
  };

  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editedProperty, setEditedProperty] = useState(property);

  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleSaveChanges = () => {
    // Call the API or perform any action to save the edited property
    console.log("Edited Property:", editedProperty);
    // Close the dialog
    handleCloseEditDialog();
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
        sm={3}
        md={3}
        lg={3}
        onClick={handleOpenDialog}
        sx={{ m: "16px", mt: "18px" }}
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
      <PropertyDialog
        isDialogOpen={isDialogOpen}
        property={property}
        handleCloseDialog={handleCloseDialog}
        currentImageIndex={currentImageIndex}
        handleImageNavigation={handleImageNavigation}
        handleOpenDeleteDialog={handleOpenDeleteDialog}
        handleCloseDeleteDialog={handleCloseDeleteDialog} // Pass the callback to the child component
        handlePropertyDelete={handlePropertyDelete} // Pass the callback to the child component
        handleOpenEditDialog={handleOpenEditDialog}
        handleCloseEditDialog={handleCloseEditDialog}
      />
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onDelete={handlePropertyDelete}
      />
      <EditDialog
        isOpen={isEditDialogOpen}
        property={editedProperty}
        onClose={handleCloseEditDialog}
        onSaveChanges={handleSaveChanges}
        onPropertyChange={setEditedProperty}
        editedProperty={editedProperty}
        setEditedProperty={setEditedProperty}
      />
    </>
  );
};

export default PropertyCard;
