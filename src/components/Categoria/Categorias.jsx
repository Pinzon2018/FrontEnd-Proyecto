import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles/style.css";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    setIsLoading(true);

    axios.get('http://127.0.0.1:5000/categorias', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log("Categorias Recibidas:", response.data);
        setCategorias(response.data);
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
        <button className="boton-registro" onClick={() => navigate('/registro-categoria')}>
          <AddIcon />
        </button>
      </div>
      <h2>Lista de Categorias</h2>
      {isLoading ? (
        <p>Cargando Categorias...</p>
      ) : (
        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Categoria</th>
              <th>Descripción</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.Id_Categoria}>
                <td>{categoria.Id_Categoria}</td>
                <td>{categoria.Nombre_Cat}</td>
                <td>{categoria.Descripcion_Cat}</td>
                <td>
                  <button onClick={() => navigate(`/editar-categoria/${categoria.Id_Categoria}`)}>
                      <EditIcon/>
                  </button>
                </td>
                <td>
                  <button onClick={() => navigate(`/eliminar-categoria/${categoria.Id_Categoria}`)}>
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

export default Categorias;
