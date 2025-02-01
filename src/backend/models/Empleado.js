import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Empleado = sequelize.define('Empleado', {
    empleadoID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    empleadoNombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Empleado;
