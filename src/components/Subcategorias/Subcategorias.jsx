import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles/style.css";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Subcategoria = () => {
    const [subcategorias, setSubcategorias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(!token){
            navigate('/')
            return;
        }

        setIsLoading(true);
        
        axios.get('http://127.0.0.1:5000/subcategorias', {
            headers: {Authorization: `Bearer ${token}`},
        })
        .then(response => {
            console.log("Subcategorias recibidas:", response.data);
            setSubcategorias(response.data);
        })
        .catch(error => {
            console.error('Error al obtener las subcategorias', error);
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
            <button className="boton-registro" onClick={() => navigate('/registro-subcategoria')}>
              <AddIcon />
            </button>
          </div>
          <h2>Lista de Subcategorias</h2>
          {isLoading ? (
            <p>Cargando subcategorias...</p>
          ) : (
            <table className="tabla-usuarios">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre Subcategoria</th>
                  <th>Descripción</th>
                  <th>Categoria</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {subcategorias.map((subcategoria) => (
                  <tr key={subcategoria.Id_Subcategoria}>
                    <td>{subcategoria.Id_Subcategoria}</td>
                    <td>{subcategoria.Nombre_Subcategoria}</td>
                    <td>{subcategoria.Descripcion_Subcategoria}</td>
                    <td>{subcategoria.categoria_rl.Nombre_Cat}</td>
                    <td>
                      <button onClick={() => navigate(`/editar-subcategoria/${subcategoria.Id_Subcategoria}`)}>
                          <EditIcon/>
                      </button>
                    </td>
                    <td>
                      <button onClick={() => navigate(`/eliminar-subcategoria/${subcategoria.Id_Subcategoria}`)}>
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

export default Subcategoria;