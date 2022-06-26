const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weightMin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weightMax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heightMin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heightMax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lifespanMin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lifespanMax: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userCreated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },{timestamps: false});
};

/* 
ID *
Nombre *
Altura *
Peso *
Años de vida
Imagen 
*/