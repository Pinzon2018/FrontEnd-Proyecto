import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../../styles/style.css";

const EliminarProducto = () => {
    const { Id_Producto } = useParams();
    const navigate = useNavigate();
    const [ producto, setProducto ] = useState(null);
    const [error, setError ] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
            axios.get(`http://127.0.0.1:5000/productos/${Id_Producto}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => {
                setProducto(res.data);
            })
            .catch(err => {
                console.error(err);
                setError('Error al obtener los datos.')
            });
    }, [Id_Producto]);

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        axios.delete(`http://127.0.0.1:5000/productos/${Id_Producto}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            navigate('/productos')
        })
        .catch(() => {
            setError('Error al eliminar el producto.')
        })
    };

    const cancelar = () => navigate('/productos')

    return (
        <div className="eliminar-container">
          <div className="eliminar-card">
            <h2 className="eliminar-title">Eliminar Producto</h2>
            {error && <p className="eliminar-error">{error}</p>}
            {producto ? (
              <>
                <p className="eliminar-text">
                  ¿Estás seguro de que deseas eliminar el producto <strong>{producto.Nombre_Prod}</strong>?
                </p>
                <div className="eliminar-botones">
                  <button className="eliminar-btn confirmar" onClick={handleDelete}>Sí, eliminar</button>
                  <button className="eliminar-btn cancelar" onClick={cancelar}>Cancelar</button>
                </div>
              </>
            ) : (
              <p className="eliminar-text">Cargando Subcategoria...</p>
            )}
          </div>
        </div>
    );

}

export default EliminarProducto;