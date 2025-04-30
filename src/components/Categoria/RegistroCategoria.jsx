import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles/style.css";

const RegistroCategoria = () => {
const navigate = useNavigate();
const [Nombre_Cat, setNombre_Cat] = useState('');
const [Descripcion_Cat, setDescripcion_Cat] = useState('');
const [error, setError] = useState('');
const [isLoading, setIsLoading] = useState(false);

const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!Nombre_Cat || !Descripcion_Cat) {
    setError('Por favor, completa todos los campos.');
    setIsLoading(false);
    return;
    }

    const token = localStorage.getItem('token');

    try {
    const response = await axios.post('http://127.0.0.1:5000/categorias', {
        Nombre_Cat,
        Descripcion_Cat,
    }, {
        headers: {
        Authorization: `Bearer ${token}`
        }
    });

    console.log('Categoria agregado:', response.data);
    navigate('/categorias')
    setNombre_Cat('');
    setDescripcion_Cat('');
    } catch (error) {
    console.error('Error al registrar la categoria', error);
    if (error.response) {
        if (error.response.status === 400) {
        setError('Error en los datos proporcionados. Por favor, verifica e intenta nuevamente.');
        } else if (error.response.status === 401) {
        setError('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
        navigate('/login');
        } else {
        setError('Error al registrar el usuario. Intenta nuevamente más tarde.');
        }
    } else {
        setError('Error de conexión. Por favor, intenta nuevamente más tarde.');
    }
    } finally {
    setIsLoading(false);
    }
};

return (
    <div className="registro-container">
    <h2>Registro de Categoria</h2>
    {error && <p className="error">{error}</p>}
    {isLoading && <p>Cargando...</p>}
    <form onSubmit={manejarEnvio}>
        <div>
        <label>Nombre de Categoria:</label>
        <input
            type="text"
            value={Nombre_Cat}
            onChange={(e) => setNombre_Cat(e.target.value)}
            required
        />
        </div>
        <div>
        <label>Descripcion:</label>
        <input
            type="text"
            value={Descripcion_Cat}
            onChange={(e) => setDescripcion_Cat(e.target.value)}
            required
        />
        </div>
        <button type="submit">Guardar</button>
    </form>
    </div>
);
};

export default RegistroCategoria;   
