const { Router } = require('express');
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const axios = require('axios');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// Traer la info de la API y de la base de datos

const getApiInfo = async () => {
    try{
        const listadoApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const apiInfo = await listadoApi.data.map((e) =>{
            return{
                name: e.name,
                id: e.id,
                weightMin: e.weight.metric.split(" - ")[0] && e.weight.metric.split(" - ")[0],
                weightMax: e.weight.metric.split(" - ")[1] && e.weight.metric.split(" - ")[1],
                heightMin: e.height.metric.split(" - ")[0] && e.height.metric.split(" - ")[0],
                heightMax: e.height.metric.split(" - ")[1] && e.height.metric.split(" - ")[1],
                lifespanMin: e.life_span.split(" - ")[0] && e.life_span.split(" - ")[0],
                lifespanMax: e.life_span.split(" - ")[1] && e.life_span.split(" - ")[1].split(" ")[0],
                temperament: e.temperament ? e.temperament : "Unknown",
                image: e.image.url,
            };
        });
        return apiInfo;
    } catch(e){
        console.log("Error en getApiInfo", e);
    };
};

/* const getDataBaseInfo = async () => {
    try{
        const dogs = await Dog.findAll({
            include: Temperament,
        })
        return dogs;
    } catch(e){
        console.log("Error en getDataBaseInfo", e);
    };
}; */

/* const getDataBaseInfo = async () => {
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
            };
        });
        return dbInfo;
    } catch(e){
        console.log("Error en getDataBaseInfo", e);
    };
}; */

const getDataBaseInfo = async () => {
    try {
      const perros = await Dog.findAll({
        include: Temperament,
      });
  
      const info = perros.map((e) => {
        let temp = e.temperaments.map((e) => e.name);
        let aux = temp.join(", ");
        // console.log("ACA ESTOY", e.temperament)
        return {
            id: parseInt(e.id),
            name: e.name,
            weightMin: e.weightMin,
            weightMax: e.weightMax,
            heightMin: e.heightMin,
            heightMax: e.heightMax,
            lifespanMin: e.lifespanMin,
            lifespanMax: e.lifespanMax,
            image: e.image ? e.image : "https://pbs.twimg.com/media/FMPSwVIXoAE4QSr?format=jpg&name=large",
        };
      });
      //console.log(info)
      return info;
    } catch (error) {
      console.log("ERROR IN getDBInfo", error);
    }
  };

// Junto la informacion de la API y de la base de datos

const getAll = async () => {
    try{
        const api = await getApiInfo();
        const db = await getDataBaseInfo();
        const result = api.concat(db);
        return result;
    } catch(e){
        console.log("Error en getAll", e);
    };
};

/* 
GET /dogs:
Obtener un listado de las razas de perro
Debe devolver solo los datos necesarios para la ruta principal
 GET /dogs?name="...":
Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
Si no existe ninguna raza de perro mostrar un mensaje adecuado
*/

router.get('/dogs', async (req, res) =>{
    const { name } = req.query;
    const dogs = await getAll();
    if(name){
        let filterDogs = await dogs.filter((d) =>
        d.name.toLowerCase().includes(name.toLowerCase())
        );
        res.status(200).json(filterDogs);
    } else {
        res.status(200).json(dogs)
    }
});

/*  GET /dogs/{idRaza}:
Obtener el detalle de una raza de perro en particular
Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
Incluir los temperamentos asociados
*/

router.get('/dogs/:id', async (req, res, next) =>{
    try {
        const id = parseInt(req.params.id);
        const dogs = await getAll();
        if(dogs.filter((d) => d.id === id).length == 0) 
        res.status(404).send({error: `El perro con el id ${id} no fue encontrado`})
        const dog = dogs.filter((d) => d.id === id);
        res.status(200).json(dog[0])
    } catch(e){
        next(e);
    };
});

/*
 POST /dogs:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos relacionada con sus temperamentos  */

router.post("/post", async (req, res, next)=>{
    try{
        let {
            name,
            weightMin,
            weightMax,
            heightMin,
            heightMax,
            lifespanMin,
            lifespanMax,
            image,
            temperament,
        } = req.body

        const myDog = await Dog.create({
            name,
            weightMin,
            weightMax,
            heightMin,
            heightMax,
            lifespanMin,
            lifespanMax,
            image,
        });
        await myDog.addTemperament(temperament);
        res.status(201).json(myDog)
    } catch(e){
        next(e);
    };
});

// router para perros de la db

router.get('/db', async (req, res) =>{
    const dogs = await getDataBaseInfo();
    res.status(200).json(dogs)
})

module.exports = router;