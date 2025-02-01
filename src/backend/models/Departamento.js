import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Departamento = sequelize.define('Departamento', {
    departamentoID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    departamentoNombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Departamento;