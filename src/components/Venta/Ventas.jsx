import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles/style.css";
import DeleteIcon from '@mui/icons-material/Delete';

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const formatearCOP = (valor) => {
    return valor.toLocaleString('es-CO', { 
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    setIsLoading(true);

    axios.get('http://127.0.0.1:5000/ventas', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log("Ventas Recibidas:", response.data);
        setVentas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las Ventas', error);
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate]);

  // Función para eliminar una venta
  const handleEliminarVenta = (id) => {
    const token = localStorage.getItem('token');
    if (!window.confirm("¿Estás seguro de eliminar esta venta?")) return;

    axios.delete(`http://127.0.0.1:5000/ventas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setVentas(prev => prev.filter(v => v.Id_Venta !== id));
      })
      .catch(err => {
        console.error("Error al eliminar la venta:", err);
        alert("Ocurrió un error al eliminar la venta.");
      });
  };

  return (
    <div className="tabla-contenedor">
      <h2>Lista de Ventas</h2>
      {isLoading ? (
        <p>Cargando Ventas...</p>
      ) : (
        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha de Venta</th>
              <th>Usuario</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.Id_Venta}>
                <td>{venta.Id_Venta}</td>
                <td>{new Date(venta.Fecha_Venta).toLocaleString()}</td>
                <td>{venta.usuario?.Nombre_Usu}</td>
                <td>{formatearCOP(Number(venta.Total_Venta))}</td>
                <td>
                  <button onClick={() => handleEliminarVenta(venta.Id_Venta)} className="btn-delete">
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Ventas;
