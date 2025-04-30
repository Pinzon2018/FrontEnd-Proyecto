import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles/style.css";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    setIsLoading(true);

    axios.get('http://127.0.0.1:5000/proveedores', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log("Categorias Recibidas:", response.data);
        setProveedores(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las categorias', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate]);

  return (
    <div className="tabla-contenedor">
      <div className="boton-contenedor">
        <button className="boton-registro" onClick={() => navigate('/registro-proveedor')}>
          <AddIcon />
        </button>
      </div>
      <h2>Lista de Proveedores</h2>
      {isLoading ? (
        <p>Cargando Proveedores...</p>
      ) : (
        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Proveedor</th>
              <th>Telefono Proveedor</th>
              <th>Direccion Proveedor</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((proveedor) => (
              <tr key={proveedor.Id_Proveedor}>
                <td>{proveedor.Id_Proveedor}</td>
                <td>{proveedor.Nombre_Prov}</td>
                <td>{proveedor.Telefono_Prov}</td>
                <td>{proveedor.Direccion_Prov}</td>
                <td>
                  <button onClick={() => navigate(`/editar-proveedor/${proveedor.Id_Proveedor}`)}>
                      <EditIcon/>
                  </button>
                </td>
                <td>
                  <button onClick={() => navigate(`/eliminar-proveedor/${proveedor.Id_Proveedor}`)}>
                        <DeleteIcon/>
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

export default Proveedores;
