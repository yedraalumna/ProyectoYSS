import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip
} from "@mui/material";

import HelpIcon from "@mui/icons-material/Help";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";

//'AdminPanelSettings' es el escudo de usuario (Admin)
//'AdbIcon' es el icono del bicho (User)
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AdbIcon from '@mui/icons-material/Adb';

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/index";

//Necesitamos esta interfaz para permitir children
interface MenuProps {
  children: React.ReactNode;
}

export default function Menu({ children }: MenuProps) {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  //Usar isAutenticated en lugar de userRol
  const userName = useSelector((state: RootState) => state.authenticator.userName);
  const userRol = useSelector((state: RootState) => state.authenticator.userRol);
  const isAutenticated = useSelector((state: RootState) => state.authenticator.isAutenticated);

  useEffect(() => {
    if (!isAutenticated) {
      navigate('/')
    }
  }, [isAutenticated, navigate])

  const toggleDrawer = (value: boolean) => () => {
    setOpen(value);
  };

  return (
    <>
      {/* Barra superior */}
      <AppBar position="static" color="primary">
        <Toolbar>

          {/* Botón hamburguesa para abrir el menú lateral */}
          <Tooltip title="Abrir menú de navegación" placement="right" arrow>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Tooltip>

          {/* Centrado del título */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bienvenido/a, {userName}
          </Typography>

          {/* Icono según rol */}
          {/* RENDERIZADO CONDICIONAL DE ICONOS */}
          {/* Usamos un operador ternario: condicón ? (si es true) : (si es false) */}

          {userRol === 'admin' ? (
            /* Si es Admin, mostramos el escudo */
            <AdminPanelSettingsIcon sx={{ fontSize: 30 }} />
          ) : (
            /* Si NO es Admin (es user), mostramos el bicho Adb */
            <AdbIcon sx={{ fontSize: 30 }} />
          )}

        </Toolbar>
      </AppBar>

      {/* Drawer deslizante */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>

          <List>

            {/* Enlace a Home */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/home")}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Inicio" />
              </ListItemButton>
            </ListItem>

            {/* RENDERIZADO CONDICIONAL: ... */}
            {userRol === 'admin' && (
                <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/reports")}>
                    <ListItemIcon><DescriptionIcon /></ListItemIcon>
                    <ListItemText primary="Informes" />
                </ListItemButton>
                </ListItem>
            )}

            {/* Enlace a Ayuda (Abre PDF en pestaña nueva) */}
            <ListItem disablePadding>
              <Tooltip title="Ver el manual de usuario (PDF)" placement="right" arrow>
                <ListItemButton
                  component="a"
                  href="/Sanchez_Santana_Yedra_UT4A1.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ListItemIcon><HelpIcon /></ListItemIcon>
                  <ListItemText primary="Ayuda" />
                </ListItemButton>
              </Tooltip>
            </ListItem>

          </List>
        </Box>
      </Drawer>

      {/* Aquí se renderizan las páginas */}
      <Box sx={{ padding: 3 }}>
        {children}
      </Box>
    </>
  );
}