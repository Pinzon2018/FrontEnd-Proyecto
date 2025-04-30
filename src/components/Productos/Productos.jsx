import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles/style.css";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(!token) {
            navigate('/')
            return;
        }

        setIsLoading(true);

        axios.get('http://127.0.0.1:5000/productos', {
            headers : { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            console.log("Productos Recibidos:", response.data);
            setProductos(response.data);
        })
        .catch(error => {
            console.error('Error al obtener productos', error);
            if (error.response && error.response.status === 401) {
                navigate('/');
            }
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [navigate]);

    return (
        <div className="tabla-contenedor">
          <div className="boton-contenedor">
            <button className="boton-registro" onClick={() => navigate('/registro-producto')}>
              <AddIcon />
            </button>
          </div>
          <h2>Lista de Productos</h2>
          {isLoading ? (
            <p>Cargando Productos...</p>
          ) : (
            <table className="tabla-usuarios">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Medida</th>
                  <th>Unidad de medida</th>
                  <th>Precio</th>
                  <th>Iva</th>
                  <th>Ganancia</th>
                  <th>Unidades Totales</th>
                  <th>Estado</th>
                  <th>Marca</th>
                  <th>Proveedor</th>
                  <th>Subcategoria</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.Id_Producto}>
                    <td>{producto.Id_Producto}</td>
                    <td>{producto.Nombre_Prod}</td>
                    <td>{producto.Medida_Prod}</td>
                    <td>{producto.Unidad_Medida_Prod}</td>
                    <td>{producto.Precio_Neto_Unidad_Prod}</td>
                    <td>{producto.Iva_Prod}</td>
                    <td>{producto.Porcentaje_Ganancia}</td>
                    <td>{producto.Unidades_Totales_Prod}</td>
                    <td>{producto.Estado_Prod}</td>
                    <td>{producto.Marca_Prod}</td>
                    <td>{producto.proveedor.Nombre_Prov}</td>
                    <td>{producto.subcategoria.Nombre_Subcategoria}</td>
                    <td>
                      <button onClick={() => navigate(`/editar-producto/${producto.Id_Producto}`)}>
                          <EditIcon/>
                      </button>
                    </td>
                    <td>
                      <button onClick={() => navigate(`/eliminar-producto/${producto.Id_Producto}`)}>
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
}

export default Productos;