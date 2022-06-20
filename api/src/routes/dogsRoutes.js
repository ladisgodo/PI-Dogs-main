const { Router } = require('express');
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const axios = require('axios');
const { UnknownConstraintError } = require('sequelize/types');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// Traer la info de la API y de la base de datos

const getApiInfo = async () => {
    try{
        const url = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const apiInfo = await url.data.map((e) =>{
            return{
                id: e.id,
                name: e.name,
                weightMin: e.weight.metric.split(" - ")[0],
                weightMax: e.weight.metric.split(" - ")[1],
                heightMin: e.height.metric.split(" - ")[0],
                heightMax: e.height.metric.split(" - ")[1],
                lifespanMin: e.life_span.split(" - ")[0],
                lifespanMax: e.life_span.split(" - ")[1].split(" ")[0],
                temperament: e.temperament ? e.temperament : "Unknown",
                image: e.image.url,
            };
        });
        return apiInfo;
    } catch(e){
        console.log("Error en getApiInfo", e);
    };
};

const getDataBaseInfo = async () => {
    try{
        const dogs = await Dog.findAll({
            include: Temperament,
        })
        const dbInfo = dogs.map((e) =>{
            let temp = e.temperament.map((e) => e.name);
            let tempResult = temp.join(", ");
            return {
                id: e.id,
                name: e.name,
                weightMin: e.weightMin,
                weightMax: e.weightMax,
                heightMin: e.heightMin,
                heightMax: e.heightMax,
                lifespanMin: e.lifespanMin,
                lifespanMax: e.lifespanMax,
                image: e.image ? e.image : "https://pbs.twimg.com/media/FMPSwVIXoAE4QSr?format=jpg&name=large",
            }
        });
        return dbInfo;
    } catch(e){
        console.log("Error en getDataBaseInfo", e);
    };
};

// Junto la informacion de la API y de la base de datos

const getAll = async () => {
    try{
        const api = getApiInfo();
        const db = getDataBaseInfo();
        const result = [...api, ...db];
        return result;
    } catch(e){
        console.log("Error en getAll", e);
    };
}

/* 
GET /dogs:
Obtener un listado de las razas de perro
Debe devolver solo los datos necesarios para la ruta principal
 GET /dogs?name="...":
Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
Si no existe ninguna raza de perro mostrar un mensaje adecuado
 GET /dogs/{idRaza}:
Obtener el detalle de una raza de perro en particular
Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
Incluir los temperamentos asociados
 POST /dogs:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos relacionada con sus temperamentos 
*/