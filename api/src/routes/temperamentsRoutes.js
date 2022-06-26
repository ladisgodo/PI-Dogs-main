const { Router } = require('express');
const axios = require('axios');
const { Temperament } = require('../db')
const { API_KEY } = process.env;

/* Importar todos los routers;
 Ejemplo: const authRouter = require('./auth.js'); */

const router = Router();

/* Configurar los routers
Ejemplo: router.use('/auth', authRouter);


 GET /temperaments:
Obtener todos los temperamentos posibles
En una primera instancia deberán obtenerlos desde la API externa y guardarlos en 
su propia base de datos y luego ya utilizarlos desde allí  */


router.get('/temperaments', async (req, res) =>{
    try {
        const apiInfo = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        let temp = apiInfo.data.map((element) => element.temperament);
        temp = temp.join(', ').split(', ');
        temp = temp.filter((e) => e);
        temp = [...new Set(temp)];
        temp.forEach(element => {
            Temperament.findOrCreate({
                where: { name: element}
            })
        });
        const allTemp = await Temperament.findAll();
        res.status(200).json(allTemp);
    } catch(e){
        console.log('Error en /temperaments', e)
    }
})

module.exports = router;
