import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Empleado from './Empleado.js';
import Departamento from './Departamento.js';

const Gasto = sequelize.define('Gasto', {
    gastoID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    gastoFecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    gastoDescripcion: {
        type: DataTypes.STRING,
    },
    gastoMonto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    gastoEmpleadoID: {
        type: DataTypes.INTEGER,
        references: {
            model: Empleado,
            key: 'empleadoID',
        },
    },
    gastoDepartamentoID: {
        type: DataTypes.INTEGER,
        references: {
            model: Departamento,
            key: 'departamentoID',
        },
    },
});

Gasto.belongsTo(Empleado, { foreignKey: 'gastoEmpleadoID' });
Gasto.belongsTo(Departamento, { foreignKey: 'gastoDepartamentoID' });

export default Gasto;
