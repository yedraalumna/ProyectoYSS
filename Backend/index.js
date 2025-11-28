//Importar usando ES modules
import express from 'express';
import cors from 'cors';
import login from './services/login.js';
import coleccion from './services/coleccion.js';

const port = 3030;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', function (req, res) {
    res.json({ message: 'Hola Mundo!' });
});

app.get('/login', async function(req, res, next) {
    console.log(req.query);
    console.log(req.query.user);
    console.log(req.query.password);
    try {
        res.json(await login.getUserData(req.query.user, req.query.password));
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
});

//ENDPOINT PARA INSERTAR NUEVOS PRODUCTOS - /addItem
app.get('/addItem', async function(req, res, next) {
    try {
        //Llamamos a la función insertData que está en el fichero coleccion y le pasamos req
        res.json(await coleccion.insertData(req, res))
    } catch (err) {
        console.error(`Error while inserting items `, err.message);
        next(err);
    }
})

//ENDPOINT PARA OBTENER TODOS LOS PRODUCTOS - /getItems
app.get('/getItems', async function(req, res, next) {
  try {
    // Llamamos a la función getData que está en el fichero coleccion
    res.json(await coleccion.getData(req, res))
  } catch (err) {
    console.error(`Error while getting items `, err.message);
    next(err);
  }
})

//endpoint /addItem para aceptar POST
app.post('/addItem', async function(req, res, next) {
  try {
    // Para POST usamos req.body en lugar de req.query
    req.query = req.body; // Adaptamos para usar la misma función
    res.json(await coleccion.insertData(req, res))
  } catch (err) {
    console.error(`Error while inserting items `, err.message);
    next(err);
  }
})

//ENDPOINT PARA ELIMINAR PRODUCTOS
app.get('/deleteItem', async function(req, res, next) {
    try {
        res.json(await coleccion.deleteData(req, res))
    } catch (err) {
        console.error(`Error while deleting items `, err.message);
        next(err);
    }
})

//Iniciamos la API
app.listen(port)
console.log('API escuchando en el puerto ' + port)