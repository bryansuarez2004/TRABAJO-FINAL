const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const bcrypt = require('bcrypt')

const User = sequelize.define('user', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
});


//esto eliminar el password para que no se vea cuando se retorne la respuesta en cada controlador
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
}

//esto es para encriptar la contrase;a cada vez que se crea un usuario, es un hook que intercepta antes de que se cree en la base de datos
User.beforeCreate(async (user) => {
  const password = user.password
  const hashedPassword = await bcrypt.hash(password, 10)
  user.password = hashedPassword
})



module.exports = User;

