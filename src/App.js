import React, { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {
  Container,
  Paper,
  Grid,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { searchProductByName, saveProduct } from "./service/ProductServices";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

function App() {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenSearch, setDialogOpenSearch] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [productSearch, setProductSearch] = useState({
    name: "",
  });
  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const handleSearch = (result) => {
    setSearchResult(result);
    setDialogOpenSearch(true);
  };

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogOpenSearch(false);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSearchProduct = async () => {
    try {
      const response = await searchProductByName(productSearch.name);
      const searchResult = response.data.length > 0 ? response.data[0] : null;
      handleSearch(searchResult);
    } catch (error) {
      console.error("Error searching product:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "70%",
                alignItems: "center",
              }}
            >
              <input
                style={{
                  borderRadius: "60px",
                  backgroundColor: "white",
                  border: "none",
                  outline: "none",
                  padding: "8px 16px",
                  width: "40%",
                  transition: "box-shadow 0.3s",
                  boxShadow: "0px 0px 0px 2px transparent",
                  "&:hover": {
                    boxShadow: "0px 0px 0px 2px transparent",
                  },
                  "&:focus": {
                    boxShadow: "0px 0px 0px 2px blue",
                  },
                }}
                value={productSearch.name}
                onChange={(e) =>
                  setProductSearch((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <IconButton
                type="button"
                sx={{ p: "10px", color: "white", marginTop: "1%" }}
                aria-label="search"
                size="large"
                onClick={handleSearchProduct}
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={9}>
              <Grid item xs={12} md={9} lg={9}>
                <ProductList
                  handleOpenDialog={handleOpenDialog}
                  handleClose={handleCloseDialog}
                />
                <ProductForm
                  open={dialogOpen}
                  handleClose={handleCloseDialog}
                  selectedProduct={selectedProduct}
                />
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "auto",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleOpenDialog({ name: "", price: "", quantity: "" })
                    }
                  >
                    Ajouter un nouveau produit
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      <Dialog open={dialogOpenSearch} onClose={handleCloseDialog}>
        <DialogTitle>Résultat de la recherche</DialogTitle>
        <DialogContent>
          {searchResult ? (
            <div>
              <p>Nom : {searchResult.name}</p>
              <p>Prix unitaire : {searchResult.price}</p>
              <p>Quantité : {searchResult.quantity}</p>
            </div>
          ) : (
            <p>Le produit n'existe pas.</p>
          )}
        </DialogContent>
        <DialogActions sx={{ margin: "0 auto" }}>
          <Button onClick={handleCloseDialog}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default App;
