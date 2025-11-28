//Página de Login usando nuestro tema pastel Doramas
//FORMULARIO con onSubmit, required y type="password"

import React, { useState } from "react";

import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  Box,
  Alert, //Componente MUI para mostrar éxito o error
} from "@mui/material";  //Imports escritos asi para mejor entendimiento y repartición

import LockIcon from "@mui/icons-material/Lock";

import { useNavigate } from "react-router-dom"; //Importamos el hook para navegar
import { useDispatch } from "react-redux"; // CORRECCIÓN: Importar useDispatch
import { authActions } from "../store/authSlice"; // CORRECCIÓN: Importar acciones

export default function Login() {
  //Hook para poder navegar entre páginas
  const navigate = useNavigate();
  
  // CORRECCIÓN CRÍTICA: Agregar dispatch para actualizar Redux
  const dispatch = useDispatch();

  //"Base de datos" simulada (datos correctos)
  const bduser = "yedra";
  const bdpasswd = "1234";

  //useState para guardar los datos del formulario (usuario y contraseña)
  const [data, setData] = useState({
    usuario: "",
    password: "",
  });

  //Estado para mostrar error si los datos son incorrectos
  const [error, setError] = useState(false);

  //Función que recoge lo que escribimos en los TextField
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value, //actualiza el campo correspondiente
    });
  };

  //Función que se ejecuta cuando hacemos submit (picar en "Acceder")
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //evita que recargue la página

    //Comprobamos usuario y contraseña
    if (data.usuario === bduser && data.password === bdpasswd) {
      // CORRECCIÓN CRÍTICA: Actualizar el estado global de Redux
      dispatch(authActions.login({
        name: data.usuario,
        rol: "administrador" // Rol del usuario autenticado
      }));
      
      //Si son correctos, navegamos a la página /home
      navigate("/home");
    } else {
      //Si son incorrectos, mostramos mensaje de error
      setError(true);
    }
  };

  return (
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", //ocupa toda la pantalla
        }}
      >
        <Card sx={{ width: "100%", borderRadius: 3, boxShadow: 4 }}>
          <CardContent>
            <Stack spacing={2} alignItems="center">
              <Typography variant="h6" color="primary">
                Sistema de acceso
              </Typography>
  
              <LockIcon color="secondary" />
  
              {/* FORMULARIO  */}
              <Box
                component="form"
                onSubmit={handleSubmit} //el botón Acceder activará esta función
                sx={{ width: "100%" }}
              >
                {/* Campo usuario */}
                <TextField
                  fullWidth
                  label="Usuario"
                  name="usuario" //necesario para recoger el valor con handleChange
                  value={data.usuario}
                  onChange={handleChange}
                  required //campo obligatorio
                  sx={{ backgroundColor: "white", borderRadius: 1, mb: 2 }}
                />
  
                {/* Campo contraseña */}
                <TextField
                  fullWidth
                  type="password" //Oculta el texto al escribir
                  label="Contraseña"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  required //Campo obligatorio
                  sx={{ backgroundColor: "white", borderRadius: 1, mb: 2 }}
                />
  
                {/* Botón Acceder del formulario */}
                {/* type="submit" hace que se active handleSubmit */}
                <Button variant="contained" fullWidth type="submit">
                  ACCEDER
                </Button>
              </Box>
  
              {/*Si message = error, mensaje rojo (error) */}
              {error && (
                <Alert severity="error" sx={{ width: "100%" }}>
                  Usuario y/o contraseña incorrectos.
                </Alert>
              )}
              </Stack>
          </CardContent>
        </Card>
      </Container>
    );
  }