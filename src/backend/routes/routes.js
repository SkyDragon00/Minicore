import express from 'express';
import { Op, fn, col } from 'sequelize';
import Gasto from '../models/Gasto.js';
import Departamento from '../models/Departamento.js';

const router = express.Router();

router.post('/filtrar-gastos', async (req, res) => {
    const { fechaInicio, fechaFin } = req.body;

    if (new Date(fechaInicio) > new Date(fechaFin)) {
        return res.status(400).json({ error: 'La fecha de inicio no puede ser mayor a la fecha de fin.' });
    }

    try {
        const resultados = await Gasto.findAll({
            where: {
                gastoFecha: {
                    [Op.between]: [fechaInicio, fechaFin],
                },
            },
            include: [{ model: Departamento }],
            attributes: [
                'gastoDepartamentoID',
                [fn('SUM', col('gastoMonto')), 'total'],
            ],
            group: ['gastoDepartamentoID'],
        });

        res.json(resultados);
    } catch (error) {
        console.error('Error al filtrar gastos:', error);
        res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
    }
});

export default router;
