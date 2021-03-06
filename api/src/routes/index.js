const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dogsRoutes = require('./dogsRoutes');
const temperamentRoutes = require('./temperamentsRoutes');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", dogsRoutes);
router.use("/", temperamentRoutes);

module.exports = router;