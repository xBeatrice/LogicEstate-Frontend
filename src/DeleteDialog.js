import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import axios from "axios";

const DeletePropertyDialog = ({ isOpen, onClose, onDelete, property }) => {
  const handlePropertyDelete = async () => {
    try {
      const response = await axios
        .get(`https://localhost:44333/Homes/Delete/` + property.id)
        .catch((e) => {
          console.log(e);
        });

      console.log("Property deleted:", response.data);
      // Handle success

      // Close the delete dialog
      onClose();
    } catch (error) {
      console.error("Error deleting property:", error);
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this property?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handlePropertyDelete} color="secondary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePropertyDialog;
