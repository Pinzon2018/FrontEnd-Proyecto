import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles/style.css";

const RegistroProducto = () => {
    const navigate = useNavigate();
    const [Nombre_Prod, setNombre_Prod] = useState('');
    const [Medida_Prod, setMedida_Prod] = useState('');
    const [Unidad_Medida_Prod, setUnidad_Medida_Prod] = useState('');
    const [Precio_Neto_Unidad_Prod, setPrecio_Neto_Unidad_Prod] = useState('');
    const [Iva_Prod, setIva_Prod] = useState('');
    const [Porcentaje_Ganancia, setPorcentaje_Ganancia] = useState('');
    const [Unidades_Totales_Prod, setUnidades_Totales_Prod] = useState('');
    const [Estado_Prod, setEstado_Prod] = useState('');
    const [Marca_Prod, setMarca_Prod] = useState('');
    const [proveedor, setproveedor] = useState('');
    const [Proveedores, setProveedores] = useState([]);
    const [subcategoria, setsubcategoria] = useState('');
    const [Subcategorias, setSubcategorias] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://127.0.0.1:5000/proveedores', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setProveedores(response.data);
            console.log('Proveedores Recibidos:', response.data);
        })
        .catch(error => {
            console.error('Error al obtener Proveedores', error)
        });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://127.0.0.1:5000/subcategorias', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setSubcategorias(response.data);
            console.log('Subcategorias Recibidas:', response.data);
        })
        .catch(error => {
            console.error('Error al obtener Subcategorias', error)
        });
    }, []);

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if(!Nombre_Prod && !Medida_Prod && !Unidad_Medida_Prod && !Precio_Neto_Unidad_Prod && !Iva_Prod && !Porcentaje_Ganancia && !Unidades_Totales_Prod && !Estado_Prod && !Marca_Prod && !proveedor && !subcategoria) {
            setError('Por favor, complete todos los campos.');
            setIsLoading(false);
            return;
        }

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://127.0.0.1:5000/productos', {
                Nombre_Prod,
                Medida_Prod,
                Unidad_Medida_Prod,
                Precio_Neto_Unidad_Prod,
                Iva_Prod,
                Porcentaje_Ganancia,
                Unidades_Totales_Prod,
                Estado_Prod,
                Marca_Prod,
                FK_Id_Proveedor: proveedor,
                FK_Id_Subcategoria: subcategoria
            }, {
                headers: { Authorization: `Bearer ${token}` } 
            });
            console.log('Producto Agregado:', response.data);
            navigate('/productos')
            setNombre_Prod('');
            setMedida_Prod('');
            setUnidad_Medida_Prod('');
            setPrecio_Neto_Unidad_Prod('');
            setIva_Prod('');
            setPorcentaje_Ganancia('');
            setUnidades_Totales_Prod('');
            setEstado_Prod('');
            setMarca_Prod('');
            setproveedor('');
            setsubcategoria('');
        } catch (error) {
            console.error('Error al registrar el producto', error);
            if (error.response) {
                if(error.response.status === 400) {
                    setError('Error en los datos proporcionados. Por favor, verifica e intenta nuevamente.')
                } else if (error.response.status === 401) {
                    setError('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                    navigate('/');
                } else {
                    setError('Error al registrar el producto. Intenta nuevamente más tarde.');
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
        <h2>Registro de Producto</h2>
        {error && <p className="error">{error}</p>}
        {isLoading && <p>Cargando...</p>}
        <form onSubmit={manejarEnvio}>
            <div>
            <label>Nombre Producto:</label>
            <input
                type="text"
                value={Nombre_Prod}
                onChange={(e) => setNombre_Prod(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Medida Producto:</label>
            <input
                type="text"
                value={Medida_Prod}
                onChange={(e) => setMedida_Prod(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Unidad de Medida:</label>
            <input
                type="text"
                value={Unidad_Medida_Prod}
                onChange={(e) => setUnidad_Medida_Prod(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Precio Neto:</label>
            <input
                type="text"
                value={Precio_Neto_Unidad_Prod}
                onChange={(e) => setPrecio_Neto_Unidad_Prod(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Iva:</label>
            <input
                type="text"
                value={Iva_Prod}
                onChange={(e) => setIva_Prod(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Porcentaje Ganancia:</label>
            <input
                type="text"
                value={Porcentaje_Ganancia}
                onChange={(e) => setPorcentaje_Ganancia(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Unidades Totales:</label>
            <input
                type="text"
                value={Unidades_Totales_Prod}
                onChange={(e) => setUnidades_Totales_Prod(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Estado:</label>
            <input
                type="text"
                value={Estado_Prod}
                onChange={(e) => setEstado_Prod(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Marca:</label>
            <input
                type="text"
                value={Marca_Prod}
                onChange={(e) => setMarca_Prod(e.target.value)}
                required
            />
            </div>
            <div className="select-container"> 
                <label className="form-label">Proveedor:</label>
                <select value={proveedor} onChange={(e) => setproveedor(e.target.value)} required>
                    <option key="default" value="" disabled>Seleccione un proveedor</option>
                    {Proveedores
                      .filter((p) => p.Id_Proveedor !== undefined && p.Id_Proveedor !== null)
                      .map((p) => (
                        <option key={`Proveedor-${p.Id_Proveedor}`} value={p.Id_Proveedor}>
                          {p.Nombre_Prov}
                        </option>
                    ))}
                </select>
            </div>
            <div className="select-container"> 
                <label className="form-label">Subcategoria:</label>
                <select value={subcategoria} onChange={(e) => setsubcategoria(e.target.value)} required>
                    <option key="default" value="" disabled>Seleccione una Subcategoria</option>
                    {Subcategorias
                      .filter((s) => s.Id_Subcategoria !== undefined && s.Id_Subcategoria !== null)
                      .map((s) => (
                        <option key={`Proveedor-${s.Id_Subcategoria}`} value={s.Id_Subcategoria}>
                          {s.Nombre_Subcategoria}
                        </option>
                    ))}
                </select>
            </div>
  
            <button type="submit">Registrar</button>
        </form>
        </div>
    );
}

export default RegistroProducto;