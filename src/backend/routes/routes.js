import express from 'express';
import Empleado from '../models/Empleado.js';
import Departamento from '../models/Departamento.js';
import Gasto from '../models/Gasto.js';
import { Op} from 'sequelize';
import sequelize from '../database.js';


const router = express.Router();

// Crear un nuevo departamento
router.post('/departamento', async (req, res) => {
    try {
        const { departamentoNombre } = req.body;
        const nuevoDepartamento = await Departamento.create({ departamentoNombre });
        res.status(201).json(nuevoDepartamento);
    } catch (error) {
        console.error('Error al insertar departamento:', error);
        res.status(500).json({ error: 'Error al insertar el departamento' });
    }
});

// Crear un nuevo empleado
router.post('/empleado', async (req, res) => {
    try {
        const { empleadoNombre } = req.body;
        const nuevoEmpleado = await Empleado.create({ empleadoNombre });
        res.status(201).json(nuevoEmpleado);
    } catch (error) {
        console.error('Error al insertar empleado:', error);
        res.status(500).json({ error: 'Error al insertar el empleado' });
    }
});

// Crear un nuevo gasto
router.post('/gasto', async (req, res) => {
    try {
        const { gastoFecha, gastoDescripcion, gastoMonto, gastoEmpleadoID, gastoDepartamentoID } = req.body;
        const nuevoGasto = await Gasto.create({
            gastoFecha,
            gastoDescripcion,
            gastoMonto,
            gastoEmpleadoID,
            gastoDepartamentoID,
        });
        res.status(201).json(nuevoGasto);
    } catch (error) {
        console.error('Error al insertar gasto:', error);
        res.status(500).json({ error: 'Error al insertar el gasto' });
    }
});

router.post('/filtrar-gastos', async (req, res) => {
    const { fechaInicio, fechaFin } = req.body;

    if (!fechaInicio || !fechaFin) {
        return res.status(400).json({ error: 'Las fechas son requeridas.' });
    }

    try {
        const resultados = await Gasto.findAll({
            where: {
                gastoFecha: {
                    [Op.between]: [fechaInicio, fechaFin],
                },
            },
            include: [
                {
                    model: Departamento,
                    attributes: ['departamentoNombre'],
                    as: 'Departamento',
                },
            ],
            attributes: [
                [sequelize.col('Departamento.departamentoNombre'), 'Departamento'],
                [sequelize.fn('SUM', sequelize.col('gastoMonto')), 'Total'],
            ],
            group: ['Departamento.departamentoNombre'],
        });

        res.json(resultados);
    } catch (error) {
        console.error('Error al filtrar gastos:', error);
        res.status(500).json({ error: 'Error en el servidor.' });
    }
});


export default router;