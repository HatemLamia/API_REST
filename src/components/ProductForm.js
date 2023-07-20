import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
} from "@mui/material";
import { saveProduct } from "../service/ProductServices";

const ProductForm = ({ open, handleClose, selectedProduct }) => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    setProduct(selectedProduct);
  }, [open, selectedProduct]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSaveProduct = async () => {
    try {
      await saveProduct(product);
      handleClose();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Ajouter/Modifier un produit</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            label="Nom"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={product.name}
            onChange={handleFormChange}
            required
          />
          <TextField
            label="Prix unitaire"
            variant="outlined"
            type="number"
            fullWidth
            margin="normal"
            name="price"
            value={product.price}
            onChange={handleFormChange}
            required
            InputProps={{
              endAdornment: <InputAdornment position="end">€</InputAdornment>,
            }}
          />
          <TextField
            label="Quantité"
            variant="outlined"
            fullWidth
            type="number"
            margin="normal"
            name="quantity"
            value={product.quantity}
            onChange={handleFormChange}
            required
          />
        </form>
      </DialogContent>
      <DialogActions sx={{ display: "flex", margin: "0 auto" }}>
        <Button variant="contained" color="primary" onClick={handleSaveProduct}>
          Ajouter
        </Button>
        <Button variant="contained" onClick={handleClose}>
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;
