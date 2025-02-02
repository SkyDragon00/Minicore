import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Función para llamar al backend y filtrar gastos
const filtrarGastos = async (fechaInicio, fechaFin) => {
    try {
        const response = await fetch('http://localhost:5000/api/filtrar-gastos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fechaInicio, fechaFin }),
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error al filtrar gastos:', error);
        return [];
    }
};

function App() {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [resultados, setResultados] = useState([]);

    const handleFiltrar = async () => {
        const data = await filtrarGastos(fechaInicio, fechaFin);
        setResultados(data);
    };

    return (
        <>
            <div className="logo-container">
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo-small" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo-small react" alt="React logo" />
                </a>
            </div>
            <h1>Minicore</h1>
            
            {/* Formulario para filtrar gastos */}
            <div className="form-container">
                <h2>Filtrar y Calcular Gastos</h2>
                <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    placeholder="Fecha Inicio"
                />
                <input
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    placeholder="Fecha Fin"
                />
                <button onClick={handleFiltrar}>Filtrar</button>
            </div>

            {/* Resultados */}
            {resultados.length > 0 ? (
    <div className="resultados">
        <h3>Resultados</h3>
        <table>
            <thead>
                <tr>
                    <th>Departamento</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {resultados.map((item, index) => (
                    <tr key={index}>
                        <td>{item.Departamento?.departamentoNombre || 'Departamento'}</td>
                        <td>{item.Total}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
) : (
    <p>No se encontraron resultados para el rango de fechas seleccionado.</p>
)}
        </>
    );
}

export default App;